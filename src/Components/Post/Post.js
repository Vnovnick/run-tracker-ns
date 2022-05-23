import React, {useEffect, useState} from 'react';
import axios from '../../util/axios';
import reAuthorize from '../../util/auth';

// accessToken currently out of date

const dataUrl = 'api/v3/athlete/activities';


export default function Post() {  
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState([]);
  
  
  

  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(`${dataUrl}?access_token=${accessToken}`);
      console.log(request.data);
      setData(request.data);
    }
    fetchData();
    
  }, []);

  // const items = {
  //   name: data.name,

  // };
  

  return (
    <div className='post-info'>
        {data.map(item => (
        [<h3 key={item.id}>{item.name}</h3>,
        <h2>{item.distance}</h2>,
        <h2>{item.elapsed_time}</h2>]))}

        {/* <p></p>
        <p>Post description</p>
        <h3>distance</h3>
        <h3>Average Pace</h3>
        <h3>Moving Time</h3> */}
    </div>
  )
};

