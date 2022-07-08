import React, { useState } from 'react';
import Post from '../Post/Post';
import axios from 'axios';
import { stravaApiData, spotifyApiData } from '../../apiData';
import './PostFeed.scss';
import TitleScreen from '../TitleScreen/TitleScreen';
import ReactLoading from 'react-loading';
import barButton from '../PostFeed/menu.png';

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


  const stravaLogout = () => {
    axios.post('https://www.strava.com/oauth/deauthorize');
    window.localStorage.removeItem('stravaLogin');
    window.localStorage.removeItem('StravaUserProfile');
    window.localStorage.removeItem('StravaUserName');
    window.localStorage.removeItem('runData');
    window.localStorage.removeItem('runTimes');
    window.localStorage.removeItem('convMovingTimes');
    window.localStorage.removeItem('stravaTotals');
    window.localStorage.removeItem('selectedDay');
    window.localStorage.removeItem('stravaYtdTotals');
  }
  const spotifyLogout = () => {
   window.localStorage.removeItem('SpotifyData');
   window.localStorage.removeItem('spotifyLogin');
   window.localStorage.removeItem('runTracks');
   window.localStorage.removeItem('SpotifyUserName');
   window.localStorage.removeItem('SpotifyUserProfile');
   window.localStorage.removeItem('topArtists');
   window.localStorage.removeItem('topTracks');
 
  }
  window.onclose = () => {
    stravaLogout();
    spotifyLogout();
  }

  const getStravaUrlCode = () => {
    if (codeMatch && codeMatch[1].length < 41){
      setLoggedIn(true);
      setStravaAuthCode(codeMatch[1]);
      window.localStorage.setItem('stravaLogin', loggedIn);
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
    return <li><a className='btn logout-button' href={redirect_uri} onClick={() => {stravaLogout(); spotifyLogout(); setIsLoading(true)}}>Log-out of all accounts</a>{isLoading && <div id='spinner'><ReactLoading type={'bars'} color={'black'} height={'25px'} width={'25px'} /></div>}</li>;
  };
  
  // changing sidebar class on resize
  let isHidden;
  const changeSidebarClass = () => {
    let width = window.innerWidth;
    if (width < 1100 && !isHidden){
      document.getElementById('sidebar-wrapper').classList.add('hidden');
      isHidden = true;
    }else if (width >= 1101 && isHidden){
      document.getElementById('sidebar-wrapper').classList.remove('hidden');
      isHidden = false;
    }
  };
  window.onload = () => {
    changeSidebarClass();
    let width = window.innerWidth;
    if (width < 1100){
      isHidden = true;
    }else if (width >= 1101){
      isHidden = false;
    }
  };
  window.addEventListener('resize', () => {
    changeSidebarClass();
  });

  
  const setIsHiddenFunc = () => {
    if (!isHidden){
      document.getElementById('sidebar-wrapper').classList.add('hidden');
      isHidden = true;
    } else{
      document.getElementById('sidebar-wrapper').classList.remove('hidden');
      isHidden = false;
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='post-feed'>
      <ul id='total-logout'>
     {(window.localStorage.getItem('stravaLogin') && window.localStorage.getItem('spotifyLogin')) && (renderTotalLogout())}
     </ul>       
      {!(window.localStorage.getItem('stravaLogin') && window.localStorage.getItem('spotifyLogin')) && 
      <ul id='logins'>
        {window.localStorage.getItem('stravaLogin') ? <li><a href={redirect_uri} onClick={stravaLogout} ><button className='btn str-button'>Strava Log-out</button></a></li> : 
        <li><a href={authCodeLink} onClick={() => setIsLoading(true)}><button className='btn str-button'>Strava Log-in</button></a>{isLoading && <div id='spinner'><ReactLoading type={'bars'} color={'black'} height={'25px'} width={'25px'}/></div>}</li>}  
        {window.localStorage.getItem('stravaLogin') && (window.localStorage.getItem('spotifyLogin') ? <li><a href={redirect_uri} onClick={spotifyLogout} ><button className='btn spotify-button'>Spotify Log-out</button></a></li> : 
        <li id='spot-login-li'><a href={spotAuthCodeLink} onClick={() => setIsLoading(true)}><button className='btn spotify-button'>Spotify Log-in</button></a>{isLoading && <div id='spinner'><ReactLoading type={'bars'} color={'black'} height={'25px'} width={'25px'} /></div>}</li>)}
      </ul>}
      {window.localStorage.getItem('stravaLogin') && 
        <button className='btn' id='sidebar-button' onClick={() => {setIsHiddenFunc();}}><img src={barButton} id='side-btn-image' alt='Sidebar Button'></img></button>
      }


      {(!loggedIn && !spotLoggedIn) &&       
        <TitleScreen />  
      }  
      <Post 
      stravaAuthCode={stravaAuthCode}
      spotifyStateMatch={spotifyAuthState}
      spotifyAuthCode={spotifyAuthCode}
      spotLoggedIn={spotLoggedIn}
      loggedIn={loggedIn}/>

    </div>
  )
}