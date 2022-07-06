import React from 'react';
import './TitleScreen.scss';
import video from '../TitleScreen/SiteDemoVid.mp4';

export default function TitleScreen() {
  window.onload = () => {
    changeClass();
  };
  const changeClass = () => {
    let width = window.innerWidth;
    console.log(width);
    if (width < 1500){
      document.getElementById('demo-container').classList.remove('right');
    }else if (width >= 1501){
      document.getElementById('demo-container').classList.add('right');
    }
  };

  window.addEventListener('resize', () => {
    changeClass();
  });

  return (
    <div id='title-screen'>
      <div id='heading-elements'>
        <h1 id='title'>Run_Tracker</h1>
        <p>Please log-in to view Strava Data and to access Spotify log-in</p>
      </div>
      <div id='demo-container' className='demo-wrapper'>
        <video id='site-demo' className='demo-vid' autoPlay loop muted>
            <source src={video} type='video/mp4'/>
            <source src={video} type="video/ogg" />
        </video>
      </div>

    </div>
  )
}
