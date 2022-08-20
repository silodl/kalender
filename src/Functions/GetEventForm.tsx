import { EventForm } from "../Components/EventForm"

export const GetEventForm = (date: string) => {
    // date: yyyy-mm-dd
    //window.localStorage.setItem("selectedDate", date);
    //window.location.href = "/nyttEvent";
    let selectedDate = new Date(date);
    console.log(selectedDate)
    console.log(window.Date)
}