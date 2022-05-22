import React from 'react';
import axios from './axios';

let accessToken;
const clientID = '84711';
const clientSecret = '2656645c7185a01fbbf85c8bbbdf1d4d24273510';
const authUrl = '/oauth/authorize';
const redirectUri = 'http://localhost:3000/run-tracker-ns';


export default function getAccessToken(){
    if (accessToken){
        return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch){
        accessToken = accessTokenMatch[1];
    }
    axios.get(`${authUrl}?${clientID}&${redirectUri}&response_type=code&scope=activity:read_all`)
    
};