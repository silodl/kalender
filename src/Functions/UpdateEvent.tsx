import {db} from '../Database/Firebase';
import {doc, updateDoc, Timestamp} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const UpdateEvent = async (user: User, eventId: string, about: string, allDay: boolean, endDate: Date, eventColor: string, startDate: Date, title: string, hideForm: Function) => {

  if(user){
    await updateDoc(doc(db, "users", user.uid, "events", eventId), {
        about: about,
        allDay: allDay,
        endDate: Timestamp.fromDate(endDate),
        eventColor: eventColor,
        startDate: Timestamp.fromDate(startDate),
        title: title,
    });
  }
  hideForm();
}