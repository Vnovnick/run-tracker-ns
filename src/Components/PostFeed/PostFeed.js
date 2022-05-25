import React, {useEffect, useState } from 'react';
import Post from '../Post/Post';


const authData = {
  client_id: '84711',
  client_secret: '2656645c7185a01fbbf85c8bbbdf1d4d24273510',
}

export default function PostFeed() {
  const authCodeLink = `https://www.strava.com/oauth/authorize?client_id=${authData.client_id}&redirect_uri=http://localhost:3000/run-tracker-ns&response_type=code&scope=activity:read_all`;
  const codeMatch = window.location.href.match(/code=([^&]*)/);
  const [authCode, setAuthCode] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    if (loggedIn){
      setLoggedIn(false);
      console.log(loggedIn);
    }else{
      setLoggedIn(true);
      console.log(loggedIn);
    }
    
  };

  // potential logout function to clear cache data later on
  // const logout = () => {
  //   // localStorage.clear();
  //   // window.location.href = '/';
  // }


  useEffect(() => {
    if (codeMatch){
      setLoggedIn(true);
      // console.log(loggedIn);
      setAuthCode(codeMatch[1]);
      // console.log(authCode);
    }

  }, [authCode, codeMatch, loggedIn])
  
  return (
    <div className='post-feed'>
      {loggedIn ? <a href='http://localhost:3000/' onChange={handleLogIn}>Strava Log-out</a> : <a href={authCodeLink} onChange={handleLogIn}>Strava Log-in</a>}                        
        <Post 
        authCode={authCode}
        loggedIn={loggedIn}/>
    </div>
  )
}

