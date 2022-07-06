import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostContent.scss';
import RunChart from '../RunChart/RunChart';
import moment from 'moment';
import blueDot from '../Calendar/blueDot.png';
import greenDot from '../Calendar/greenDot.png';

export default function PostContent(props) {
// strava data points to work with: 
// elapsed_time, start_date, moving_time

// spotify data points to work with:
// played_at
    const stravaStorageData = localStorage.getItem('runData');
    const stravaConvertedData = JSON.parse(stravaStorageData);

    const spotifyStorageData = localStorage.getItem('SpotifyData');
    const spotifyConvertedData = JSON.parse(spotifyStorageData);

    if (stravaConvertedData) {
        const runStartDates = stravaConvertedData.map(({start_date}) => start_date); //original date formal = '2022-05-28T00:56:57Z'
        const movingTimes = stravaConvertedData.map(({elapsed_time}) => elapsed_time);
        let convRunStartDates = runStartDates.map(date => {
            return new Date(date).getTime();        
        });

        let zippedTimes = convRunStartDates.map((d, i) => {
            return [d, (movingTimes[i] * 1000)];
        });

        let runEndTimes = zippedTimes.map(arr => {
            return arr[0] + arr[1];
        })

        let runRanges = convRunStartDates.map((d, i) => {
            return [d, runEndTimes[i]];
        });

        const ISOConversion = runStartDates.map(date => {
            return moment(date).format('D MMM h:mm A');
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

    const setPostHeight = (target) => {
        const element = document.getElementById(target);
        const elementHeight = element.offsetHeight;
        const index = target.charAt(target.length - 1);
        const wrapper = document.getElementById(`postDiv${index}`);
        wrapper.style.height = (elementHeight + 35) + 'px';
    }; 

    const expandSongList = (target) => {
        const element = document.getElementById(target);
        const index = target.charAt(target.length - 1);
        element.classList.toggle('song-list-open');
        element.classList.toggle('song-list');
        let btn = document.getElementById(`list-button${index}`);
        btn.innerText = btn.innerText === 'Show all' ? 'Show less' : 'Show all';
        const wrapper = document.getElementById(`postDiv${index}`);
        const songWrapper = document.getElementById(`songWrapper${index}`);
        const songWrapperHeight = songWrapper.offsetHeight;
        console.log(songWrapperHeight + 'px');
        wrapper.classList.toggle(`post-info-open`);
        wrapper.classList.toggle(`post-info`);
        wrapper.style.height = (songWrapperHeight + 35) + 'px';
    };

    // window.onload = () => {
    //     changeClass();
    //   };
    //   const changeClass = () => {
    //     let width = window.innerWidth;
    //     if (width < 900){
    //       document.getElementById('content-wrapper').classList.add('columnless');
    //     }else if (width >= 901){
    //       document.getElementById('content-wrapper').classList.remove('columnless');
    //     }
    //   };
    
    //   window.addEventListener('resize', () => {
    //     changeClass();
    //   });

    const scrollTo = (target) => document.getElementById(target).scrollIntoView();
    return (
    <div className='post-content'>
        {stravaConvertedData && stravaConvertedData.map((item, i) => (        
        <div className='post-info-wrapper' id='content-wrapper' key={i}>
            <div className='post-info' id={`postDiv${i}`}>     
                <div className='post-stravaData'>
                    <div className='date-n-dot'>
                        <h3 id='run-date'>{runTimes[i]} </h3>{(item.workout_type && (item.workout_type === 2 || item.workout_type === 3)) &&
                        <img className={item.workout_type === 3 ? 'blue-dot' : 'green-dot'} src={item.workout_type === 3 ? blueDot : greenDot} alt='dot'></img>
                        }
                    </div>
                    <h3 id='run-name'>{item.name}</h3>
                    <h4 id='run-distance'><strong>Distance: </strong>{(item.distance * 0.000621371192).toFixed(2)} mi ({(item.distance/1000).toFixed(2)} km)</h4>
                    <h5 id='run-elapsed'><strong>Time Elapsed: </strong>{convMovingTimes[i]}</h5> 
                    {(runTrackObjs && runTrackObjs[i].length > 2) && <button className='btn' id='chartButton' type="button" data-bs-toggle="collapse" data-bs-target={`#chartCollapse${i}`} aria-expanded="false" aria-controls={`chartCollapse${i}`} onClick={() => {scrollTo(`postDiv${i}`)}}>
                        Song Timeline</button>}
                </div>
                {(runTrackObjs && runTrackObjs[i].length >= 1) ? 
                (<div className='song-list-wrapper' id={`songWrapper${i}`} onLoad={() => {setPostHeight(`songWrapper${i}`)}}><h3>Listened to: </h3><ul className="song-list" id={`songs${i}`}>{runTrackObjs[i].map((t, i) => (<li key={i}><img src={t.track.album.images[1].url} className='rounded' width="100" height="100" alt='Album Cover'></img><br></br><strong>{t.track.name}</strong> <br></br>({t.track.album.name})</li>))}</ul>
                {runTrackObjs[i].length > 6 && (<button className='btn song-button' id={`list-button${i}`} onClick={() => {expandSongList(`songs${i}`)}}>Show all</button>)}
                </div>) : 
                ((stravaConvertedData && !runTrackObjs) ?  'Please Login to Spotify to see song data' : <p>Song Data Unavailable (Spotify limited to last 50 songs)</p>)}
                <br></br>
            </div>
            <div className='collapse customCollapse' id={`chartCollapse${i}`}>
                <div className='card card-body customCard'>
                    {(runTrackObjs && runTrackObjs[i].length >= 1) && 
                    <RunChart 
                    runTracks={runTrackObjs[i]}
                    />    }
                </div>                
            </div>
        </div>
        ))
        }   
    </div>
  )
}
