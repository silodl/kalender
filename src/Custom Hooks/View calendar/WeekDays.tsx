import {useState, useEffect} from 'react';

import { shortWeekDayNames } from '../../Objects/WeekDayNames';

export const useWeekDays = () => {
    const [weekDays, setWeekDays] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setWeekDays([]);
        shortWeekDayNames.forEach(day => {     
            setWeekDays(oldArray => [...oldArray, <div className="weekDayItem">{day}</div>]);
        });
    },[]);
    return weekDays;
}