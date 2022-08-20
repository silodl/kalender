import { db } from '../Database/Firebase';
import {collection, getDocs, orderBy, query, Timestamp} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLoggedInUser } from './UseLoggedInUser';
import { Category } from '../Components/CategoryComponent';

export interface EventInfo {
    id: string,
    startDate: Date,
    title: string,
    color: string,
    endDate: Date,
    about: string,
    allDay: boolean,
    category: Category,
}

export const useEvents = () => {
    const user = useLoggedInUser();
    const [eventDays, setEventDays] = useState<EventInfo[]>([]);

    const fetchEvents = async () => {
        if(user){
            const col = query(collection(db, "users", user.uid, "events"), orderBy("startDate", "asc"));
            const docs = await getDocs(col);
            let events : EventInfo[] = [];
            docs.forEach(doc => {
                // string: yyyy-mm-ddThh:mm
                let startDate = doc.get("startDate").toDate();
                let endDate = doc.get("endDate").toDate();
                let color = doc.get("eventColor");
                let title = doc.get("title");
                let about = doc.get("about");
                let allDay = doc.get("allDay");
                let category = doc.get("category");

                if(startDate.toLocaleDateString() === endDate.toLocaleDateString()){
                    events.push({id: doc.id, startDate: startDate, title, color, endDate, about, allDay, category});
                }
                else {
                    // adds all events over several days
                    for(let i = 0; i < Math.floor((endDate.getTime() - startDate.getTime())/ (1000 * 3600 * 24)); i++) {
                        let date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
                        events.push({id: doc.id, startDate: date, title, color, endDate, about, allDay, category});
                    }
                } 
            });
            setEventDays(events);  
        }
    }

    useEffect(() => {
        fetchEvents();       
    },[user]);
    
    return eventDays;
}