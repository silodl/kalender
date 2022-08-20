import { useState} from 'react';
import {Navbar} from '../Components/Navbar';
import '../css/App.css';
import '../css/Calendar.css';
import '../css/Week.css';
import {useWeek} from '../Custom Hooks/View calendar/GetWeek';
import { useWeekDays } from '../Custom Hooks/View calendar/WeekDays';

export const Week = () => {

    const today = new Date();
    const [day, setDay] = useState<Date>(new Date());
    const [updated, setUpdated] = useState(-1);
    const {weekNumbers, weekInterval, weekDates} = useWeek(day, "dayInWeek", updated, 7);
    const weekDays = useWeekDays();

    const handleSwipe = (props: {start: number, end: number}) => {
        if((props.start - props.end) > 200 ){
            // swipe to left
            getNextWeek()
        }
        if((props.end - props.start) > 200) {
            // swipe to right
            getPrevWeek()
        }
    }

    const getPrevWeek = () => {
        let prevWeek: Date;
        if(day.toLocaleDateString() !== today.toLocaleDateString()){
            prevWeek = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7); 
        }
        else {
           prevWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); 
        }
        setDay(prevWeek);
        if(updated === -1) {
            setUpdated(-2)
        }
        if(updated === -2) {
            setUpdated(-1)
        } 
    }
    
    const getNextWeek = () => {
        let nextWeek: Date;
        if(day.toLocaleDateString() !== today.toLocaleDateString()){
            nextWeek = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7)
        }
        else {
            nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
        }
        setDay(nextWeek);   
        if(updated === -1) {
            setUpdated(-2)
        }
        if(updated === -2) {
            setUpdated(-1)
        }   
    }

    const getCurrentWeek = () => {
        if(updated === -1) {
            setUpdated(-2)
        }
        if(updated === -2) {
            setUpdated(-1)
        } 
        setDay(today);
    }

    let touchStart: number = 0;
    return(
        <div className="base">
            <div className="pageTitle weekTitle"> 
                <span className="leftArrow" onClick={() => getPrevWeek()}>&larr;</span>
                <span onClick={() => getCurrentWeek()} style={{cursor: "pointer"}}  id="weekName"> Uke {weekNumbers[0]} ({weekInterval}) </span>
                <span className="rightArrow" onClick={() => getNextWeek()}>&#8594;</span>
            </div>
            
            <div className="week" onTouchStart={(e) => touchStart = e.touches[0].clientX} onTouchMove={(e) => handleSwipe({start:touchStart , end: e.touches[0].clientX})}>
                <div id="box2"> {/* weeknames row 1 mon - thu */} {weekDays.slice(0,4)}  </div>
                <div id="box4"> {/* dates */} {weekDates.slice(0,4)} </div>
                <div id="box2" className="weekLine2"> {/* weeknames row 2 fri - sun*/} {weekDays.slice(4,8)} </div>
                <div id="box4" className="weekLine2"> {/* dates */} {weekDates.slice(4,8)} 
                </div>
            </div>
            <Navbar/>
        </div>
    );
}