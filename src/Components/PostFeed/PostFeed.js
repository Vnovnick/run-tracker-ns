import React, {useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
import { params } from '../../util/Spotify';
import { stravaApiData } from '../../apiData';




export default function PostFeed() {
  const spotAuthCodeLink = `https://accounts.spotify.com/authorize?client_id=${params.client_id}&client_secret=${params.client_secret}&response_type=code&redirect_uri=${params.redirect_uri}`;
  const authCodeLink = `https://www.strava.com/oauth/authorize?client_id=${stravaApiData.client_id}&redirect_uri=http://localhost:3000/run-tracker-ns&response_type=code&scope=activity:read_all`;

  const codeMatch = window.location.href.match(/code=([^&]*)/);
  // const spotifyUrlMatch = window.location.href.match('https://accounts.spotify.com');
  // const stravaUrlMatch = window.location.href.match('https://www.strava.com');

  const [stravaAuthCode, setStravaAuthCode] = useState('');
  const [spotifyAuthCode, setSpotifyAuthCode] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [spotLoggedIn, setSpotLoggedIn] = useState(false);

  // handle login change for strava
  // const handleLogIn = (event) => {
  //   event.preventDefault();
  //   if (loggedIn){
  //     setLoggedIn(false);
  //     console.log(loggedIn);
  //   }else{
  //     setLoggedIn(true);
  //     console.log(loggedIn);
  //   }
    
  // };
  
  // handle login change for Spotify
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
  const logout = () => {
    axios.post('https://www.strava.com/oauth/deauthorize');
    // window.location.href = '/';
  }


  useEffect(() => {
    if (codeMatch && codeMatch[1].length < 41){
      setLoggedIn(true);
      // console.log(loggedIn);
      setStravaAuthCode(codeMatch[1]);
      // console.log(authCode);
    } 
    if (codeMatch && codeMatch[1].length > 41){
      setSpotLoggedIn(true);
      setSpotifyAuthCode(codeMatch[1]);
      console.log(spotifyAuthCode);
    }
    

  }, [stravaAuthCode, spotifyAuthCode, codeMatch, loggedIn, spotLoggedIn])


  
  return (
    <div className='post-feed'>
      {spotLoggedIn ? <a href='http://localhost:3000/run-tracker-ns' >Spotify Log-out</a> : <a href={spotAuthCodeLink} >Spotify Log-in</a>}

      {loggedIn ? <a href='http://localhost:3000/run-tracker-ns' onClick={logout}>Strava Log-out</a> : <a href={authCodeLink} >Strava Log-in</a>}                        
        <Post 
        stravaAuthCode={stravaAuthCode}
        spotifyAuthCode={spotifyAuthCode}
        spotLoggedIn={spotLoggedIn}
        loggedIn={loggedIn}/>
    </div>
  )
}

// onChange={handleLogIn}