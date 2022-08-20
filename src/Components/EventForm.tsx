import {useState, useEffect} from 'react';
import { AllDay } from '../Functions/AllDay';
import { AddEvent } from '../Functions/AddEvent';
import { useCategories } from '../Custom Hooks/UseCategories';
import { Colors } from '../Objects/Colors';
import { Category } from './CategoryComponent';
import '../css/EventForm.css';
import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import { RepetitionOptions, AlertOptions } from '../Objects/EventChoices';
import { EventInfo } from '../Custom Hooks/UseEvents';


interface EventFormProps {
    event?: EventInfo,
}

export const EventForm = (event: EventFormProps) => {

    // YYYY-MM-DDThh:mm
    let todayTime = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000;
    let selectedDate = window.localStorage.getItem("selectedDate");
    let date = new Date();
    let date2 = new Date();
    if(selectedDate) {
        // add one extra hour because of ISO-string
        date = new Date(parseInt(selectedDate) + todayTime + 60 * 60 * 1000);
        date2 = new Date(parseInt(selectedDate) + todayTime + 2 * 60 * 60 * 1000);
    }
    if(event.event?.startDate){
        // add one extra hour because of ISO-string
        date = new Date(event.event.startDate.getTime() + 60 * 60 * 1000)
        date2 = new Date(event.event.endDate.getTime() + 60 * 60 * 1000)
    }

    const [eventStart, setEventStart] = useState<Date>(date);
    const [eventEnd, setEventEnd] = useState<Date>(date2);
    const [start, setStart] = useState<string>(eventStart.toISOString().substring(0,16));
    const [end, setEnd] = useState<string>(eventEnd.toISOString().substring(0,16));
    const [title, setTitle] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [allDay, setAllDay] = useState<boolean>(false);
    const [timeError, setTimeError] = useState<string>();

    const [colorButtonsStandard, setColorButtonsStandard] = useState<JSX.Element[]>([]);
    const [colorButtons, setColorButtons] = useState<JSX.Element[]>([]);
    const [colorButtonsDisabled, setColorButtonsDisabled] = useState<JSX.Element[]>([]);
    const [colorButtonsDisabledStandard, setColorButtonsDisabledStandard] = useState<JSX.Element[]>([]);
    
    const [category, setCategory] = useState<Category| null>(null);
    const [titleError, setTitleError] = useState<string>("");
    const [categories, setCategories] = useState<JSX.Element[]>([]);
    const user = useLoggedInUser();

    const categoriesInfo = useCategories();

    // change event-end-filed to match start-field
    useEffect(() => {
        
        let start = new Date(eventStart);
        let end = new Date(eventEnd);
        
        // avoid start to be before end
        if(start.getTime() >= end.getTime()){
            let newEnd = new Date(start.getTime() + 60*60*1000);
            // add 1 extra hour to use ISO-string
            let newEndIso = new Date(start.getTime() + 60*60*1000 * 2)
            //setEventEnd(newEndIso.toISOString().substring(0,11) + newEnd.toLocaleTimeString().substring(0,5))
        }  
        
    },[eventStart])

     // set error if event end is before start
     useEffect(() => {
         /*
        let start = new Date(eventStart);
        let end = new Date(eventEnd);
        
        // avoid start to be before end
        if(start.getTime() > end.getTime()){
            setTimeError("Sluttidspunktet er før start")
        }  
        else {
            setTimeError("");
        }
        */
    },[eventEnd])

    // event categories
    useEffect(() => {
        setCategories([<option value="null"> Ingen kategori </option>]);
        categoriesInfo.forEach(({name, color, view, id}) => {
            if(event.event?.category.name === name && event.event.category){
                ChangeCategory(event.event.category.name);
                setCategories(old => [...old, <option selected value={name}> {name} &nbsp; </option>]);
            }
            else {
                setCategories(old => [...old, <option value={name}> {name} &nbsp; </option>]);  
            }
        })
    },[categoriesInfo])

    // event color options
    useEffect(() => {
        setColorButtons([]);
        setColorButtonsStandard([]);
        setColorButtonsDisabledStandard([]);
        let firstColor = Object.keys(Colors)[1];
        if(event.event?.color && event.event.color){
            firstColor = event.event.color;
        }
        Object.entries(Colors).map(([name, code]) => {
            if(code === firstColor){
                setColor(code);
                setColorButtons( arr => [...arr, <div id={code} className="eventColor activeColor" style={{backgroundColor: code}} onClick={() => setColor(code)}/>]);            }
            else {
                setColorButtons( arr => [...arr, <div id={code} className="eventColor" style={{backgroundColor: code}} onClick={() => setColor(code)}/>]);
            }
            setColorButtonsStandard(arr => [...arr, <div id={code} className="eventColor" style={{backgroundColor: code}} onClick={() => setColor(code)}/>]);
            setColorButtonsDisabledStandard( arr => [...arr, <div id={code} className="eventColor" style={{backgroundColor: code}}/>]);
        })
    },[])

    const SetAllDay = () => {
        setAllDay(!allDay)
        let eventStartField = document.getElementById("eventStart") as HTMLInputElement;
        let eventEndField = document.getElementById("eventEnd") as HTMLInputElement;
    
        if(eventStartField.type === "datetime-local") {
            eventStartField.type = "date";
            eventStartField.value = start.substring(0,10);
            eventEndField.type = "date";
            eventEndField.value = end.substring(0,10);
        }
        else {
            eventStartField.type = "datetime-local";
            eventStartField.value = start.toString();
            eventEndField.type = "datetime-local";
            eventEndField.value = end.toString();
        }
    }  

    const ChangeCategory = (value: string) => {
        let colorCode = "";
        if(value === "null"){
            setCategory(null)
            setColor(Colors.green)
        }
        else {
            categoriesInfo.forEach(category => {
                if(category.name === value){
                    let info: Category = {name: category.name, color: category.color, view: category.view, id: category.id};
                    setCategory(info);
                    setColor(category.color);
                    colorCode = category.color;
                }   
            }) 
        }
        let updateDisabled: JSX.Element[] = [...colorButtonsDisabledStandard];
        updateDisabled.forEach(element => {
            if(element.props.id === colorCode){
                let index = updateDisabled.indexOf(element);
                updateDisabled[index] = <div id={colorCode} className="eventColor activeColor" style={{backgroundColor: colorCode}}/>
            }
        })
        setColorButtonsDisabled(updateDisabled);
    }

    useEffect(() => {
        let code = color;
        let updateColor: JSX.Element[] = [...colorButtonsStandard];
        updateColor.forEach(element => {
            if(element.props.id === code) {
                let index = updateColor.indexOf(element);
                updateColor[index] = <div id={code} className="eventColor activeColor" style={{backgroundColor: code}}/>;
            }
        })
        setColorButtons(updateColor)
    },[color, colorButtonsStandard])

    const ValidateForm = () => {
        if(title){
            AddEvent(title, allDay, about, color, eventStart, eventEnd, category, user)
        }
        else {
            setTitleError("Vennligst fyll inn dette feltet");
            document.getElementById("title")?.focus();
        }
    } 


    useEffect(() => {
        setEventEnd(new Date(eventStart.getTime() + 60 * 60 * 1000))
        setEnd(new Date(eventStart.getTime() + 2* 60 * 60 * 1000).toISOString().substring(0,16))
        console.log("start", start, "end", end)
    }, [end, start])


    return(
         
        <form className="eventFormFields">
            {/* Event title */}
            <div className="formRow field">
            <div> Tittel * </div>
            <input className="inputField textInput"
            id="title"
            placeholder="Din tittel"
            type="text"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={event.event?.title}
            /> </div>
            {titleError? 
            <div className="errorMessage"> {titleError} </div>
            : null}                

            {/* All day button */}
            <div className="allDay">
                <span style={{marginRight:"10px"}}>Hele dagen</span>
                <label className="switch">  
                    <input id="allDayCheckbox"type="checkbox" onClick={() => SetAllDay()}/> 
                    <span className="slider"></span>
                </label>
            </div>

            {/* Date/ clock for event */}
                {/* start date */}
                <div className="colL time field formRow">
                    <div> Fra </div>
                    <input className="inputField eventDate"
                    name= "EventStart"
                    id="eventStart"
                    type="datetime-local"
                    defaultValue={start}
                    onChange={(e) => (setEventStart(new Date(e.target.value)),
                                    setStart(new Date(new Date(e.target.value).getTime() + 60 * 60 * 1000).toISOString().substring(0,16)),
                                    setEventEnd(new Date(new Date(e.target.value).getTime() + 60 * 60 * 1000)),
                                    setEnd(new Date(new Date(e.target.value).getTime() + 2* 60 * 60 * 1000).toISOString().substring(0,16))
                    )}
                    />
                </div>
                
                {/* end date */}
                <div className="colR time field formRow">
                    <div> Til </div>
                    <span id="timeError"> {timeError} </span>
                    <input className="inputField eventDate"
                    name= "EventEnd"
                    id="eventEnd"
                    defaultValue={end}
                    type="datetime-local"
                    onChange={(e) => (setEventEnd(new Date(e.target.value)), setEnd(new Date(new Date(e.target.value).getTime() + 60 * 60 * 1000).toISOString().substring(0,16)))}
                    />
                </div>

            {/* Event category */}
            <div className="formRow field">
            <div> Kategori </div>       
            <select className="inputField selectField" 
            onChange={(e) => ChangeCategory(e.target.value)}>
                {categories}  
            </select>
            </div>
    
            {/* Event colors */} 
            {(category !== null) 
            ? <div className="formRow colors colorsDisabled" > 
                {colorButtonsDisabled}
                </div>
            :
            <div className="formRow colors"> 
                {colorButtons}
            </div>
        }

            {/* Repetition */}    
            <div className="formRow field">
            <div> Gjenta </div>       
            <select defaultValue="Aldri" className="inputField selectField">
                {RepetitionOptions.map((option) => (
                    <option value={option.value}> {option.label} &nbsp; </option> 
                ))}    
            </select>
            </div>

            {/* Push alert */}    
            <div className="formRow field">
            <div> Varsel </div>  
            <select defaultValue="Aldri" className="inputField selectField">
                {AlertOptions.map((option) => (
                    <option value={option.value}> {option.label} &nbsp; </option> 
                ))}    
            </select>
            </div>
            
            {/* Event notes */}
            <div className="formRow field">
            <div> Notater </div>
            <input className="inputField textInput"
                placeholder="F.eks. sted" 
                onChange={(e) => setAbout(e.target.value.trim())}
            />  </div>
            
            <div className="alignSubmitButton">
                {event.event?.id 
                ? <div className="emptyButtons"/>                
                : <div className="button" onClick={() => ValidateForm()}> Lagre </div>}
            </div> 
        </form>
    );
}

export const NewEvent = () => {
    return(
        <div className="eventForm base">
            <div className="pageTitle"> 
                <a className="quitButton" href="/kalender" > Avbryt </a>
                <span> Ny hendelse </span>
            </div>
            <EventForm/>
        </div>
    );
}