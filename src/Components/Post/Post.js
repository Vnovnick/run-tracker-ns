import React, {useEffect, useState} from 'react';
import axios from '../../util/axios';

let accessToken = "b99d56cc7b18aa3527edff334a58b370119d8bfa";

const clientID = '84711';
const clientSecret = '2656645c7185a01fbbf85c8bbbdf1d4d24273510';
const dataUrl = 'api/v3/athlete/activities';


export default function Post() {  
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(`${dataUrl}?access_token=${accessToken}`);
      console.log(request.data);
      setData(request.data);
    }
    fetchData();
    
  }, []);

  const items = {
    name: data.name,

  };
  

  return (
    <div className='post-info'>
        {data.map(item => <h3 key={item.id}>{item.name}</h3>)}

        {/* <p></p>
        <p>Post description</p>
        <h3>distance</h3>
        <h3>Average Pace</h3>
        <h3>Moving Time</h3> */}
    </div>
  )
};

