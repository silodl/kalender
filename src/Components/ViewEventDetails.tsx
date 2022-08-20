import { EventInfo } from '../Custom Hooks/UseEvents';
import { weekDayNames } from '../Objects/WeekDayNames';
import { monthNames } from '../Objects/MonthNames';
import { useState } from 'react';
import { EditEvent } from './EditEvent';

export const ViewEvent = (event: EventInfo): JSX.Element => {  
    const [viewEdit, setViewEdit] = useState<boolean>(false);

    let dateString: JSX.Element[] = [];
    let startDate = new Date(event.startDate);
    let endDate = new Date(event.endDate);
    if(startDate.getDate() === endDate.getDate()){
        dateString.push(<div> {weekDayNames[startDate.getDay()] + " " + startDate.getDate() + ". " + monthNames[startDate.getMonth()]} </div>);
        dateString.push(<div> {startDate.toLocaleTimeString().substring(0,5) + " - " + endDate.toLocaleTimeString().substring(0,5)} </div>)
    }

    const HideForm = () =>  {
        setViewEdit(false);
    }

    // blank skjerm betyr sannsynligvis at en av divene ikke har string som "innhold"

    return (
        <div>
            {viewEdit 
            ? <EditEvent event={event} hideForm={HideForm}/>
            :
            <div className="eventInfo">
                <div id="nameAndColor"> <div className="eventDot" style={{backgroundColor: event.color}}/> <div id="eventName">{event.title}</div> </div>
                <div> {dateString} </div>
                <div> {event.about} </div>
                <div style={{fontStyle:"italic", color: event.color}}> {event.category.name} </div>
                <div id="editButton" onClick={() => setViewEdit(true)}> Rediger </div>
            </div>
            }
        </div>
    );  
}