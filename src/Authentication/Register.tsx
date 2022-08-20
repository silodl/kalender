import React, {useState, useEffect} from 'react';
import {db, auth} from '../Database/Firebase';
import {Navigate} from 'react-router-dom';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';

export const Register = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [doRedirect, setRedirect]= useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();


  const user = useLoggedInUser();

  useEffect(() => {
    if(user){
        setRedirect(true);
    }
  },[user])

  const newUser = async (userId: string) => {
    await setDoc(doc(db, "users", userId), {
      name: name,
      email: email,
      viewFinishedTasks: true,
      categories: {},
      });  
  }

  const submit = () => {
    if(email && password && name){
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        let userId = userCredential.user.uid;
        newUser(userId);       
      })
      .catch( error => {
        setError(error.message)
      })
    }
    else {
      let error = "Vennligst fyll inn dette feltet";
      if(!password){
        setPasswordError(error);
        document.getElementById("password")?.focus();
      }
      if(!email){
        setEmailError(error);
        document.getElementById("email")?.focus();
      }
      if(!name){
        setNameError(error);
        document.getElementById("name")?.focus();
      }
    }
  }

  return (
    <div className="base authBase">

    {doRedirect ? <Navigate to="/kalender"/> : null} 

    <div className="authTitle"> Registrer ny bruker </div>
    <form className="form">
    <div className="errorMessage"> {error} </div>

      <input type="text"
        placeholder="Navn *" 
        className="authField inputField field"
        required
        onChange={(e) => (setName(e.target.value))}
        autoFocus/> 
      <div className="errorMessage"> {nameError} </div>

      <input type="email"
        placeholder="E-post *" 
        className="authField inputField field"
        onChange={(e) => setEmail(e.target.value.trim())}
        required/>  
      <div className="errorMessage"> {emailError} </div> 

      <input type="password"
      placeholder="Passord *" 
      className="authField inputField field"
      onChange={(e) => setPassword(e.target.value.trim())}
      required/> 
      <div className="errorMessage"> {passwordError} </div>

      <div className="alignAuthButtons">
      <a className="secondButton" href="/loggInn" style={{marginRight: "5px"}}> Logg inn </a>
      <div className="button" onClick={submit} style={{marginLeft: "5px"}}> Registrer </div>
      </div>
      
    </form>
    </div>
  );
}