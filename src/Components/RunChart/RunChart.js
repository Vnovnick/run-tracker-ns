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
    const chartData = [
    
    ]
  return (
    <>
        <h1 className='chart-heading'>
            Run Chart
        </h1>
        <ResponsiveContainer>
            <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    </>
  )
}
