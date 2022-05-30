import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Post.css';
import { spotifyApiData, stravaApiData } from '../../apiData';
import qs from 'qs';

var Buffer = require('buffer/').Buffer;


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

  const stravaAccessCodeLink = `${baseStravaUrl}${stravaAuthUrl}?client_id=${stravaApiData.client_id}&client_secret=${stravaApiData.client_secret}&code=${props.stravaAuthCode}&grant_type=authorization_code`; 
  const stravaFullAuthLink = `${baseStravaUrl}${stravaAuthUrl}?client_id=${stravaApiData.client_id}&client_secret=${stravaApiData.client_secret}&refresh_token=${stravaRefreshToken}&grant_type=refresh_token`;

  // spotify states and links
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState('');
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
  const [spotifyData, setSpotifyData] = useState([]);

  const spotifyAccessCodeLink = `${baseAuthSpotifyUrl}${spotifyAuthUrl}`;


  // Spotify Auth + get data requests
  useEffect(() => {
    async function fetchSpotifyData(){
      if (props.spotifyAuthCode && props.spotLoggedIn && props.spotifyStateMatch){
        // console.log(props.spotifyAuthCode);
        // console.log(props.spotifyStateMatch);
        
        // gets refresh and access token
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
            console.log(spotifyAccessToken);
          }

        })
        .catch(error => {
          console.error('Error: ', error);
        })
      }

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

      if (spotifyAccessToken){
        const requestRecentlyPlayed = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
            'content-type': 'application/json'
          }
        })
        .catch(error => {
          console.log(error);
        })
        console.log(requestRecentlyPlayed.data);
        setSpotifyData(requestRecentlyPlayed.data.items);
      }
    }
    fetchSpotifyData();
  }, [props.spotifyAuthCode, props.spotLoggedIn, spotifyAccessCodeLink, props.spotifyStateMatch, spotifyAccessToken, spotifyRefreshToken]);


  // Strava Auth + get data requests
  useEffect(() => {
    async function fetchStravaData(){   
    
    // requests still seem to run 3 times 

    // getting refresh token with new auth code
    
    if (props.stravaAuthCode && props.loggedIn){
      await axios.post(stravaAccessCodeLink)
      .then(response => {        
          setStravaRefreshToken(response.data['refresh_token']);
          console.log(stravaRefreshToken);        
      })
      .catch(error => {
        console.error('Error: ', error);
      });
    }

    //refresh token post request
    if (stravaRefreshToken){
      await axios.post(stravaFullAuthLink)    
      .then(response => {
          
          setStravaAccessToken(response.data['access_token']);
          console.log(stravaAccessToken);
      })
      .catch(error => {
          console.error('Error: ', error);
      });
    }


    // get activity data request

    if (stravaAccessToken){
    const requestActivities = await axios.get(`${baseStravaUrl}${stravaDataUrl}?access_token=${stravaAccessToken}`, {
      'Authorization': `Bearer ${stravaAccessToken}`
    });
    console.log(requestActivities.data);
    setStravaData(requestActivities.data);    
    }
    
    }
    fetchStravaData();
    
    
  }, [stravaAccessToken, stravaRefreshToken, stravaFullAuthLink, stravaAccessCodeLink, props.stravaAuthCode, props.loggedIn]);

  return (
    <div className='post-list'>
        {stravaData.map(item => (        
        <div className='post-info' key={item.id}>
        <br></br>
        <h3>{item.name}</h3>
        <h4>Distance: {item.distance}</h4>
        <p>Start Date: {item.start_date} || Time Elapsed: {item.elapsed_time}</p>
        <br></br>
        </div>))}
        {spotifyData.map(item => (
          <div className='post-tracks' key={item.id}>
            <h3>{item.track.name}</h3>
          </div>
        ))}
    </div>
  )
};


