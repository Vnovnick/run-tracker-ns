import React, {useEffect, useState} from 'react';
import axios from '../../util/axios';
import './Post.css';
import { stravaApiData } from '../../apiData';






const dataUrl = 'api/v3/athlete/activities';
const authUrl = '/oauth/token';
const authData = {
    client_id: stravaApiData.client_id,
    client_secret: stravaApiData.client_secret,
}


export default function Post(props) {  
  
  // strava states and links
  const [stravaRefreshToken, setStravaRefreshToken] = useState('');
  const [stravaAccessToken, setStravaAccessToken] = useState('');
  const [stravaData, setStravaData] = useState([]);

  const stravaAccessCodeLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&code=${props.stravaAuthCode}&grant_type=authorization_code`; 
  const stravaFullAuthLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&refresh_token=${stravaRefreshToken}&grant_type=refresh_token`;

  // spotify states and links
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState('');
  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
  const [spotifyData, setSpotifyData] = useState([]);

  

  useEffect(() => {
    async function fetchStravaData(){
    
    
    // requests still seem to run 3 times 

    // getting refresh token with new auth code
    
    if (props.stravaAuthCode && props.loggedIn){
      await axios.post(stravaAccessCodeLink)
      .then(response => {        
          setStravaRefreshToken(response.data['refresh_token']);
          console.log(stravaRefreshToken);        
      })
      .catch(error => {
        console.error('Error: ', error);
      });
    }

    //refresh token post request
    if (stravaRefreshToken){
      await axios.post(stravaFullAuthLink)    
      .then(response => {
          
          setStravaAccessToken(response.data['access_token']);
          console.log(stravaAccessToken);
      })
      .catch(error => {
          console.error('Error: ', error);
      });
    }


    // get activity data request

    if (stravaAccessToken){
    const requestActivities = await axios.get(`${dataUrl}?access_token=${stravaAccessToken}`, {
      'Authorization': `Bearer ${stravaAccessToken}`
    });
    console.log(requestActivities.data);
    setStravaData(requestActivities.data);    
    }
    
    }
    fetchStravaData();
    
    
  }, [stravaAccessToken, stravaRefreshToken, stravaFullAuthLink, stravaAccessCodeLink, props.stravaAuthCode, props.loggedIn]);

  return (
    <div className='post-list'>
        {stravaData.map(item => (        
        <div className='post-info' key={item.id}>
        <br></br>
        <h3>{item.name}</h3>
        <h4>Distance: {item.distance}</h4>
        <p>Start Date: {item.start_date} || Time Elapsed: {item.elapsed_time}</p>
        <br></br>
        </div>))}

        {/* <p></p>
        <p>Post description</p>
        <h3>distance</h3>
        <h3>Average Pace</h3>
        <h3>Moving Time</h3> */}
    </div>
  )
};


