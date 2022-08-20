import {useState, useEffect} from 'react';
import { useWeek } from './GetWeek';

import { monthNames } from '../../Objects/MonthNames';

export const useMonthView = (firstDayInMonth: Date) => {
    const [monthName, setMonthName] = useState<string>();
    const {weekNumbers, weekDates} = useWeek(firstDayInMonth, "dayInMonth", firstDayInMonth.getMonth(),42);

    useEffect(() => {
        setMonthName(monthNames[firstDayInMonth.getMonth()] + " " + firstDayInMonth.getFullYear());
    },[firstDayInMonth.getMonth()]);

    let weeknr: JSX.Element[] = [];
    weekNumbers.forEach(nr => {
        weeknr.push(<div className="weekNumber">{nr}</div>);
    })
    
    return {monthName, weeknr, weekDates};
};