import { useEffect, useState } from "react";

export const useStartAndEnd = () => {
    const [eventStart, setEventStart] = useState<Date>(new Date());
    const [eventEnd, setEventEnd] = useState<Date>(new Date());

    let date = window.localStorage.getItem("selectedDate");

    useEffect(() => {
        if(date) {
            console.log("??",date)
            /*
            let today = new Date();
            let minutes = Math.ceil(today.getMinutes()/10)*10;
            let [year, month, day] = [parseInt(date.substring(0,4)), parseInt(date.substring(5,7))-1, parseInt(date.substring(8,10))];
            let start = new Date(year, month, day, today.getHours(), minutes);
            let end = new Date(year, month, day, today.getHours() + 1, minutes);
            // add 1 hour to use ISO-string
            let startIso = new Date( start.getTime() + 60*60*1000);
            let endIso = new Date( end.getTime() + 60*60*1000);
            setEventStart(startIso.toISOString().substring(0,11) + start.toLocaleTimeString().substring(0,5));
            setEventEnd(endIso.toISOString().substring(0,11) + end.toLocaleTimeString().substring(0,5));
            */
        }
    },[])
    return {eventStart, setEventStart, eventEnd, setEventEnd};
}