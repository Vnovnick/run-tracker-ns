import React from 'react';
import './Sidebar.css';


export default function Sidebar() {


  const stravaUserName = localStorage.getItem('StravaUserName');
  const stravaUserProfile = localStorage.getItem('StravaUserProfile');
  console.log(stravaUserName);
  


  return (
    <div className='sidebar'>
      <h1>I am a Sidebar.</h1>
      { window.localStorage.getItem('StravaData') &&
      <ul><img src={stravaUserProfile} alt='strava-profile'></img>{stravaUserName}</ul>}
    </div>
  )
};
