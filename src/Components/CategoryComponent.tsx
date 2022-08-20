import { useState } from 'react';
import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import { EditCategory } from './EditCategory';
import { UpdateCategoryView } from '../Functions/UpdateCategory';
import Pencil from '../Images/Icons/Pencil.svg';

export interface Category {
    color: string,
    name: string,
    view: boolean,
    id: string,
}

export const CategoryComponent = (props: {category: Category}) => {
    const user = useLoggedInUser();
    const [viewEditCategoryForm, setViewEditCategoryForm] = useState<boolean>(false); 

    const HideForm = () =>  {
        setViewEditCategoryForm(false);
    }

    const HandleCheckBoxClick = (id: string, view: boolean) => {
        UpdateCategoryView(user.uid, props.category);
    }

    if(props.category){
        return(
        <div>
            {viewEditCategoryForm
            ? <EditCategory hideForm={HideForm} category={props.category}/>
            : <div className="sideBarItem">
                <div className="alignNameAndCheckBox">
                    {props.category.view 
                    ? <span className="sideBarCheckbox" onClick={() => HandleCheckBoxClick(props.category.id, props.category.view)} style={{borderColor: props.category.color, backgroundColor: props.category.color+"80"}} />

                    : <span className="sideBarCheckbox" onClick={() => HandleCheckBoxClick(props.category.id, props.category.view)} style={{borderColor: props.category.color}}/>
                    }
                    <span className="categoryName">{props.category.name} </span>
                </div>
                <img src={Pencil} alt="" className="editCategoryIcon" onClick={() => setViewEditCategoryForm(true)}/>
                </div> 
            } 
        </div>   
        ) 
    }
    else {
        return( <div></div>)
    }
       
}