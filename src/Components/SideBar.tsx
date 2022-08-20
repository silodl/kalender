import {useState, useEffect} from 'react';
import '../css/Navbar.css';
import '../css/App.css';
import {auth} from '../Database/Firebase';
import { signOut } from '@firebase/auth';

import Plus from "../Images/Icons/Plus.svg";

import { NewCategory } from './NewCategory';
import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import { useCategories } from '../Custom Hooks/UseCategories';
import { CategoryComponent } from './CategoryComponent';

export const SideBar = (props: {close: Function}) => {

  const [viewAddCategory, setViewAddCategory] = useState<boolean>(false);
  const categories = useCategories();
  const user = useLoggedInUser(); 
  const [colorOptions, setColorOptions] = useState<JSX.Element[]>([]);
  const [color, setColor] = useState("#8dafd2");

  const logOut = () => {
    if(user){
      signOut(auth);
      window.location.pathname = "/loggInn";
    }
  }

  const CloseNewCategory = () => {
    setViewAddCategory(false);
  }

  // <CategoryComponent category={categories[0]}/>

  return (
    <div>

    <div className="sideBar">
        <div className="alignSideBarElement">
            {user? <div className="sideBarItem sideBarUser"> {user.email} </div> : null}
            <div className="sideBarItem"> 
                <span> Kategorier </span> 
                <img className="plusIcon" src={Plus} alt="" style={{width: "20px"}} onClick={() => setViewAddCategory(true)}/>
            </div>
            
            {categories.map(category => {
                return <CategoryComponent category={category}/>
            })}
            
            {viewAddCategory
            ? <NewCategory closeNewCategory={CloseNewCategory}/>
            : null}

        </div> 

        <div className="sideBarItem sideBarButton">
          {user? <div onClick={logOut} className="button"> Logg ut </div> : <a className="button" href="/loggInn"> Logg inn </a>}
        </div>

    </div> 
    
    <div className="sideBarCloseArea" onClick={() => props.close()}/>

</div>
  );
}