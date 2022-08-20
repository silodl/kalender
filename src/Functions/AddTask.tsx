import {db} from '../Database/Firebase';
import {collection, addDoc} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const AddTask = async (input: string, user: User) => {

  if(user){
    await addDoc(collection(db, "users", user.uid, "tasks"), {
    input: input,
    checked: false,
    dueDay: "",
    plannedDay: "",
  });
  }
}