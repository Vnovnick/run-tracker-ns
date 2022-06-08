import React from 'react';
import './Sidebar.css';


export default function Sidebar() {

  const stravaUserName = localStorage.getItem('StravaUserName');
  const stravaUserProfile = localStorage.getItem('StravaUserProfile');

  const spotifyUserName = localStorage.getItem('SpotifyUserName');
  const spotifyUserProfile = localStorage.getItem('SpotifyUserProfile');
  


  return (
    <div className='sidebar'>
      <h1>I am a Sidebar.</h1>
      <ul id='user-info'>
      { window.localStorage.getItem('StravaData') &&
      <li id='strava-user'><img src={stravaUserProfile} alt='strava-profile'></img>{stravaUserName}</li>}
      { window.localStorage.getItem('SpotifyData') &&
      <li id='spotify-user'><img src={spotifyUserProfile} alt='strava-profile'></img>{spotifyUserName}</li>}
      </ul>
    </div>
  )
};
