import React, {useEffect, useState} from 'react';
import axios from '../../util/axios';




const dataUrl = 'api/v3/athlete/activities';
const authUrl = '/oauth/token';
const authData = {
    client_id: '84711',
    client_secret: '2656645c7185a01fbbf85c8bbbdf1d4d24273510',
}


export default function Post(props) {  
  
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);
  // const [newAuth, setNewAuth] = useState('');


  
  const fullAuthLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  const accessCodeLink = `${authUrl}?client_id=${authData.client_id}&client_secret=${authData.client_secret}&code=${props.authCode}&grant_type=authorization_code`; 



  useEffect(() => {
    async function fetchData(){
    
    
    // requests still seem to run 3 times 
    // console.log(props.authCode);
    // getting refresh token with new auth code
    
    if (props.authCode && props.loggedIn){
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
          // console.log(response.data['access_token']);        
          setAccessToken(response.data['access_token']);
          console.log(accessToken);
      })
      .catch(error => {
          console.error('Error: ', error);
      });
    }

  
    // get activity data request

    if (accessToken){
    const requestActivities = await axios.get(`${dataUrl}?access_token=${accessToken}`);
    console.log(requestActivities.data);
    setData(requestActivities.data);
    }
    
    }
    fetchData();
    
    
  }, [accessToken, refreshToken, fullAuthLink, accessCodeLink, props.authCode, props.loggedIn]);


 

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

