import {useState, useEffect} from 'react';
import '../css/Navbar.css';
import '../css/App.css';

import Calendar from "../Images/Icons/Calendar.svg";
import Tasks from "../Images/Icons/Tasks.svg";
import Week from "../Images/Icons/Week.svg";
import More from "../Images/Icons/More.svg";

import { SideBar } from './SideBar';

export const Navbar = () => {

  const [calendarActive, setCalendarActive] = useState<string>();
  const [taskActive, setTaskActive] = useState<string>();
  const [weekActive, setWeekActive] = useState<string>();
  const [viewSideBar, setViewSideBar] = useState<boolean>(false);

  const CloseSideBar = () => {
    setViewSideBar(false);
  }

  useEffect(() => {
    setCalendarActive("");
    setTaskActive("");
    setWeekActive("");

    if(window.location.pathname === "/kalender"){
      setCalendarActive(" activeIcon");
    }
    if(window.location.pathname === "/oppgaver"){
      setTaskActive(" activeIcon");
    }
    if(window.location.pathname === "/uke"){
      setWeekActive(" activeIcon");
    }
  }, [window.location.pathname])


  return (
    <div className="navbar" id="navbar">
        <a href="/kalender" className="navbarItem"> <img className={`icon` + calendarActive} id="calendarIcon" src={Calendar} alt="calendarIcon"/> </a>
        <a href="/oppgaver" className="navbarItem"> <img className={`icon` + taskActive} id="taskIcon" src={Tasks} alt="todoIcon"/> </a>
        <a href="/uke" className="navbarItem">  <img className={`icon` + weekActive} id="weekIcon" src={Week} alt="WeekIcon"/> </a>
        
        <div className="sideBarOpenButton" onClick={() => setViewSideBar(true)}> <img className="icon" src={More} alt="moreIcon"/> </div>
        {viewSideBar
        ? <SideBar close={CloseSideBar}/>
      : null}
    </div>
  );
}