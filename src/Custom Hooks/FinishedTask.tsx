import {useState, useEffect} from 'react';
import {db} from '../Database/Firebase';
import {doc, onSnapshot} from 'firebase/firestore';

import { useLoggedInUser } from './UseLoggedInUser';

export const useFinishedTasks = () => {
    const [viewFinishedTasks, setViewFinishedTasks] = useState<boolean>();

    const user = useLoggedInUser();

    useEffect(() => {
        const fetchLoad = async () => {
            if(user){
                const docRef = doc(db, "users", user.uid);
                onSnapshot(docRef, (doc) => {
                    if(doc.exists()){
                        let viewFinishedTasks = doc.data().viewFinishedTasks;
                        setViewFinishedTasks(viewFinishedTasks); 
                    }
                });
            }
        }
        fetchLoad();   
    },[user]);
    
    return viewFinishedTasks;
}