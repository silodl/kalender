import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
  
import {Calendar} from './Pages/Calendar';
import {Tasks} from './Pages/Tasks';
import { DayView } from "./Pages/DayView";
import {Week} from './Pages/Week';
import {Login} from './Authentication/Login';
import {Register} from './Authentication/Register';
import { NewEvent } from "./Components/EventForm";

//<Route path="/nyttEvent" element={<EventForm/>}/>
  
export const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/loggInn" element={<Login/>}/>
                <Route path="registrer" element={<Register/>}/>
                <Route path="/kalender" element={<Calendar/>}/>
                <Route path="/nyttEvent" element={<NewEvent/>}/>
                <Route path="/oppgaver" element={<Tasks/>}/>  
                <Route path="/idag" element={<DayView/>}/>
                <Route path="/uke" element={<Week/>}/> 
            </Routes>
        </Router>
    );
}