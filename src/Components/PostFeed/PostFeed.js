import React, { useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
import { stravaApiData, spotifyApiData } from '../../apiData';
import Sidebar from '../Sidebar/Sidebar';


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
    window.localStorage.removeItem('stravaLogin');
  }
  const spotifyLogout = () => {
   window.localStorage.removeItem('SpotifyData');
   window.localStorage.removeItem('spotifyLogin');
   window.localStorage.removeItem('runTracks');
 
  }



    const getStravaUrlCode = () => {
      if (codeMatch && codeMatch[1].length < 41){
        setLoggedIn(true);
        setStravaAuthCode(codeMatch[1]);
        window.localStorage.setItem('stravaLogin', loggedIn);
        // console.log(loggedIn);
       
        // console.log(authCode);
      }
    }
 
    const getSpotifyUrlCode = () => {
      if (codeMatch && codeMatch[1].length > 41 && spotifyStateMatch){
        setSpotLoggedIn(true);
        window.localStorage.setItem('spotifyLogin', spotLoggedIn);
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

    const renderTotalLogout = () => {
      return <li><a href='http://localhost:3000/run-tracker-ns' onClick={() => {stravaLogout(); spotifyLogout();}}>Log-out of both Strava and Spotify</a></li>;
    };
    



  return (
    <div className='post-feed'>
      <ul>
     {(window.localStorage.getItem('stravaLogin') && window.localStorage.getItem('spotifyLogin')) && (renderTotalLogout())}
     </ul>       
      {!(window.localStorage.getItem('stravaLogin') && window.localStorage.getItem('spotifyLogin')) && 
      <ul id='logins'>
        {window.localStorage.getItem('stravaLogin') ? <li><a href={redirect_uri} onClick={stravaLogout} >Strava Log-out</a></li> : <li><a href={authCodeLink}>Strava Log-in</a></li>}  
        {window.localStorage.getItem('stravaLogin') && (window.localStorage.getItem('spotifyLogin') ? <li><a href={redirect_uri} onClick={spotifyLogout} >Spotify Log-out</a></li> : <li><a href={spotAuthCodeLink} >Spotify Log-in</a></li>)}
      </ul>}    
      
        <Sidebar />               
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