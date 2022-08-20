import {useState, useEffect} from 'react';
import {db} from '../Database/Firebase';
import {collection, onSnapshot, orderBy, query, where} from 'firebase/firestore';
import { useFinishedTasks } from './FinishedTask';

import { useLoggedInUser } from './UseLoggedInUser';

export interface Task {
    id: string,
    dueDate: string,
    checked: boolean,
    input: string,
    plannedDay: string,
}

export const useTasks = () => {

    const viewFinishedTasks = useFinishedTasks();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [finished, setFinished] = useState<Task[]>([]);

    const user = useLoggedInUser();

    useEffect(() => {
        if(user) {
            onSnapshot(query(collection(db, "users", user.uid, "tasks"), (viewFinishedTasks? orderBy("checked") : where("checked", "==", false)), orderBy("added", "desc")), tasksCol => {
                let tasksObj: Task[] = [];
                let finishedObj: Task[] = [];
                tasksCol.forEach( task => {
                    console.log("task", task)
                    let id = task.id;
                    let checked = task.get("checked");
                    let input = task.get("input");
                    let plannedDay = task.get("plannedDay");
                    let dueDate = task.get("dueDate");

                    if(!finishedObj.includes({id, checked, input, plannedDay, dueDate}) && !tasksObj.includes({id, checked, input, plannedDay, dueDate})){
                        if(task.data()?.checked){
                            finishedObj.push({id, checked, input, plannedDay, dueDate});
                        }
                        else {
                            tasksObj.push({id, checked, input, plannedDay, dueDate});
                        }
                    }
                }) 
                setTasks(tasksObj);
                setFinished(finishedObj);
            })   
        }
    //},[user, viewFinishedTasks])
    },[])

    //console.log("current tasks", tasks, "finished tasks", finished)

    return [tasks, finished];
}