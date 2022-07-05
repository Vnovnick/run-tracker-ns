import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, 
    Tooltip,
    Line,
    XAxis,
    CartesianGrid } from 'recharts'; 
 
const tickStyles = {
  height: "65px",
  width: "65px",
}
function CustomXAxisTick (props){
    return(
    <g transform={`translate(${props.x},${props.y})`}>
      <image xlinkHref={props.payload.value} x={-32} y={0} style={tickStyles} anchor="middle" />
    </g>
  )
};

const tooltipStyles = {backgroundColor: '#FFFDEF', border: '0.1px solid #D5FFD7', textAlign: 'left', padding: '5px'};

function CustomTooltip (props){
  if (props.active && props.payload && props.payload.length){
    return(
      <div className='custom-tooltip rounded' style={tooltipStyles}>
        <p className='label'><strong>{`${props.payload[0].payload.name}`}</strong></p>
        <p className='tooltip-time'>{`${moment(props.payload[0].payload.playTime).format('h:mm:ss a')}`}</p>
      </div>
    )
  }
  return null;
}; 

export default function RunChart(props) {
    // console.log(props.runTracks);
    const playTimes = props.runTracks.map(t => {
        return new Date(t.played_at).getTime();        
    });
    const chartData = props.runTracks.map((t, i) => {
        return {name: t.track.name, url: t.track.album.images[1].url, playTime: playTimes[i]}
    })

  return (
    <div className='chart-dropdown'>
        <LineChart width={950} height={180} data={chartData} margin={{        
        right: 50,
        left: 50,
        bottom: 50,
        }}>
            <Line type="monotone" dataKey="playTime" stroke="#0AA411" />
            {<CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="url" interval={0} reversed={true} tick={<CustomXAxisTick />} />
            <Tooltip content={<CustomTooltip/>} />        
        </LineChart>
    </div>
  )
}
