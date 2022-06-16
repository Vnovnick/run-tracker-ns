import React from 'react';
import { LineChart, 
    ResponsiveContainer,
    Legend, 
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid } from 'recharts';

export default function RunChart(props) {

    const playTimes = props.runTracks.map(t => {
        return new Date(t.played_at).getTime();
    });

    const chartData = props.runTracks.map((t, i) => {
        return {name: t.track.name, playTime: playTimes[i]}
    })
    console.log(chartData);

  return (
    <div>


            <h1 className='chart-heading'>
                Run Chart
            </h1><ResponsiveContainer>
            <LineChart width={500} height={300} data={chartData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="playTime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="playTime" stroke="#8884d8" />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>

    </div>

  )
}
