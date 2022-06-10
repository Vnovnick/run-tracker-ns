import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarComp from '../Calendar/CalendarComp';
import { Collapse } from 'bootstrap';


export default function Sidebar() {
  
  const stravaUserName = localStorage.getItem('StravaUserName');
  const stravaUserProfile = localStorage.getItem('StravaUserProfile');

  const spotifyUserName = localStorage.getItem('SpotifyUserName');
  const spotifyUserProfile = localStorage.getItem('SpotifyUserProfile');

  const [stravaProfToggle, setStravaProfToggle] = useState(false);

  useEffect(() => {
    let stravaProfCollapse = document.getElementById('stravaCollapse');
    let bsStravaProfCollapse = new Collapse(stravaProfCollapse, {toggle: false})
    stravaProfToggle ? bsStravaProfCollapse.show() : bsStravaProfCollapse.hide();
  })

  const [spotifyProfToggle, setSpotifyProfToggle] = useState(false);
  useEffect(() => {
    let spotifyProfCollapse = document.getElementById('spotifyCollapse');
    let bsSpotifyProfCollapse = new Collapse(spotifyProfCollapse, {toggle: false})
    spotifyProfToggle ? bsSpotifyProfCollapse.show() : bsSpotifyProfCollapse.hide();
  })
  

  return (
    <div className='sidebar'>
      <h1>Run_Tracker</h1>
      <ul id='user-info'>
      { window.localStorage.getItem('StravaData') &&
      <button className='btn customButton' id='stravaProfButton' onClick={() => setStravaProfToggle(stravaProfToggle => !stravaProfToggle)}><li id='strava-user'><img src={stravaUserProfile} className='rounded-circle border border-warning' alt='strava-profile'></img><h4>{stravaUserName}</h4></li></button>}
      <div className='collapse' id='stravaCollapse'>
        <div className="card card-body">Strava User Info</div>
      </div>
      { window.localStorage.getItem('SpotifyData') &&
      <button className='btn customButton' id='spotifyProfButton' onClick={() => setSpotifyProfToggle(spotifyProfToggle => !spotifyProfToggle)}><li id='spotify-user'><img src={spotifyUserProfile} className='rounded-circle border border-success' alt='strava-profile'></img><h4>{spotifyUserName}</h4></li></button>}
      <div className='collapse' id='spotifyCollapse'>
        <div className="card card-body">Spotify User Info</div>
      </div>
      
      </ul>


      {window.localStorage.getItem('StravaData') &&
      <CalendarComp />}
    </div>
  )
};
