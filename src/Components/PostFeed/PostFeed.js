import React, {useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
import { stravaApiData, spotifyApiData } from '../../apiData';


const redirect_uri = 'http://localhost:3000/run-tracker-ns';


export default function PostFeed() {
  let randSpotifyState = Math.random().toString(36).substring(1,17);
  const spotAuthCodeLink = `https://accounts.spotify.com/authorize?client_id=${spotifyApiData.client_id}&client_secret=${spotifyApiData.client_secret}&scope=${spotifyApiData.scope}&state=${randSpotifyState}&response_type=code&redirect_uri=${redirect_uri}`;
  const authCodeLink = `https://www.strava.com/oauth/authorize?client_id=${stravaApiData.client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=activity:read_all`;



  const codeMatch = window.location.href.match(/code=([^&]*)/);
  const spotifyStateMatch = window.location.href.match(/state=([^&]*)/);

  const [stravaAuthCode, setStravaAuthCode] = useState('');



  const [spotifyAuthCode, setSpotifyAuthCode] = useState('');
  const [spotifyAuthState, setSpotifyAuthState] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);
  const [spotLoggedIn, setSpotLoggedIn] = useState(false);

  // handle change funcs not necessary it seems like

  // handle login change for strava
  // const handleLogIn = (event) => {
  //   event.preventDefault();
  //   if (!loggedIn && window.localStorage.getItem('StravaData')){
  //     setLoggedIn(true);
  //     console.log(loggedIn);
  //   }else{
  //     setLoggedIn(false);
  //     console.log(loggedIn);
  //   }
    
  // };
  
  // // handle login change for Spotify
  // const handleLogIn2 = (event) => {
  //   event.preventDefault();
  //   if (spotLoggedIn){
  //     setSpotLoggedIn(false);
  //     console.log(spotLoggedIn);
  //   }else{
  //     setSpotLoggedIn(true);
  //     console.log(spotLoggedIn);
  //   }
    
  // };



  // potential logout function to clear cache data later on
  const stravaLogout = () => {
    axios.post('https://www.strava.com/oauth/deauthorize');
    window.localStorage.removeItem('StravaData');
  }
  const spotifyLogout = () => {
   window.localStorage.removeItem('SpotifyData')
 
  }



    const getStravaUrlCode = () => {
      if (codeMatch && codeMatch[1].length < 41){
        setLoggedIn(true);
        // console.log(loggedIn);
        setStravaAuthCode(codeMatch[1]);
        // console.log(authCode);
      }
    }
 
    const getSpotifyUrlCode = () => {
      if (codeMatch && codeMatch[1].length > 41 && spotifyStateMatch){
        setSpotLoggedIn(true);
        setSpotifyAuthCode(codeMatch[1]);
        setSpotifyAuthState(spotifyStateMatch[1]);
        // console.log(spotifyAuthCode);
      }
    } 
    if (!stravaAuthCode){
      getStravaUrlCode();
    }

    if (!spotifyAuthCode || !spotifyAuthState) {
      getSpotifyUrlCode();
    }  

    



  return (
    <div className='post-feed'>
      <ul>
        <li>{spotLoggedIn ? <a href='http://localhost:3000/run-tracker-ns' onClick={spotifyLogout} >Spotify Log-out</a> : <a href={spotAuthCodeLink} >Spotify Log-in</a>}
      </li>
      <li>  {loggedIn ? <a href='http://localhost:3000/run-tracker-ns' onClick={stravaLogout} >Strava Log-out</a> : <a href={authCodeLink}>Strava Log-in</a>}    </li>
      </ul>
      
                        
        <Post 
        stravaAuthCode={stravaAuthCode}
        spotifyStateMatch={spotifyAuthState}
        spotifyAuthCode={spotifyAuthCode}
        spotLoggedIn={spotLoggedIn}
        loggedIn={loggedIn}/>
    </div>
  )
}

// useEffect(() => {  }, [codeMatch, spotifyStateMatch, spotifyAuthCode, spotifyAuthState, stravaAuthCode])