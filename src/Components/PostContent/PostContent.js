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


    const tracksDuringRun = () => {

    };
    let storageData = localStorage.getItem('StravaData');
    let convertedData = JSON.parse(storageData);

    // unique id error with spotify id will hopefully go away once all data is rendered in one div
  return (
    <div>
        {convertedData ? convertedData.map(item => (        
        <div className='post-info' key={item.id}>
        <br></br>
        <h3>{item.name}</h3>
        <h4>Distance: {item.distance}</h4>
        <p>Start Date: {item.start_date} || Time Elapsed: {item.elapsed_time}</p>
        <br></br>
        </div>)) : 'Please Log-in to view Strava Data'}
    
    {props.spotifyData.map(item => (
        <div className='post-tracks' key={item.id}>
        <h3>{item.track.name}</h3>
        </div>
        ))}
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
