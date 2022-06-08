import React from 'react';
import './Sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Sidebar() {

  const stravaUserName = localStorage.getItem('StravaUserName');
  const stravaUserProfile = localStorage.getItem('StravaUserProfile');

  const spotifyUserName = localStorage.getItem('SpotifyUserName');
  const spotifyUserProfile = localStorage.getItem('SpotifyUserProfile');
  


  return (
    <div className='sidebar'>
      <h1>Run_Tracker</h1>
      <ul id='user-info'>
      { window.localStorage.getItem('StravaData') &&
      <li id='strava-user'><img src={stravaUserProfile} className='rounded-circle border border-warning' alt='strava-profile'></img><h4>{stravaUserName}</h4></li>}
      { window.localStorage.getItem('SpotifyData') &&
      <li id='spotify-user'><img src={spotifyUserProfile} className='rounded-circle border border-success' alt='strava-profile'></img><h4>{spotifyUserName}</h4></li>}
      </ul>
    </div>
  )
};
