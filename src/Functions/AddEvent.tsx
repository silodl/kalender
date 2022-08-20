import { db } from '../Database/Firebase';
import {collection, addDoc, DocumentData, Timestamp} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Category } from '../Components/CategoryComponent';

export const AddEvent = async(title: string, allDay: boolean, about: string, color: string, eventStart: Date, eventEnd: Date, category: Category| null, user: User) => {

    if(user) {
    let newDoc: DocumentData;
    if(allDay){
        newDoc = await addDoc(collection(db, "users", user.uid, "events"), {
            title: title,
            allDay: allDay,
            about: about, 
            eventColor: color,
            startDate: Timestamp.fromDate(eventStart),
            endDate: Timestamp.fromDate(eventEnd),
            category: category,
        });
    }
    else {
        newDoc = await addDoc(collection(db, "users", user.uid, "events"), {
        title: title,
        allDay: allDay,
        about: about, 
        eventColor: color,
        startDate: Timestamp.fromDate(eventStart),
        endDate: Timestamp.fromDate(eventEnd),
        category: category,
        });
    }
    if(newDoc){
        window.location.href = "/kalender";
    }
    }    
}