import React, {useEffect, useState } from 'react';
import Post from '../Post/Post';
import axios from '../../util/axios';

const authData = {
  client_id: '84711',
  client_secret: '2656645c7185a01fbbf85c8bbbdf1d4d24273510',
  // refresh_token: 'cb1144efacbd24937379f203717209da0b49a50c',
  code: '6d48ab930882cf49c28b03657089db9cd225f51d'

}

export default function PostFeed() {
  const authCodeLink = `https://www.strava.com/oauth/authorize?client_id=${authData.client_id}&redirect_uri=http://localhost:3000/run-tracker-ns&response_type=code&scope=activity:read_all`;
  
  // const authCodeRedirect = () => {
  //   window.open(authCodeLink, '_blank');
  // };

  return (
    <div className='post-feed'>
        <a href={authCodeLink}>Log in</a>
        {/* <Post /> */}
    </div>
  )
}

