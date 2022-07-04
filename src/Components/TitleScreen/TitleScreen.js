import React from 'react';
import './TitleScreen.scss';
import video from '../TitleScreen/SiteDemoVid.mp4';

export default function TitleScreen() {

  const getWidth = () => {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  };

  return (
    <div id='title-screen'>
        <h1 id='title'>Run_Tracker</h1>
        <p>Please log-in to view Strava Data and to access Spotify log-in</p>
        <div id='demo-container'>
          <video id='site-demo' autoPlay loop muted>
              <source src={video} type='video/mp4'/>
              <source src={video} type="video/ogg" />
          </video>
        </div>

    </div>
  )
}
