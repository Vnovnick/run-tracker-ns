import { spotifyApiData } from "../apiData";
import axios from "./axios";

const baseUrl = 'https://api.spotify.com/v1';

export const params = {
    client_id: spotifyApiData.client_id,
    client_secret: spotifyApiData.client_secret,
    response_type: 'code',
    redirect_uri: 'http://localhost:3000/run-tracker-ns',

}

export const Spotify = {
    // reqUserAuth(){
    //     // `${baseUrl}/authorize`
    // },
};