import { useState } from 'react';
import { GetDayView } from '../Functions/GetDayView';

import { useEvents, EventInfo } from '../Custom Hooks/UseEvents';
import {ViewEvent} from '../Components/ViewEventDetails';

export const DayComponent = (props: {date: Date, selectedDate: string, view: string, other: string}) => {
    const {date, selectedDate, view, other} = props;
    const events = useEvents();
    const [viewEventDetails, setViewEventDetails] = useState<boolean>(false);
    const [event, setEvent] = useState<EventInfo[]>([]);

    let listOfEvents: EventInfo[] = [];
    events.forEach( event => {
        if(event.startDate.toLocaleDateString() === date.toLocaleDateString()){
            if(!listOfEvents.includes(event)){
                listOfEvents.push(event);
            }
        }
    }); 
    
    const handlePress = (e: any, selectedDate: string, start: number, end: number, move: boolean, id: string) => {
        // avoid click if it is a swipe
        if(!move && e.target.className !== "weekEvent"){
            if((end - start) > 200){
                // long click
                console.log("long click")
                //GetEventForm(selectedDate);
                let dateList = id.split(".")
                let test = new Date(parseInt(dateList[2]), parseInt(dateList[1]) - 1, parseInt(dateList[0]));
                console.log(test, id)
                localStorage.setItem("selectedDate", test.getTime().toString())
                window.location.href = "/nyttEvent";
               
            } 
            if((end - start) > 100 && (end - start) <= 200) {
                // normal click
                GetDayView(selectedDate);
            }  
        }  
    }

    const handleClick = (e:any, event: EventInfo) => {
        if(e.target.id === "eventInfoBackground"){
            setViewEventDetails(false);
            setEvent([]);
        }
        if(e.target.className === "weekEvent"){
            setViewEventDetails(true);
            setEvent([event]);
        }
    }


    let start: number;
    let moved: boolean;
    let todayWeek = "";
    let todayMonth = "";
    let eventElements: JSX.Element[] = [];
    if(view === "dayInMonth"){
        listOfEvents.forEach(event => {
            eventElements.push(<div className="eventDot" style={{backgroundColor:event.color}}/>)
        })
        if(other === "today"){
            todayMonth = "today";
        }
    }
    if(view === "dayInWeek"){
        listOfEvents.forEach( event => {
            eventElements.push(<div className="weekEvent" onClick={(e) => handleClick(e, event)} style={{backgroundColor:event.color + "59", borderColor: event.color}}> {event.title} <span className="eventTime">{event.startDate.getHours().toString()}:{event.startDate.getMinutes().toString()}</span> </div>)
        })
        if(other === "today"){
            todayWeek = "today"
        }
    }
    
    return (
        <div id={date.toLocaleDateString()} onTouchStart={() => (start = new Date().getTime())} onTouchMove={() => moved = true} onTouchEnd={(e) => (handlePress(e,selectedDate, start, new Date().getTime(), moved, date.toLocaleDateString()))} className={`${view} ${todayWeek}`}>
            <div>
                <div className={todayMonth}>{date.getDate()} </div>
                <div className="alignEvents">{eventElements}</div>
            </div>
            {viewEventDetails
            ?  /*<div> <div id="eventInfoBackground" className="eventInfoBackground" onClick={(e) => handleClick(e,event[0])}> <div className="eventInfoFrame"> <ViewEvent {...event[0]}/> </div> </div></div>*/
            <div> <div id="eventInfoBackground" className="eventInfoBackground" onClick={(e) => handleClick(e,event[0])}> <div className="eventInfoFrame"> <ViewEvent {...event[0]}/> </div> </div> </div>
            : null}
        </div>
    );
}