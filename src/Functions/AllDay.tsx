export const AllDay = (props: {startClock: string, endClock: string}) => {
    let checkbox = document.getElementById("allDayCheckbox") as HTMLInputElement;
    let allDay = checkbox.checked;
    let eventStartField = document.getElementById("eventStart") as HTMLInputElement;
    let eventEndField = document.getElementById("eventEnd") as HTMLInputElement;

    let start, end = "";
    if(allDay){
        start = eventStartField.value.substring(0,10);
        end = eventEndField.value.substring(0,10);
        eventStartField.type = "date";
        eventEndField.type = "date";
    }
    else {
        start = eventStartField.value + "T" + props.startClock;
        end = eventEndField.value + "T" + props.endClock;
        eventStartField.type = "datetime-local";
        eventEndField.type = "datetime-local";    
    }

    return {allDay, start, end}
}