import { MarkTask } from '../Functions/MarkTask';
import { Task } from '../Custom Hooks/UseTasks';
import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import { useState } from 'react';
import { EditTask } from './EditTask';
import { monthNamesShort } from '../Objects/MonthNames';
import { shortWeekDayNames } from '../Objects/WeekDayNames';
import Pencil from '../Images/Icons/Pencil.svg';

export const TaskComponent = (props: {task: Task}) => {

    const user = useLoggedInUser();
    const [viewEditTaskForm, setViewEditTaskForm] = useState<boolean>(false);

    const HideForm = () =>  {
        setViewEditTaskForm(false);
    }

    let iconClass = "";
    let iconContent = "";
    let img: JSX.Element = <div/>
    if(props.task.checked) {
        iconClass = "circleFilledIcon";
        iconContent = "✔";
    }
    else {
        iconClass = "circleOutlineIcon";
        img = <img src={Pencil} alt="" className="editTaskIcon" onClick={() => setViewEditTaskForm(true)}/>
    }

    let dueDateString = "";
    if(props.task.dueDate) {
        let dueDateNumbers = props.task.dueDate.split(".");
        let dueDate = new Date( parseInt(dueDateNumbers[2]), parseInt(dueDateNumbers[1]) -1, parseInt(dueDateNumbers[0]));
        dueDateString = shortWeekDayNames[dueDate.getDay()] + ". " + dueDate.getDate() + ". " + monthNamesShort[dueDate.getMonth()];
    }
    return(
        <li className="todoListItem">
            {viewEditTaskForm
            ? <EditTask task={props.task} hideForm={HideForm}/>
            : <div className="alignTask">
                    <span className={iconClass} onClick={() => MarkTask({userID: user.uid, docID: props.task.id})}> {iconContent} </span> 
                    <span> {props.task.input} </span> 
                    <span className="taskDueDate"> {dueDateString} </span>
                    {img}
                </div> 
            }    
        </li>   
    )    
}