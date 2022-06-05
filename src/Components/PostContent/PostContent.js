import React from 'react';


export default function PostContent(props) {
// strava data points to work with: 
// elapsed_time, start_date, moving_time

// spotify data points to work with:
// played_at

    const stravaStorageData = localStorage.getItem('StravaData');
    const stravaConvertedData = JSON.parse(stravaStorageData);

    const spotifyStorageData = localStorage.getItem('SpotifyData');
    const spotifyConvertedData = JSON.parse(spotifyStorageData);
    console.log(spotifyConvertedData);

    if (stravaConvertedData) {
        const runStartDates = stravaConvertedData.map(({start_date}) => start_date); //original date formal = '2022-05-28T00:56:57Z'
        const movingTimes = stravaConvertedData.map(({elapsed_time}) => elapsed_time);
        let convRunStartDates = runStartDates.map(date => {
            return new Date(date).getTime();        
        });

        let zippedTimes = convRunStartDates.map((d, i) => {
            return [d, (movingTimes[i] * 1000)];
        });
        // console.log(zippedTimes);

        let runEndTimes = zippedTimes.map(arr => {
            return arr[0] + arr[1];
        })
        // console.log(runEndTimes);

        let runRanges = convRunStartDates.map((d, i) => {
            return [d, runEndTimes[i]];
        });

    if (spotifyConvertedData){
        let spotifyPlayedAtArr = spotifyConvertedData.map(({played_at}) => played_at);
        let convSpotifyPlayedAtArr = spotifyPlayedAtArr.map(date => {
            return new Date(date).getTime();})

        const rangeFunc = (run) => {
            return convSpotifyPlayedAtArr.filter(song => {
                if (song >= run[0] && song <= run[1]){
                    return song;
                }
                return false;  
            })
        };
        
        const tracksDuringRun = runRanges.map(rangeFunc);
        // window.localStorage.setItem('tracks', JSON.stringify(tracksDuringRun));      


        const songObjs = (trackTimes) => {
            return spotifyConvertedData.filter(obj => {
                let objPlayedAt = new Date(obj.played_at).getTime();
                if (trackTimes.includes(objPlayedAt)){
                    return obj;
                }
                return false;
                
            })
        };  

        const runSongObj = tracksDuringRun.map(songObjs);
        window.localStorage.setItem('runTracks', JSON.stringify(runSongObj));
        };
    };

    const runTrackObjs = JSON.parse(localStorage.getItem('runTracks'));

    // unique id error with spotify id will hopefully go away once all data is rendered in one div
  return (
    <div>
        {stravaConvertedData ? stravaConvertedData.map((item, i) => (        
        <div className='post-info' key={item.id}>
        <br></br>
        <h3>{item.name}</h3>
        <h4>Distance: {item.distance}</h4>
        <p>Start Date: {item.start_date} || Time Elapsed: {item.elapsed_time}</p>
        {runTrackObjs ? <ul>{runTrackObjs[i].map(t => <li>{t.track.name}</li>)}</ul> : 'No song data to display.'}
        <br></br>
        </div>)) : 'Please Log-in to view Strava Data'}
    <br></br>
    {spotifyConvertedData ? spotifyConvertedData.map(item => (
        <div className='post-tracks' key={item.id}>
        <h3>{item.track.name}</h3>
        </div>
        )) : 'Please first login to Strava to be able to login to Spotify'}
    </div>
  )
}
