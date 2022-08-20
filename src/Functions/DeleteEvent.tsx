import {db} from '../Database/Firebase';
import {deleteDoc, doc} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const DeleteEvent = async (user: User, eventId: string, hideForm: Function, HideDelete: Function) => {

  if(user){
    await deleteDoc(doc(db, "users", user.uid, "events", eventId));
  }

  HideDelete();
  hideForm();
}