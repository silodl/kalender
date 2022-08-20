import { useState, useEffect } from 'react';
import {db} from '../Database/Firebase';
import {collection, onSnapshot} from 'firebase/firestore';

import { useLoggedInUser } from './UseLoggedInUser';
import { Category } from '../Components/CategoryComponent';

export const useCategories = () => {
    const [categoriesInfo, setCategoriesInfo] = useState<Category[]>([]);
    const user = useLoggedInUser();

    useEffect(() => {
        if(user){
            const fetch = async () => {
                const q = collection(db, "users", user.uid, "categories");
                onSnapshot(q, (docs) => {
                setCategoriesInfo([]);
                docs.forEach(doc => {
                    let name: string = doc.get("name");
                    let color: string = doc.get("color");
                    let view: boolean = doc.get("view");
                    let id: string = doc.id;
                    setCategoriesInfo(old => [...old, {name, color, view, id}])
                })
                });
            }
            fetch();
        }        
    },[user])

    return categoriesInfo;
}