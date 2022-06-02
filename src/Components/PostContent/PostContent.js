import React from 'react';
import { trackList } from './trackList';

export default function PostContent(props) {


// strava data points to work with potentially: 
// elapsed_time, start_date, moving_time

// spotify data points to work with potentially:
// played_at

// ideas for finding songs during runs
// 1. take the start date of a run, add its elapsed time to the start_date and convert it to the same date format as the start date.
// 2. convert this date to match the format of the spotify date listed.
// 3. create a list of all of the seconds of said run time range
// 3b. (steps 2 and 3 might need to be swapped depending on how easy it is to iterate through the date format that spotify uses)
// 4. retrieve all of the played_at values of the generated spotify data object
// 5. compare the list of seconds during the run to the played at dates
// 6. if the played at dates/times fall within the range of the seconds list or match any of the seconds on said list, then they will be added to a separate array that is tied to the run
// 7. display the songs in this new list along with the 

// {start: start_time, end: end_time} => [start, end], 
// 
// is the song greater than or less than runRange


    let stravaStorageData = localStorage.getItem('StravaData');
    let stravaConvertedData = JSON.parse(stravaStorageData);

    let spotifyStorageData = localStorage.getItem('SpotifyData');
    let spotifyConvertedData = JSON.parse(spotifyStorageData);

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
        console.log(runRanges[0]);

    if (spotifyConvertedData){
        let spotifyPlayedAtArr = spotifyConvertedData.map(({played_at}) => played_at);
        let convSpotifyPlayedAtArr = spotifyPlayedAtArr.map(date => {
            return new Date(date).getTime();})

        // const trackList = (song) => {
        //     if (song >= runRanges[0][0] && song <= runRanges[0][1]){
        //         return song;
        //     }     
        // };
        // let testTrackList = convSpotifyPlayedAtArr.filter(trackList);
        // console.log(testTrackList);

        const rangeFunc = (run) => {
            return convSpotifyPlayedAtArr.filter(song => {
                if (song >= run[0] && song <= run[1]){
                    return song;
                }
                return false;  
            })
        };


        let tracksDuringRun = runRanges.map(rangeFunc);
        // let testTrackList = convSpotifyPlayedAtArr.filter(trackList);

        console.log(tracksDuringRun);
        };

        // let playedDuringRun = runRanges.map((run, i) => {
        //     if (run[i][0] <= convSpotifyPlayedAtArr)
        // })


        // const trackRunList = (start <= trackTime < end)
    };

    // unique id error with spotify id will hopefully go away once all data is rendered in one div
  return (
    <div>
        {stravaConvertedData ? stravaConvertedData.map(item => (        
        <div className='post-info' key={item.id}>
        <br></br>
        <h3>{item.name}</h3>
        <h4>Distance: {item.distance}</h4>
        <p>Start Date: {item.start_date} || Time Elapsed: {item.elapsed_time}</p>
        <br></br>
        </div>)) : 'Please Log-in to view Strava Data'}
    <br></br>
    {spotifyConvertedData ? spotifyConvertedData.map(item => (
        <div className='post-tracks' key={item.id}>
        <h3>{item.track.name}</h3>
        </div>
        )) : 'Please first login to Strava to be able to login to Spotify'}
    {/* {props.stravaData.map(item => (        
        <div className='post-info' key={item.id}>
        <br></br>
        <h3>{item.name}</h3>
        <h4>Distance: {item.distance}</h4>
        <p>Start Date: {item.start_date} || Time Elapsed: {item.elapsed_time}</p>
        <br></br>
        </div>))}
    
    {props.spotifyData.map(item => (
        <div className='post-tracks' key={item.id}>
        <h3>{item.track.name}</h3>
        </div>
        ))} */}
    </div>
  )
}
