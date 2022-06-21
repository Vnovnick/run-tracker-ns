import React, {useState} from 'react';
// import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import './CalendarComp.scss';
import moment from 'moment';
import blueDot from '../Calendar/blueDot.png';
import greenDot from '../Calendar/greenDot.png';


// workout_types: 3 = workout; 2 = longrun
export default function CalendarComp() {
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
      if(workoutRuns.find(run => run===moment(date).format("DD-MM-YYYY"))){
          return  'workout'; 
      }else if (longRuns.find(run => run===moment(date).format("DD-MM-YYYY"))){
          return 'longrun';
      }
    }
    const tileContentFunc = ({ date, view }) => {
      if(workoutRuns.find(run => run===moment(date).format("DD-MM-YYYY"))){
          return  (
            <img id='blue-dot' src={blueDot} width='5px' height='5px'></img>
          ); 
      }else if (longRuns.find(run => run===moment(date).format("DD-MM-YYYY"))){
          return (
            <img id='green-dot' src={greenDot} width='8px' height='8px'></img>
          );
      }} 

    const [value, onChange] = useState(new Date()); 
  
    return (
      <div>      
        <Calendar onChange={onChange} 
        value={value}            
        tileClassName={tileClassFunc}
        tileContent={tileContentFunc}
        />
      </div>
  )
}
