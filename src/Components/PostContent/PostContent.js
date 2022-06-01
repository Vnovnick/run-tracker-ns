import React from 'react';

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



    let stravaStorageData = localStorage.getItem('StravaData');
    let stravaConvertedData = JSON.parse(stravaStorageData);
    let spotifyStorageData = localStorage.getItem('SpotifyData');
    let spotifyConvertedData = JSON.parse(spotifyStorageData);

    if (stravaConvertedData) {
        const runStartDates = stravaConvertedData.map(({start_date}) => start_date); //'2022-05-28T00:56:57Z'
        const movingTimes = stravaConvertedData.map(({moving_time}) => moving_time);
        console.log(movingTimes);
        // console.log(runStartDates);

        let convRunStartDates = runStartDates.map(date => {
            let event = new Date(date);             
            const [hours, minutes, seconds] = event.toLocaleTimeString('it-IT').split(':');
            const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
            return totalSeconds;
            
        });
        console.log(convRunStartDates);

        // let convMovingTimes = movingTimes.map(num => {
            
        // })
        


    };

// 2022-05-31T15:18:44.481Z
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
    
    {spotifyConvertedData ? spotifyConvertedData.map(item => (
        <div className='post-tracks' key={item.id}>
        <h3>{item.track.name}</h3>
        </div>
        )) : 'Please Log-in to view Spotify Data'}
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
