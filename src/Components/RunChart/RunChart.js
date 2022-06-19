import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, 
    ResponsiveContainer,
    Legend, 
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid } from 'recharts';

function CustomXAxisTick (props){

    return(
    <g transform={`translate(${props.x},${props.y})`}>
      <image xlinkHref={props.payload.value} x={-25} y={0} height="50px" width="50px" Anchor="middle" />
    </g>
  )
};

function CustomTooltip (props){
  if (props.active && props.payload && props.payload.length){
    return(
      <div className='custom-tooltip'>
        <p className='label'>{`${props.payload[0].payload.name}`}</p>
        <p className='tooltip-time'>{`${moment(props.payload[0].payload.playTime).format('h:mm:ss a')}`}</p>
      </div>
    )
  }
  return null;

}; 



export default function RunChart(props) {
    console.log(props.runTracks);
    const playTimes = props.runTracks.map(t => {
        return new Date(t.played_at).getTime();
        
    });

    const chartData = props.runTracks.map((t, i) => {
        return {name: t.track.name, url: t.track.album.images[1].url, playTime: playTimes[i]}
    })


     
    console.log(chartData);

  return (
    <div className='chart-dropdown'>
 
        <LineChart width={950} height={180} data={chartData} margin={{
        
        right: 50,
        left: 50,
        bottom: 30,
        }}>
            <Line type="monotone" dataKey="playTime" stroke="#0AA411" />
            {/* <CartesianGrid strokeDasharray="5 5" /> */}
            <XAxis dataKey="url" interval={0} reversed={true} tick={<CustomXAxisTick />} />
            {/* <YAxis/> */}
            <Tooltip content={<CustomTooltip />} />            
                           

        </LineChart>


    </div>

  )
}
