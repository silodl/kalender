import { useState, useEffect } from "react";
import { useLoggedInUser } from "../Custom Hooks/UseLoggedInUser";
import { DeleteCategory } from "../Functions/DeleteCategory";
import { Category } from "./CategoryComponent";
import { Colors } from '../Objects/Colors';
import { UpdateCategory } from "../Functions/UpdateCategory";

export const EditCategory = (props: {category: Category, hideForm: Function})=> {

    const user = useLoggedInUser();
    const [viewDelete, setViewDelete] = useState<boolean>();
    const [name, setName] = useState<string>(props.category.name);
    const [color, setColor] = useState<string>(props.category.color);
    const [colorOptions, setColorOptions] = useState<JSX.Element[]>([]);
    const [viewColorOptions, setViewColorOptions] = useState<boolean>(false);

    useEffect(() => {
        setColorOptions([]);
        Object.entries(Colors).forEach(([name, code]) => {
          setColorOptions(old => [...old,<div className="colorOption" onClick={() => setColor(code)} style={{backgroundColor: code}}/>]);
        })
      },[])

    const HideDelete = () => {
        setViewDelete(false);
    }
    
    return(
        <div>
            <div className="sideBarItem">
                <div className="colorSelector" style={{backgroundColor:color}} onClick={() => setViewColorOptions(!viewColorOptions)}> 
                    {viewColorOptions
                    ? <div className="colorOptions">
                        {colorOptions}
                    </div>
                    : null}
                </div>
                <input type="text" className="newCategoryInput" defaultValue={props.category.name} onChange={(e) => setName(e.target.value)}/>
            </div>

            {viewDelete
                ? <div className="deleteAlertBackground">
                    <div className="deleteAlert"> 
                    <div>Er du sikker på at du vil slette "{props.category.name}" </div> 
                    <div className="alignDeleteAlertButtons">
                        <div className="secondButton" onClick={() => setViewDelete(false)}> Avbryt</div>
                        <div className="deleteButton" onClick={() => DeleteCategory(user, props.category.id, props.hideForm, HideDelete)}> Slett </div>
                    </div>
                    </div>
                </div>
                : null} 


            <div className="editCategoryButtons">
                <div className="deleteButton editButton" onClick={() => setViewDelete(true)}> Slett </div>  
                <div className="alignButtons">
                <span className="secondButton editButton" onClick={() => props.hideForm()}> Avbryt </span>  
                <span className="button editButton" onClick={() => UpdateCategory(user.uid, name, color, props.category.id, props.hideForm)}> Lagre </span>   
                </div>
            </div>
        </div>
    )
}