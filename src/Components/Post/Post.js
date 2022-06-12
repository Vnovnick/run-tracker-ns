import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import './Post.css';
import { spotifyApiData, stravaApiData } from '../../apiData';
import qs from 'qs';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import PostContent from '../PostContent/PostContent';
import Sidebar from '../Sidebar/Sidebar';

var Buffer = require('buffer/').Buffer;

// const persistConfig = {
//   key: 'persist-key',
//   storage
// }


const redirect_uri = 'http://localhost:3000/run-tracker-ns';


// Strava Urls/endpoints
const baseStravaUrl = 'https://www.strava.com/';
const stravaDataUrl = 'api/v3/athlete/activities';
const stravaAuthUrl = 'oauth/token';

// Spotify Urls/endpoints
const baseAuthSpotifyUrl = 'https://accounts.spotify.com/';
const spotifyAuthUrl = 'api/token';


export default function Post(props) {  
  
  // strava states and links
  const [stravaRefreshToken, setStravaRefreshToken] = useState('');
  const [stravaAccessToken, setStravaAccessToken] = useState('');
  const [stravaData, setStravaData] = useState([]);
  const [stravaUser, setStravaUser] = useState(null);
  const [stravaUserId, setStravaUserId] = useState(null);
  const [stravaTotals, setStravaTotals] = useState(null);

  const stravaAccessCodeLink = `${baseStravaUrl}api/v3/${stravaAuthUrl}?client_id=${stravaApiData.client_id}&client_secret=${stravaApiData.client_secret}&code=${props.stravaAuthCode}&grant_type=authorization_code`; 
  const stravaFullAuthLink = `${baseStravaUrl}${stravaAuthUrl}?client_id=${stravaApiData.client_id}&client_secret=${stravaApiData.client_secret}&refresh_token=${stravaRefreshToken}&grant_type=refresh_token`;

  // spotify states and links
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState('');
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
  const [spotifyData, setSpotifyData] = useState([]);

  const spotifyAccessCodeLink = `${baseAuthSpotifyUrl}${spotifyAuthUrl}`;



  // Strava Auth + get data requests
  useEffect(() => {
    const authStrava = async () => {   
    // requests still seem to run 3 times 
    // getting refresh token with new auth code
      await axios.post(stravaAccessCodeLink)
      .then(response => {  
          if (response.status === 200){
            // console.log(response.data.access_token);
            setStravaAccessToken(response.data.access_token);
             
            // console.log(stravaAccessToken); 
          }   
      
      })
      .catch(error => {
        console.error('Error: ', error);
      });
    
    }
    if (props.stravaAuthCode && !stravaAccessToken){
      authStrava(); 
    } 
 

    //refresh token post request
    //  function refreshStravaAccessToken(){
    //   if (stravaRefreshToken){
    //     axios.post(stravaFullAuthLink)    
    //     .then(response => {
            
    //         setStravaAccessToken(response.data['access_token']);
    //         console.log(stravaAccessToken);
    //     })
    //     .catch(error => {
    //         console.error('Error: ', error);
    //     });
    //   }
    // }

    
    async function fetchStravaData(){
      
        const requestActivities = await axios.get(`${baseStravaUrl}${stravaDataUrl}?access_token=${stravaAccessToken}`, {
          'Authorization': `Bearer ${stravaAccessToken}`
        });
        // console.log(requestActivities.data);
        setStravaData(requestActivities.data); 
        const runData = requestActivities.data.map(({name, distance, start_date, elapsed_time}) => ({name, distance, start_date, elapsed_time}));
        window.localStorage.setItem('runData', JSON.stringify(runData));
        // window.localStorage.setItem('StravaData', JSON.stringify(requestActivities.data));

        // let stravaStorageData = localStorage.getItem('StravaData');
        // console.log(JSON.parse(stravaStorageData));  
         
        
    }
    if (stravaAccessToken) {
      fetchStravaData(); 
    }

    async function fetchStravaUserData(){
      const requestUser = await axios.get(`${baseStravaUrl}/api/v3/athlete?access_token=${stravaAccessToken}`, {
        'Authorization': `Bearer ${stravaAccessToken}`})
        .catch(error => {
          console.log(error);
        });

      setStravaUser(requestUser.data);
      setStravaUserId(requestUser.data.id);
      window.localStorage.setItem('StravaUserName', requestUser.data.username);
      window.localStorage.setItem('StravaUserProfile', requestUser.data.profile);      
    }
    if (stravaAccessToken && !window.localStorage.getItem('StravaUserName')) {
      fetchStravaUserData(); 
    }

    async function fetchUserTotals(){
      const requestTotals = await axios.get(`${baseStravaUrl}/api/v3/athletes/${stravaUserId}/stats?access_token=${stravaAccessToken}`, {
        'Authorization': `Bearer ${stravaAccessToken}`
      })
      .catch(error => {
        console.log(error);
      });
      setStravaTotals(requestTotals.data.all_run_totals);
      window.localStorage.setItem('stravaTotals', JSON.stringify(requestTotals.data.all_run_totals));
    }
    if (!window.localStorage.getItem('StravaTotals') && stravaUserId){
      fetchUserTotals();
    }
  }, [stravaAccessToken, stravaRefreshToken, stravaAccessCodeLink, props.stravaAuthCode, stravaUser, stravaUserId]);
  

  // Spotify Auth + get data requests
  useEffect(() => {

    // gets refresh and access token
    const authSpotify = async () => {
      await axios.post(spotifyAccessCodeLink, qs.stringify({
        code: props.spotifyAuthCode,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }),
        {
        headers: {
          Authorization : `Basic ${(Buffer.from(spotifyApiData.client_id + ':' + spotifyApiData.client_secret).toString('base64'))}`,
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        if (response.status === 200) {
          setSpotifyAccessToken(response.data.access_token);
          setSpotifyRefreshToken(response.data.refresh_token);
          // console.log(spotifyAccessToken);
          // write a conditional that will check if the token is expired and to only run the next request if it is in fact expired
        }

      })
      .catch(error => {
        console.error('Error: ', error);
      })
    }
    if (props.spotifyAuthCode && props.spotLoggedIn && props.spotifyStateMatch){
      authSpotify();
    }
    
  

  // below request creates an infinite loop; needs new conditional

  // if (spotifyRefreshToken){
  //   await axios.post(spotifyAccessCodeLink, qs.stringify({
  //     grant_type: 'refresh_token',
  //     refresh_token: spotifyRefreshToken
  //   }), {
  //     headers: {
  //       Authorization : `Basic ${(Buffer.from(spotifyApiData.client_id + ':' + spotifyApiData.client_secret).toString('base64'))}`,
  //       'content-type': 'application/x-www-form-urlencoded'
  //     }
  //   }
  //   )
  //   .then(response => {
  //     setSpotifyAccessToken(response.data.access_token);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }


  
  const fetchSpotifyData = async () => {
    // getting 'after' parameter in recently played get request
    // let stravaConvertedData = JSON.parse(localStorage.getItem('StravaData'));
    // let spotAfter = new Date(stravaConvertedData[4].start_date).getTime(); 
    // after=${spotAfter}

      // const strava = JSON.parse(window.localStorage.getItem('runData'));
      // let before = (new Date(strava[2].start_date).getTime()) + (strava[2].elapsed_time * 1000);
      // let after = new Date(strava[2].start_date).getTime();
      // console.log(before);
      // console.log(after);
      const requestRecentlyPlayed = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?&limit=50` ,{
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
          'content-type': 'application/json'
        }
      })
      .catch(error => {
        console.log(error);
      })
      // console.log(requestRecentlyPlayed.data);
      setSpotifyData(requestRecentlyPlayed.data.items);
      window.localStorage.setItem('SpotifyData', JSON.stringify(requestRecentlyPlayed.data.items));
      let spotifyStorageData = localStorage.getItem('SpotifyData');
      // console.log(JSON.parse(spotifyStorageData));
    
  }

  if (spotifyAccessToken && window.localStorage.getItem('runData')){
    fetchSpotifyData();
  }

  const fetchSpotifyUserData = async () => {
    const requestUserInfo = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        'content-type': 'application/json'
      }
    })
    .catch(error => {
      console.log(error);
    })

    window.localStorage.setItem('SpotifyUserName', requestUserInfo.data.display_name);
    window.localStorage.setItem('SpotifyUserProfile', requestUserInfo.data.images[0].url);  

  };
  if (spotifyAccessToken && !window.localStorage.getItem('SpotifyUserName')){
    fetchSpotifyUserData();
  } 

}, [props.spotifyAuthCode, props.spotLoggedIn, spotifyAccessCodeLink, props.spotifyStateMatch, spotifyAccessToken, spotifyRefreshToken]);


  return (
    <div className='post-list'>

        <Sidebar/>
        <PostContent/>
        
    </div>
  )
};


