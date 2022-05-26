import React, {useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from '../../util/axios';
import { params } from '../../util/Spotify';
import { stravaApiData } from '../../apiData';




export default function PostFeed() {
  const spotAuthCodeLink = `https://api.spotify.com/v1/authorize?client_id=${params.client_id}&client_secret=${params.client_secret}&response_type=code&redirect_uri=${params.redirect_uri}`;
  const authCodeLink = `https://www.strava.com/oauth/authorize?client_id=${stravaApiData.client_id}&redirect_uri=http://localhost:3000/run-tracker-ns&response_type=code&scope=activity:read_all`;

  const stravaCodeMatch = window.location.href.match(/code=([^&]*)/);
  const [authCode, setAuthCode] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedIn2, setLoggedIn2] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    if (loggedIn){
      setLoggedIn(false);
      console.log(loggedIn);
    }else{
      setLoggedIn(true);
      console.log(loggedIn);
    }
    
  };
  
  
  const handleLogIn2 = (event) => {
    event.preventDefault();
    if (loggedIn2){
      setLoggedIn2(false);
      console.log(loggedIn2);
    }else{
      setLoggedIn2(true);
      console.log(loggedIn2);
    }
    
  };



  // potential logout function to clear cache data later on
  const logout = () => {
    axios.post('https://www.strava.com/oauth/deauthorize');
    // window.location.href = '/';
  }


  useEffect(() => {
    if (stravaCodeMatch){
      setLoggedIn(true);
      // console.log(loggedIn);
      setAuthCode(stravaCodeMatch[1]);
      // console.log(authCode);
    }

  }, [authCode, stravaCodeMatch, loggedIn])


  
  return (
    <div className='post-feed'>
      {loggedIn2 ? <a href='http://localhost:3000/run-tracker-ns' onChange={handleLogIn2}>Spotify Log-out</a> : <a href={spotAuthCodeLink} onChange={handleLogIn2}>Spotify Log-in</a>}

      {loggedIn ? <a href='http://localhost:3000/run-tracker-ns' onChange={handleLogIn} onClick={logout}>Strava Log-out</a> : <a href={authCodeLink} onChange={handleLogIn}>Strava Log-in</a>}                        
        <Post 
        authCode={authCode}
        loggedIn={loggedIn}/>
    </div>
  )
}

