import React, {useEffect, useState} from 'react';
import axios from '../../util/axios';
// import reAuthorize from '../../util/auth';

// accessToken currently out of date

const dataUrl = 'api/v3/athlete/activities';
const authUrl = '/oauth/token';
const authData = {
    client_id: '84711',
    client_secret: '2656645c7185a01fbbf85c8bbbdf1d4d24273510',
    refresh_token: 'cb1144efacbd24937379f203717209da0b49a50c',
    grant_type: 'refresh_token'
}
const fullAuthLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&refresh_token=${authData.refresh_token}&grant_type=${authData.grant_type}`;
const authCodeLink = `https://www.strava.com/oauth/authorize?client_id=${authData.client_id}&redirect_uri=http://localhost:3000/run-tracker-ns&response_type=code&scope=activity:read_all`;

export default function Post() {  
  
  const [data, setData] = useState([]);
  const [accessToken, setAccessToken] = useState('');


  useEffect(() => {
    async function fetchData(){

    // get auth code request
    // const authCode = axios.get(authCodeLink);
    
    
    
    //refresh token post request
    await axios.post(fullAuthLink)    
    .then(response => {
        setAccessToken(response.data.access_token);
        console.log(accessToken);
        
    })
    .catch(error => {
        console.error('Error: ', error);
    });
    
    // get activity data request
    if (accessToken){
    const requestActivities = await axios.get(`${dataUrl}?access_token=${accessToken}`);
    console.log(requestActivities.data);
    setData(requestActivities.data);
    }
    
    }
    fetchData();
    
  }, [accessToken]);

  // const items = {
  //   name: data.name,

  // };
  

  return (
    <div className='post-info'>
        {data.map(item => (
        <div key={item.id}>
        <h3>{item.name}</h3>
        <h2>{item.distance}</h2>
        <h2>{item.elapsed_time}</h2>
        </div>))}

        {/* <p></p>
        <p>Post description</p>
        <h3>distance</h3>
        <h3>Average Pace</h3>
        <h3>Moving Time</h3> */}
    </div>
  )
};

