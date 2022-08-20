import { useState } from "react";
import { Task } from "../Custom Hooks/UseTasks";
import { UpdateTask } from "../Functions/UpdateTask";
import { useLoggedInUser } from "../Custom Hooks/UseLoggedInUser";
import { DeleteTask } from "../Functions/DeleteTask";

export const EditTask = (props: {task: Task, hideForm: Function})=> {
  const [dueDate, setDueDate] = useState<string>("");
  const [plannedDay, setPlannedDay] = useState<string>("");
  const [input, setInput] = useState<string>(props.task.input);
  const user = useLoggedInUser();
  const [viewDelete, setViewDelete] = useState<boolean>();

  let dueDateDefault = "";
  let plannedDayDefault = "";

  const HideDelete = () => {
    setViewDelete(false);
  }

  if(props.task.dueDate) {
    let dueDateNumbers = props.task.dueDate.split(".");
    if(dueDateNumbers[1].length === 1){
      dueDateNumbers[1] = "0" + dueDateNumbers[1];
    }
    if(dueDateNumbers[0].length === 1){
      dueDateNumbers[0] = "0" + dueDateNumbers[0];
    }
    dueDateDefault = dueDateNumbers[2] + "-" + dueDateNumbers[1] + "-" + dueDateNumbers[0]; 
  }

  if(props.task.plannedDay){
    let plannedDayNumbers = props.task.plannedDay.split(".");
    if(plannedDayNumbers[1].length === 1){
      plannedDayNumbers[1] = "0" + plannedDayNumbers[1];
    }
    if(plannedDayNumbers[0].length === 1){
      plannedDayNumbers[0] = "0" + plannedDayNumbers[0];
    }
    plannedDayDefault = plannedDayNumbers[2] + "-" + plannedDayNumbers[1] + "-" + plannedDayNumbers[0]; 
  }
  
  

  return(
    <div className="editEvent">
      <div className="editEventField"> Tittel: <input className="taskEditInput" type="text" defaultValue={props.task.input} onChange={(e) => setInput(e.target.value)} /> </div>
      <div className="editEventField"> Frist: <input className="taskEditInput" type="date" defaultValue={dueDateDefault} onChange={(e) => setDueDate(new Date(e.target.value).toLocaleDateString())} /> </div>
      <div className="editEventField"> Planlagt: <input  className="taskEditInput" type="date" defaultValue={plannedDayDefault} onChange={(e) => setPlannedDay(new Date(e.target.value).toLocaleDateString())} /> </div>
      
      {viewDelete
        ? <div className="deleteAlertBackground">
            <div className="deleteAlert"> 
              <div>Er du sikker på at du vil slette "{props.task.input}"?</div> 
              <div className="alignDeleteAlertButtons">
                <div className="secondButton" onClick={() => setViewDelete(false)}> Avbryt</div>
                <div className="deleteButton" onClick={() => DeleteTask(user, props.task.id, props.hideForm, HideDelete)}> Slett </div>
              </div>
            </div>
          </div>
        : null} 

      <div className="editEventButtons">
        <div className="deleteButton editButton" onClick={() => setViewDelete(true)}> Slett </div>  
        <div className="alignButtons">
          <span className="secondButton editButton" onClick={() => props.hideForm()}> Avbryt </span>  
          <span className="button editButton" onClick={() => UpdateTask(input, user, plannedDay, props.task.id, dueDate, props.hideForm)}> Lagre </span>   
        </div>
      </div>
    </div>
  )

}