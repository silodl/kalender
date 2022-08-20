import { useState, useEffect } from 'react';

import { monthNames } from '../../Objects/MonthNames';
import { monthNamesShort } from '../../Objects/MonthNames';
import { DayComponent } from '../../Components/DayComponent';

export const useWeek = (day: Date, view: string, month: number, days: number) => {
    // view defines if the elements is shown in week or month view
    const [weekDates, setWeekDates] = useState<JSX.Element[]>([]);
    const [weekNumbers, setWeekNumbers] = useState<number[]>([]);
    const [weekInterval, setWeekInterval] = useState<string>("");

    useEffect(() => {
        if(day !== null){
            const today = new Date();
            setWeekDates([]);

            // get this week's week number
            let firstOfJan: Date = new Date(day.getFullYear(),0,1);
            let numberOfDays: number = Math.floor((day.getTime() - firstOfJan.getTime()) / (24 * 60 * 60 * 1000));
            let todayWeekday = day.getDay();
            if(todayWeekday === 0){
                todayWeekday = 7;
            }

            let weekNrArray :number[] = [];
            for(let i = 0; i < days / 7; i++){
                let weekNr: number = Math.ceil((numberOfDays - (todayWeekday - 1 )) / 7) + i;
                if(weekNr === 0){
                    weekNr = 52;
                }
                weekNrArray.push(weekNr);
            }
            setWeekNumbers(weekNrArray);

            // get the first and last dates of the week
            let first = day.getDate() - (todayWeekday - 1);
            let last = first + 6;
            let firstDate : Date = new Date(day.getFullYear(), day.getMonth(), first);
            let lastDate : Date = new Date(day.getFullYear(), day.getMonth(), last);
            
            let week : JSX.Element[] = [];
            for(let i = 0; i < days; i++){
                
                let date = new Date(firstDate.getFullYear(), firstDate.getMonth(),firstDate.getDate() + i);
                // have to add 1 hour to the date to get correct iso string (Norway has UTC +1)
                let date2 = new Date(date.getTime() + 2* 60 * 60 * 1000);
                let selectedDate = date2.toISOString().substring(0,10);                

                let other: string = "";
                if(date.toLocaleDateString() === today.toLocaleDateString()){
                    other = "today";
                }
                if(date.getMonth() !== month && month !== -1 && month !== -2) {
                    other = "notInMonth"
                }
                week.push(<DayComponent date={date} selectedDate={selectedDate} view={view} other={other}/>)
            }
            setWeekDates(week);

            // check if the week is over two months
            if(firstDate.getMonth() !== day.getMonth() || lastDate.getMonth() !== day.getMonth()){
                let interval = firstDate.getDate() + " " + monthNamesShort[firstDate.getMonth()].toLowerCase()  + " - " + lastDate.getDate() + " " + monthNamesShort[lastDate.getMonth()].toLowerCase();
                setWeekInterval(interval);
            }
            else {
                let interval = first + " - " + last + " " + monthNames[day.getMonth()].toLowerCase();
                setWeekInterval(interval);
            }  
        }    
    },[month, view, days]);

    return {weekNumbers, weekInterval, weekDates};   
}