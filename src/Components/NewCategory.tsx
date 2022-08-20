import {useState, useEffect} from 'react';
import '../css/Navbar.css';
import '../css/App.css';

import { AddCategory } from '../Functions/AddCategory';
import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import { Colors } from '../Objects/Colors';

export const NewCategory = (props: {closeNewCategory: Function}) => {

  const [colorOptions, setColorOptions] = useState<JSX.Element[]>([]);
  const [viewColorOptions, setViewColorOptions] = useState<boolean>(false);
  const [color, setColor] = useState<string>(Colors.green); 
  const [name, setName] = useState<string>("");
  const user = useLoggedInUser(); 

  useEffect(() => {
    setColorOptions([]);
    Object.entries(Colors).forEach(([name, code]) => {
      setColorOptions(old => [...old,<div className="colorOption" onClick={() => setColor(code)} style={{backgroundColor: code}}/>]);
    })
  },[])

  const submitCategory = () => {
    AddCategory(color, name, true, user);
    props.closeNewCategory();
  }

  return (
    <div>
        <div className="sideBarItem">
            <div className="colorSelector" style={{backgroundColor:color}} onClick={() => setViewColorOptions(!viewColorOptions)}> 
                {viewColorOptions
                ? <div className="colorOptions">
                    {colorOptions}
                </div>
                : null}
            </div>
            <input type="text" className="newCategoryInput" placeholder='Kategorinavn' onChange={(e) => setName(e.target.value)}/>
            </div>
        <div className="sideBarItem alignNewCategoryButtons">
            <div className="button newCategoryButton" onClick={() => props.closeNewCategory()}> Avbryt</div>
            <div className="button newCategoryButton" onClick={() => submitCategory()}> Legg til </div>
        </div>
    </div>
  );
}