import React from 'react';
import './Sidebar.css';

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
        <h1>I am a Sidebar.</h1>
        <ul>
          {window.localStorage.getItem('StravaData') ? 
          <li><img src={window.localStorage.getItem('StravaUserProfile')} alt='profile'></img>{window.localStorage.getItem('StravaUserName')}</li> :
          'Login to Strava'}
          
        </ul>
    </div>
  )
};
