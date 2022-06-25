import React, {useEffect, useState} from 'react';
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
            <img id='blue-dot' src={blueDot} width='5px' height='5px' alt='dot'></img>
          ); 
      }else if (longRuns.find(run => run===moment(date).format("DD-MM-YYYY"))){
          return (
            <img id='green-dot' src={greenDot} width='8px' height='8px' alt='dot'></img>
          );
      }} 


    const [clickedDay, setClickedDay] = useState('');
    const scrollTo = (target) => document.getElementById(`postDiv${target}`).scrollIntoView();

    useEffect(() => {
      console.log(clickedDay);
      let runTimes = JSON.parse(window.localStorage.getItem('runTimes')); 
      let index = runTimes.findIndex(run => (run.slice(0, 5) === clickedDay || run.slice(0,6) === clickedDay));
      console.log(index);  
      if (index !== -1){
        scrollTo(index);
      }     
    });

    // const dayClick = (value, event) => window.localStorage.setItem('selectedDay', value);
    const [value, onChange] = useState(new Date()); 
    return (
      <div>      
        <Calendar onChange={onChange} 
        value={value}            
        tileClassName={tileClassFunc}
        tileContent={tileContentFunc}
        onClickDay={(value) => {setClickedDay(moment(value).format('D MMM'))}}
        />
      </div>
  )
}
