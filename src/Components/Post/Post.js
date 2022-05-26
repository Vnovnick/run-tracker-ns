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
  
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);



  const accessCodeLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&code=${props.stravaAuthCode}&grant_type=authorization_code`; 
  const fullAuthLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  

  useEffect(() => {
    async function fetchData(){
    
    
    // requests still seem to run 3 times 

    // getting refresh token with new auth code
    
    if (props.stravaAuthCode && props.loggedIn){
      await axios.post(accessCodeLink)
      .then(response => {        
          setRefreshToken(response.data['refresh_token']);
          console.log(refreshToken);        
      })
      .catch(error => {
        console.error('Error: ', error);
      });
    }

    //refresh token post request
    if (refreshToken){
      await axios.post(fullAuthLink)    
      .then(response => {
          
          setAccessToken(response.data['access_token']);
          console.log(accessToken);
      })
      .catch(error => {
          console.error('Error: ', error);
      });
    }


    // get activity data request

    if (accessToken){
    const requestActivities = await axios.get(`${dataUrl}?access_token=${accessToken}`, {
      'Authorization': `Bearer ${accessToken}`
    });
    console.log(requestActivities.data);
    setData(requestActivities.data);    
    }
    
    }
    fetchData();
    
    
  }, [accessToken, refreshToken, fullAuthLink, accessCodeLink, props.stravaAuthCode, props.loggedIn]);

  return (
    <div className='post-list'>
        {data.map(item => (        
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


