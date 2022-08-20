import {db} from '../Database/Firebase';
import {addDoc, collection} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const AddCategory = async (color: string, name: string, view: boolean, user: User) => {

    if(user){
        await addDoc(collection(db, "users", user.uid, "categories"), {
            name: name,
            color: color,
            view: view,
        });
    }    
}