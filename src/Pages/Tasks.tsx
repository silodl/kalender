import {useState, useEffect} from 'react';
import '../css/App.css';
import '../css/Tasks.css';
import {Navbar} from '../Components/Navbar';
import {useTasks} from '../Custom Hooks/UseTasks';
import { AddTask } from '../Functions/AddTask';
import { useFinishedTasks } from '../Custom Hooks/FinishedTask'; 
import { ViewFinishedTasks } from '../Functions/ViewFinishedTasks';
import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import { GetTasks } from '../Components/GetTasks';

import NoTasks from "../Images/Icons/NoTasks.svg";

export const Tasks = () => {
  const [input, setInput] = useState("");
  const [tasks, finishedTasks] = useTasks();
  const user = useLoggedInUser(); 
  const viewFinishedTasks = useFinishedTasks();

  const NewTask = (props: {e: any, input: string}) => {
    if(props.e.key === "Enter" && props.input !== ""){
      AddTask(input, user);
      props.e.target.value = "";
    }
  }

  useEffect(() => {
    let button = document.getElementById("hideFinishedTasks");
    if(viewFinishedTasks && button){
      button.innerHTML = "Skjul fullførte";
    }
    if(!viewFinishedTasks && button){
      button.innerHTML = "Vis fullførte";
    }
  }, [viewFinishedTasks])

  return (
    <div className="base">
       <div className="pageTitle"> Oppgaver </div>
       <div className="todoList">
        {tasks.length === 0
        ? <div className="noTasks">
            <div> Ingen oppgaver igjen! </div>
            <img className="noContent" src={NoTasks} alt="no tasks"/> </div>
        : <GetTasks tasks={tasks} finished={false}/>
        }
        <div id="hideFinishedTasks" onClick={() => ViewFinishedTasks(user.uid)}> Skjul fullførte </div>
        {finishedTasks.length !== 0 && viewFinishedTasks
        ? <GetTasks tasks={finishedTasks} finished={true}/>
        : null}

        </div>
        <div id="todoInputBox">
          <span className="circleOutlineIcon"/>
          <input id="todoInputField" onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => NewTask({e,input})}
          placeholder="Legg til ny oppgave"/>
        </div>
      <Navbar/>
    </div>
  );
}