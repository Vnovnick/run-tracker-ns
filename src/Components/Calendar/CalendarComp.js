import React, {useState} from 'react';
// import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import './CalendarComp.scss';
import moment from 'moment';

const stravaStorageData = localStorage.getItem('runData');
const stravaConvertedData = JSON.parse(stravaStorageData);

const workoutRuns = stravaConvertedData.map(run => {
  if (run.workout_type === 3){
    return moment(run.start_date).format("DD-MM-YYYY");
  }
  return null;
})
const longRuns = stravaConvertedData.map(run => {
  if (run.workout_type === 2){
    return moment(run.start_date).format("DD-MM-YYYY");
  }
  return null;
})


const tileClassFunc = ({ date, view }) => {
  if(workoutRuns.find(x=>x===moment(date).format("DD-MM-YYYY"))){
      return  'workout'; 
  }else if (longRuns.find(x=>x===moment(date).format("DD-MM-YYYY"))){
      return 'longrun';
  }
}

// workout_types: 3 = workout; 2 = longrun
export default function CalendarComp() {
    const [value, onChange] = useState(new Date());
  
  
    return (
    <div>
        <Calendar onChange={onChange} 
        value={value}
        tileClassName={tileClassFunc}
       />
    </div>
  )
}
