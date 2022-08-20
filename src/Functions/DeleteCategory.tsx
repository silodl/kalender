import {db} from '../Database/Firebase';
import {deleteDoc, doc} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const DeleteCategory = async (user: User, taskId: string, hideForm: Function, HideDelete: Function) => {

  if(user){
    await deleteDoc(doc(db, "users", user.uid, "categories", taskId));
  }
  HideDelete();
  hideForm();
}