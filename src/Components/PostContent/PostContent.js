import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostContent.scss';
import { Collapse } from 'bootstrap';
// import { $CombinedState } from 'redux';



export default function PostContent(props) {
// strava data points to work with: 
// elapsed_time, start_date, moving_time

// spotify data points to work with:
// played_at


    const stravaStorageData = localStorage.getItem('runData');
    const stravaConvertedData = JSON.parse(stravaStorageData);

    const spotifyStorageData = localStorage.getItem('SpotifyData');
    const spotifyConvertedData = JSON.parse(spotifyStorageData);
    // console.log(spotifyConvertedData);

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

        const ISOConversion = runStartDates.map(date => {
            let newDate = new Date(date);
            // let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            let day = newDate.getDate();

            if (day < 10){
                day = '0' + day;
            }
            if (month < 10){
                month = '0' + month;
            }

            return (month + '/' + day);
        })

        window.localStorage.setItem('runTimes', JSON.stringify(ISOConversion));

        const elapsedConv = movingTimes.map(time => {
            const mins = Math.floor(time/60);
            const seconds = time % 60;
            return `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        })

        window.localStorage.setItem('convMovingTimes', JSON.stringify(elapsedConv));

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
    const runTimes = JSON.parse(localStorage.getItem('runTimes'));  
    const convMovingTimes = JSON.parse(localStorage.getItem('convMovingTimes'));
    const [showSongs, setShowSongs] = useState(false);
    const [songListClass, setSongListClass] = useState(false);

    const handleSongButtonClick = event => {
        setShowSongs(!showSongs);
        setSongListClass(!songListClass);
    };

    const [chartToggle, setChartToggle] = useState(false);

    // useEffect(() => {
    //     const chartFunc = (id) => {
    //         setChartToggle(chartToggle => !chartToggle)
    //         let chartCollapse = document.querySelector(`[id^=${id}]`);
    //         let bsChartCollapse = new Collapse(chartCollapse, {toggle: false})
    //         chartToggle ? bsChartCollapse.show() : bsChartCollapse.hide(); 
    //     }

    // })
    useEffect(() => {
        if (stravaConvertedData){
            let chartCollapse = document.querySelector('[id^="chartCollapse"]');
            let bsChartCollapse = new Collapse(chartCollapse, {toggle: false})
            chartToggle ? bsChartCollapse.show() : bsChartCollapse.hide(); 
        }
    })
    // unique id error with spotify id will hopefully go away once all data is rendered in one div
  return (
    <div className='post-content'>
        {stravaConvertedData ? stravaConvertedData.map((item, i) => (        
        <div className='post-info-wrapper'>
            <div className='post-info' key={i}>     
                <div className='post-stravaData'>
                    <h3 id='run-date'>{runTimes[i]} </h3>
                    <h3 id='run-name'>{item.name}</h3>
                    <h4 id='run-distance'>Distance: {(item.distance * 0.000621371192).toFixed(2)} mi ({(item.distance/1000).toFixed(2)} km)</h4>
                    <p id='run-elapsed'>Time Elapsed: {convMovingTimes[i]}</p> 
                    <button className='btn' id='chartButton' onClick={() => {setChartToggle(chartToggle => !chartToggle)}}>Run Chart</button>
                </div>
                {(runTrackObjs && runTrackObjs[i].length >= 1) ? 
                (<div className='song-list-wrapper'><h3>Listened to: </h3><ul class={songListClass ? 'song-list-open' : "song-list"}>{runTrackObjs[i].map(t => (<li key={t.id}><img src={t.track.album.images[1].url} className='rounded' width="100" height="100" alt='Album Cover'></img><br></br><strong>{t.track.name}</strong> <br></br>({t.track.album.name})</li>))}</ul>
                {runTrackObjs[i].length > 6 && (<button className={showSongs ? 'show-less' : 'show-all'} id='song-button' onClick={handleSongButtonClick}>{showSongs ? 'Show Less' : 'Show All'}</button>)}
                </div>) : 
                ((stravaConvertedData && !runTrackObjs) ?  'Please Login to Spotify to see song data' : 'Song Data Unavailable (Spotify limited to last 50 songs)')}

                <br></br>

            </div>
            <div className='collapse customCollapse' id={`chartCollapse${i}`}>
                    <div className='card card-body'>Chart</div>                
                </div>
        </div>
        )) 
        : 'Please log-in to view Strava Data and to access Spotify log-in'}
        <br></br>    
        {/* {!spotifyConvertedData && 'Login to Strava and then to Spotify to see song data'} */}
    </div>
  )
}
