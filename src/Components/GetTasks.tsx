import { useEffect, useState } from 'react';
import { Task } from '../Custom Hooks/UseTasks';
import { TaskComponent } from './TaskComponent';

export const GetTasks = (props: {tasks: Task[], finished: boolean}) => {
    const [tasks, setTasks] = useState<JSX.Element[]>([]);
    const [finishedTasks, setFinishedTasks] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setTasks([])
        setFinishedTasks([])
        props.tasks.forEach( task => {
            if(task.checked) {
                setFinishedTasks(old => [...old, <TaskComponent task={task}/>])
            }
            else {
                setTasks(old => [...old, <TaskComponent task={task}/>])
            }
        })
        console.log("current tasks", tasks)
    },[props.tasks])
    
    if(props.finished){
        return(
            <ul className="todoListFinished"> {finishedTasks} </ul>
        )
    }
    else {
        return(
            <ul className="todoListActive"> {tasks} </ul>
        )
    }
}