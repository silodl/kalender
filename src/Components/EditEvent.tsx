import { useState, useEffect } from "react";
import { useLoggedInUser } from "../Custom Hooks/UseLoggedInUser";
import { Colors } from '../Objects/Colors';
import { UpdateEvent } from "../Functions/UpdateEvent";
import { EventInfo } from "../Custom Hooks/UseEvents";
import { DeleteEvent } from "../Functions/DeleteEvent";

import { EventForm } from "./EventForm";

export const EditEvent = (props: {event: EventInfo, hideForm: Function})=> {

    const user = useLoggedInUser();
    const [viewDelete, setViewDelete] = useState<boolean>();
    const [title, setTitle] = useState<string>(props.event.title);
    const [color, setColor] = useState<string>(props.event.color);
    const [about, setAbout] = useState<string>(props.event.about);
    const [allDay, setAllDay] = useState<boolean>(props.event.allDay);
    const [endDate, setEndDate] = useState<Date>(props.event.endDate);
    const [startDate, setStartDate] = useState<Date>(props.event.startDate);
    const [colorOptions, setColorOptions] = useState<JSX.Element[]>([]);
    const [viewColorOptions, setViewColorOptions] = useState<boolean>(false);

    useEffect(() => {
        setColorOptions([]);
        Object.entries(Colors).forEach(([name, code]) => {
          setColorOptions(old => [...old,<div className="colorOption" onClick={() => setColor(code)} style={{backgroundColor: code}}/>]);
        })
      },[])

    const HideDelete = () => {
        setViewDelete(false);
    }
    
    return(
        <div>
            <div className="editEvent">
                <div className="pageTitle"> 
                    <a className="quitButton" href="/idag" > Avbryt </a>
                    <span> Endre hendelse </span>
                </div>
                <EventForm event={props.event}/>

                <div className="editEventButtons">
                    <div className="deleteButton editButton" onClick={() => setViewDelete(true)}> Slett </div>  
                    <div className="button editButton" onClick={() => UpdateEvent(user, props.event.id, about, allDay, endDate, color, startDate, title, props.hideForm)}> Lagre </div>   
                </div>
            </div>

            {viewDelete
                ? <div className="deleteAlertBackground">
                    <div className="deleteAlert"> 
                    <div>Er du sikker på at du vil slette "{props.event.title}" </div> 
                    <div className="alignDeleteAlertButtons">
                        <div className="secondButton" onClick={() => setViewDelete(false)}> Avbryt</div>
                        <div className="deleteButton" onClick={() => DeleteEvent(user, props.event.id, props.hideForm, HideDelete)}> Slett </div>
                    </div>
                    </div>
                </div>
                : null} 

            
            
        </div>
    )
}