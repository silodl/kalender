import {useState, useEffect} from 'react';
import {auth} from '../Database/Firebase';
import {Navigate} from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";

import { useLoggedInUser } from '../Custom Hooks/UseLoggedInUser';
import './Authentication.css';

export const Login = () => {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  
  const [doRedirect, setRedirect]= useState(false);

  const user = useLoggedInUser();

  useEffect(() => {
    if(user){
        setRedirect(true);
    }
  },[user])

  const submit = () =>{
    if(email && password){
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if(user){
            setRedirect(true);
        }
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
    }
  }

  return (
    <div className="base">

    {doRedirect ? <Navigate to="/kalender"/> : null}

    <div className="authTitle"> Logg inn </div>

    <form className="form">
    <div className="errorMessage"> {error} </div>

      <input type="email"
      placeholder="E-post *" 
      className="authField inputField field"
      onChange={(e) => setEmail(e.target.value.trim())}
      autoFocus required/>   
      <div className="errorMessage"> {emailError} </div> 

      <input type="password"
      placeholder="Passord *" 
      className="authField inputField field"
      onChange={(e) => setPassword(e.target.value.trim())}
      required/> 
      <div className="errorMessage"> {passwordError} </div>

      <div className="alignAuthButtons">
        <a className="secondButton" href="/registrer" style={{marginRight: "5px"}}> Registrer </a>
        <div className="button" onClick={submit} style={{marginLeft: "5px"}}> Logg inn </div>
      </div>
      
    </form>

    </div>
  );
  }