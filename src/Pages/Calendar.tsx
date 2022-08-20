import {useState} from 'react';
import {Navbar} from '../Components/Navbar';
import '../css/App.css';
import {useMonthView} from '../Custom Hooks/View calendar/GetMonth';
import { useWeekDays } from '../Custom Hooks/View calendar/WeekDays';

export const Calendar = () => {

    const [month, setMonth] = useState<any>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const weekDays = useWeekDays();
    const {monthName, weeknr, weekDates} = useMonthView(new Date(year,month,1));


    const handleSwipe = (props: {start: number, end: number}) => {
        if((props.start - props.end) > 200 ){
            // swipe to left
            getNextMonth()
        }
        if((props.end - props.start) > 200) {
            // swipe to right
            getPrevMonth()
        }
    }

    const getPrevMonth = () => {
        if(month === 0){
            setMonth(11);
            setYear(year - 1);
        }
        else {
           setMonth(month - 1); 
        }
    }
    
    const getNextMonth = () => {
        if(month === 11){
            setMonth(0);
            setYear(year + 1);
        }
        else {
           setMonth(month + 1); 
        }
    }

    const getCurrentMonth = () => {
        const today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
    }

    let touchStart: number = 0;
    return(
        <div className="base">
            
            <div className="pageTitle"> 
                <span className="leftArrow" onClick={() => getPrevMonth()}>&larr;</span>
                <span style={{cursor: "pointer"}} onClick={getCurrentMonth}>{monthName}</span>
                <span className="rightArrow" onClick={() => getNextMonth()}>&#8594;</span>
            </div>

            <div className="calendar" onTouchStart={(e) => touchStart = e.touches[0].clientX} onTouchMove={(e) => handleSwipe({start:touchStart , end: e.touches[0].clientX})}>
                <div className="alignCalendar">
                    <div id="col1">
                        <div id="box1"> {/* empty field */} </div>
                        <div id="box3"> {/* weeknumbers */} {weeknr} </div>
                    </div>

                    <div id="col2">
                        <div id="box2"> {/* weeknames */} {weekDays}  </div>
                        <div id="box4"> {/* weekDates with events*/} {weekDates} </div>
                    </div>
                </div>  

            </div>
            <Navbar/>
        </div>
    );
}