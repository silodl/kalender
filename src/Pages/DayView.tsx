import '../css/App.css';
import '../css/Calendar.css';
import '../css/DayView.css';
import {Navbar} from '../Components/Navbar';
import {ClockView} from '../Components/ClockView';
import { useState, useEffect } from 'react';
import { monthNames } from '../Objects/MonthNames';
import { weekDayNames } from '../Objects/WeekDayNames';

export const DayView = () => {
  let selectedDay = window.localStorage.getItem("goToDate");
  if(selectedDay === null){
    selectedDay = "";
  }
  let [year, month, sDay] = [parseInt(selectedDay.substring(0,4)), parseInt(selectedDay.substring(5,7)) -1, parseInt(selectedDay.substring(8,10))];
  let selDay = new Date(year, month, sDay);
  const today = new Date();
  if(selDay.toDateString() === today.toDateString()){
    selDay = today;
  }
  const [day, setDay] = useState<Date>(selDay);
  const [dayName, setDayName] = useState<string>("");
  const todo: HTMLElement[] = [];

  useEffect(() => {
    if(day.toDateString() === today.toDateString()){
      setDayName("I dag");
    }
    else {
      setDayName(weekDayNames[day.getDay()] + " " + day.getDate() + " " + monthNames[day.getMonth()].toLowerCase());
    }
  }, [day, today.toLocaleDateString()]);

  const handleSwipe = (props: {start: number, end: number}) => {
    if((props.start - props.end) > 200 ){
      // swipe to left
      getNextDay()
    }
    if((props.end - props.start) > 200) {
      // swipe to right
      getPrevDay()
    }
}

  const getPrevDay = () => {
    let prevDay: Date;
    if(day.toLocaleDateString() !== today.toLocaleDateString()){
      prevDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1); 
    }
    else {
      prevDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1); 
    }
    setDay(prevDay);
  } 

  const getNextDay = () => {
    let nextDay: Date;
    if(day.toLocaleDateString() !== today.toLocaleDateString()){
      nextDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    }
    else {
      nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    }
    setDay(nextDay);       
  }

  useEffect(() => {
    let dayView = document.getElementById("dayView");
    if(todo.length === 0 && dayView){
      dayView.className += " biggerDayView";
    }
    else if(todo.length > 0 && dayView) {
      dayView.className = "dayViewTask ";
    }
  },[todo.length])

  let touchStart: number = 0;

  return (
      <div className="base">
        <div className="pageTitle">
          <span className="leftArrow" onClick={() => getPrevDay()}>&larr;</span>
          <span onClick={() => setDay(today)} style={{cursor: "pointer"}}> {dayName} </span>
          <span className="rightArrow" onClick={() => getNextDay()}>&#8594;</span>
        </div>

        <div onTouchStart={(e) => touchStart = e.touches[0].clientX} onTouchMove={(e) => handleSwipe({start:touchStart , end: e.touches[0].clientX})}>
        <ClockView day={day}/>

        <div className="dayViewTask" id="dayViewTask">
          <div className="title"> Oppgaver </div>
          {todo.length === 0? 
          <div>
            <div className="noTasks"> Ingen oppgaver igjen! </div>
          </div>
          :<div className="todo_today"> {todo} </div>
          }
        </div>
        </div>

        <Navbar/>
      </div>
  );
}