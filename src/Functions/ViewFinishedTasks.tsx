import {db} from '../Database/Firebase';
import {doc, updateDoc, getDoc} from 'firebase/firestore';

export const ViewFinishedTasks = async (userID: string) => {
    
    if(userID){
       const docRef = doc(db, "users", userID);
        const document = await getDoc(docRef);
        let viewFinishedTasks = document.data()?.viewFinishedTasks;
        updateDoc(docRef, {
            viewFinishedTasks: !viewFinishedTasks,
        });
    }
}