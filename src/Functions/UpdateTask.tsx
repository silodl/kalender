import {db} from '../Database/Firebase';
import {doc, updateDoc} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const UpdateTask = async (input: string, user: User, plannedDay: string, taskId: string, dueDate: string, hideForm: Function) => {

  if(user){
    await updateDoc(doc(db, "users", user.uid, "tasks", taskId), {
    input: input,
    plannedDay: plannedDay,
    dueDate: dueDate,
    });
  }
  hideForm();
}