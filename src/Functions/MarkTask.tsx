import {db} from '../Database/Firebase';
import {doc, updateDoc, getDoc} from 'firebase/firestore';

export const MarkTask = async (props: {userID: string, docID : string}) => {
    const {userID, docID} = props;

    const docRef = doc(db, "users", userID, "tasks", docID);
    const document = getDoc(docRef);
    document.then ( e => {
        const isChecked = e.data()?.checked;
        // check if already checked
        if(isChecked) {
            updateDoc(docRef, {
                checked: false,
                sortByChecked: "b",
            })
        }
        else {
            updateDoc(docRef, {
                checked: true,
                sortByChecked: "a",
            })
        }
    });
}