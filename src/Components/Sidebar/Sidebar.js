import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarComp from '../Calendar/CalendarComp';
import { Collapse } from 'bootstrap';


export default function Sidebar() {
  
  const stravaUserName = localStorage.getItem('StravaUserName');
  const stravaUserProfile = localStorage.getItem('StravaUserProfile');
  const stravaTotals = JSON.parse(localStorage.getItem('stravaTotals'));

  const spotifyUserName = localStorage.getItem('SpotifyUserName');
  const spotifyUserProfile = localStorage.getItem('SpotifyUserProfile');
  const topTracks = JSON.parse(localStorage.getItem('topTracks'));
  const topArtists = JSON.parse(localStorage.getItem('topArtists'));

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
      { window.localStorage.getItem('runData') &&
      <button className='btn customButton' id='stravaProfButton' onClick={() => setStravaProfToggle(stravaProfToggle => !stravaProfToggle)}><li id='strava-user'><img src={stravaUserProfile} className='rounded-circle border border-warning' alt='strava-profile'></img><h4>{stravaUserName}</h4></li></button>}
      <div className='collapse' id='stravaCollapse'>
        <div className="card card-body">{window.localStorage.getItem('stravaTotals') ? <><div id='run-totals'><h4>Total Runs: </h4><p>{stravaTotals.count}</p></div><div id='distance-totals'><h4>Total Distance: </h4><p>{(stravaTotals.distance * 0.000621371192).toFixed(2)} mi ({(stravaTotals.distance/1000).toFixed(2)} km)</p></div></> : 'Strava Data'}</div>
      </div>
      { window.localStorage.getItem('SpotifyData') &&
      <button className='btn customButton' id='spotifyProfButton' onClick={() => setSpotifyProfToggle(spotifyProfToggle => !spotifyProfToggle)}><li id='spotify-user'><img src={spotifyUserProfile} className='rounded-circle border border-success' alt='strava-profile'></img><h4>{spotifyUserName}</h4></li></button>}
      <div className='collapse' id='spotifyCollapse'>
        <div className="card card-body">{window.localStorage.getItem('topTracks') && <div><h4>Top Tracks:</h4><ul id='top-tracks'>{topTracks.map(track => (<li key={track.id}><img src={track.album.images[1].url} className='rounded' alt='track' width='75' height='75'></img></li>))}</ul>
        <h4>Top Artists:</h4><ul id='top-artists'>{topArtists.map(artist => (<li key={artist.id}><img src={artist.images[1].url} className='rounded' alt='artist' width='75' height='75'></img><strong>{artist.name}</strong></li>))}</ul></div>}</div>
      </div>
      
      </ul>


      {window.localStorage.getItem('runData') &&
      <CalendarComp />}
    </div>
  )
};
