import {db} from '../Database/Firebase';
import {doc, updateDoc} from 'firebase/firestore';
import { Category } from '../Components/CategoryComponent';

export const UpdateCategory = async (userId: string, name: string, color: string, categoryId: string, hideForm: Function) => {

    if(userId){
        const docRef = doc(db, "users", userId, "categories", categoryId);
        await updateDoc(docRef, {
            name: name,
            color: color,
        })
    }      
    hideForm();  
}

export const UpdateCategoryView = async (userId: string, category: Category) => {
    if(userId){
        const docRef = doc(db, "users", userId, "categories", category.id);
        await updateDoc(docRef, {
            view: category.view,
        })
    } 
}