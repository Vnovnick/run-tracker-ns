import { useEffect } from 'react';
import axios from './axios';

const authUrl = '/oauth/token';
const data = {
    client_id: '84711',
    client_secret: '2656645c7185a01fbbf85c8bbbdf1d4d24273510',
    refresh_token: '71ca827cdfa144f487c1c5686ab13ac10a2f0716',
    grant_type: 'refresh_token'
}
const fullAuthLink = `${authUrl}?client_id=${data.client_id}&client_secret=${data.client_secret}&refresh_token=${data.refresh_token}&grant_type=${data.grant_type}`;

export default function reAuthorize(){
    axios.post(fullAuthLink, {
        headers: {
            'Accept': 'application/json, text/plain */*',
            'Content-type': 'application/json'
    
        }
    })
    .then(response => {
        const accessToken = response.data.access_token;
        console.log(accessToken);
        
    })
    .catch(error => {
        console.error('Error: ', error);
    });
   
    
};

