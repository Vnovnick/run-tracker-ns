import React from 'react';
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
      <image xlinkHref={props.payload.value} x={0} y={0} height="50px" width="50px" Anchor="middle" />
    </g>
  )
}

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
        <h1 className='chart-heading'>
            Run Chart
        </h1>
 
        <LineChart width={950} height={450} data={chartData} margin={{
        
        right: 70,
        left: 20,
        bottom: 5,
        }}>
            <Line type="monotone" dataKey="playTime" stroke="#8884d8" />
            {/* <CartesianGrid strokeDasharray="5 5" /> */}
            <XAxis dataKey="url" interval={0} tick={<CustomXAxisTick/>}/>
            <YAxis/>
            <Tooltip />
            <Legend />                
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>


    </div>

  )
}
