import { useEffect, useState } from "react";
import { EventInfo, useEvents } from '../Custom Hooks/UseEvents';
import { ViewEvent } from "./ViewEventDetails";

export const ClockView = (props:{day:Date}) => {
    const today = new Date();
    const events = useEvents();
    const [eventElements, setEventElements] = useState<JSX.Element[]>([]);
    const [viewEventDetails, setViewEventDetails] = useState<boolean>(false);
    const [viewEvent, setViewEvent] = useState<EventInfo>();

    useEffect(() => {
        let id: string;
        let scroll_id: string
        if(props.day.toDateString() === today.toDateString()){
            id = "clock_row" + today.getHours();
            scroll_id = "clock_row" + (today.getHours() - 1);
            let element = document.getElementById(id);
            if(element) {
                element.style.backgroundColor = "#95B3D752";  
            }
        }
        else {
            id = "clock_row" + today.getHours();
            let element = document.getElementById(id);
            if(element) {
                element.style.backgroundColor = "";  
            }
            scroll_id = "clock_row8"
        }
        document.getElementById(scroll_id)?.scrollIntoView();
    },[today.getHours(), props.day])


    useEffect(() => {
        setEventElements([]);
        let listOfEvents: EventInfo[] = [];
        events.forEach( event => {
            let startDate = new Date(event.startDate);
            if(startDate.toLocaleDateString() === props.day.toLocaleDateString()){
                if(!listOfEvents.includes(event)){
                    listOfEvents.push(event);
                }
            }
        });  
        listOfEvents.forEach(event => {
            if(!event.allDay){
                if(event.startDate.toLocaleDateString() === event.endDate.toLocaleDateString()){
                    let duration = event.endDate.getHours() - event.startDate.getHours() + (event.endDate.getMinutes() - event.startDate.getMinutes()) / 60;
                    let start = event.startDate.getHours() + event.startDate.getMinutes() / 60;
                    // one row/ hour is 41px (height 40px and 1px border), 0.00 = -event height
                    let index = listOfEvents.indexOf(event);
                    let marginBottom = -(41 * duration) -(start * 41);
                    let element = <div className="dayEvent" id={`event ${index}`} style={{bottom: `${marginBottom}px`, height:`${40 * duration}px`, backgroundColor:event.color + "59", borderColor: event.color}}> {event.title}</div>
                    setEventElements(old => [...old, <div className="eventWrapper" onClick={() => (setViewEventDetails(true), setViewEvent(event))}> {element} </div>])
                }
            }
        })
    },[events, props.day.getDate()])
    

    const handleClick = (e: any) => {
        if(e.target.id === "eventInfoBackground"){
            setViewEventDetails(false);
        }
        if(e.target.className === "weekEvent"){
            setViewEventDetails(true);
        }
    }

    const hours: number[] = Array.from(Array(24).keys());

    return (
        <div className="dayView" id="dayView">
            {eventElements}
            {hours.map((value, index) => {
                return <div className="clock_row" id={"clock_row" + index}> <span className="clockLabel">{index}:00 </span> </div>
            })}
            {viewEventDetails && viewEvent
            ? <div> <div id="eventInfoBackground" className="eventInfoBackground" onClick={(e) => handleClick(e)}> <div className="eventInfoFrame"> <ViewEvent {...viewEvent}/> </div> </div></div> 
            : null}
        </div>
    )
};