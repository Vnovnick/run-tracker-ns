import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarComp from '../Calendar/CalendarComp';
import { Collapse } from 'bootstrap';
import defaultProfile from '../Sidebar/defaultStravaProfile.png';
import icon from '../../running.ico';
import blueDot from '../Calendar/blueDot.png';
import greenDot from '../Calendar/greenDot.png';

export default function Sidebar() {
  
  const stravaUserName = localStorage.getItem('StravaUserName');
  const stravaUserProfile = localStorage.getItem('StravaUserProfile');
  const stravaTotals = JSON.parse(localStorage.getItem('stravaTotals'));
  const stravaYtdTotals = JSON.parse(localStorage.getItem('stravaYtdTotals'));

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
  
  const addDefaultImage = (event) => {
    event.target.onError = null;
    event.target.src = defaultProfile;
  }
  

  return (
    <div className='sidebar' id='sidebar-wrapper'>
      <div id='sidebar-title'>
        <img id='logo' src={icon} alt='logo' width='40px' height='40px'></img>
        <h1>Run_Tracker</h1>
      </div>
      <ul id='user-info'>
        { window.localStorage.getItem('runData') &&
        <button className='btn customButton' id='stravaProfButton' onClick={() => setStravaProfToggle(stravaProfToggle => !stravaProfToggle)}>
          <li id='strava-user'>
            <img src={stravaUserProfile} className='rounded-circle border border-warning' onError={addDefaultImage} alt='strava-profile'></img>
            <h4>{stravaUserName}</h4>
          </li>
        </button>}
        <div className='collapse' id='stravaCollapse'>
          <div className="card card-body sidebarCollapse">
          {window.localStorage.getItem('stravaTotals') ? 
          <>
            <div id='run-totals'>
              <h4>Total Runs: </h4>
                <p>{stravaTotals.count}</p>
            </div>
            <div id='distance-totals'>
              <h4>Total Distance: </h4>
                <p>{(stravaTotals.distance * 0.000621371192).toFixed(2)} mi ({(stravaTotals.distance/1000).toFixed(2)} km)</p>
            </div>
            <div id='ytd-totals'>
              <h4>Runs This Year: </h4>
                <p>{stravaYtdTotals.count}</p>
            </div>
            <div id='ytd-distance-totals'>
              <h4>Distance This Year: </h4>
                <p>{(stravaYtdTotals.distance * 0.000621371192).toFixed(2)} mi ({(stravaYtdTotals.distance/1000).toFixed(2)} km)</p>
            </div>
          </> 
          : 'Strava Data'}
        </div>
        </div>
        { window.localStorage.getItem('SpotifyData') &&
        <button className='btn customButton' id='spotifyProfButton' onClick={() => setSpotifyProfToggle(spotifyProfToggle => !spotifyProfToggle)}><li id='spotify-user'><img src={spotifyUserProfile} className='rounded-circle border border-success' alt='strava-profile'></img><h4>{spotifyUserName}</h4></li></button>}
        <div className='collapse' id='spotifyCollapse'>
          <div className="card card-body sidebarCollapse">{window.localStorage.getItem('topTracks') && 
          <div><h4>Month's Top Tracks:</h4><ul id='top-tracks'>{topTracks.map(track => (<li key={track.id}><img src={track.album.images[1].url} className='rounded' alt='track' width='75' height='75'></img><p><strong>{track.name}</strong></p></li>))}</ul>
          <h4>Month's Top Artists:</h4><ul id='top-artists'>{topArtists.map(artist => (<li key={artist.id}><img src={artist.images[1].url} className='rounded' alt='artist' width='75' height='75'></img><strong>{artist.name}</strong></li>))}</ul></div>}</div>
        </div>      
      </ul>
      {window.localStorage.getItem('runData') &&
      <>
        <CalendarComp />
        <br></br>
          <div id='color-text'>
            <h5>Long runs - <span><img src={greenDot} height='16px' width='16px' style={{marginLeft: '2px', marginBottom: '2px'}} alt='green-dot'></img></span></h5>
            <h5>Workout runs - <span><img src={blueDot} height='10px' width='10px' style={{marginLeft: '3px', marginBottom: '2px'}} alt='blue-dot'></img></span></h5>
          </div>
      </>
      }
    </div>
  )
};
