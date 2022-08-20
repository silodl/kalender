import {auth} from '../Database/Firebase';
import { onAuthStateChanged, User } from '@firebase/auth';
import {useState} from 'react';

export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>();

  onAuthStateChanged(auth, (user) => {
    if(user !== null){
      setLoggedInUser(user);
    }
  });
  const user : User = loggedInUser;
  return user;
}