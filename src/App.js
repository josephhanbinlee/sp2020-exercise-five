import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

// Pages
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});

  const firebaseConfig = {
    apiKey: "AIzaSyCtWHbsrdg4ANZ5CiDunV1cFvt6AZ0vRuY",
    authDomain: "exercise-five-3b4d5.firebaseapp.com",
    databaseURL: "https://exercise-five-3b4d5.firebaseio.com",
    projectId: "exercise-five-3b4d5",
    storageBucket: "exercise-five-3b4d5.appspot.com",
    messagingSenderId: "184661740909",
    appId: "1:184661740909:web:f5aa1340149715f6665e64"
  };

  // Ensure app is initialized when it is ready to be
  useEffect(() => {
    // Ensure app is not initialized more than once
    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

    // Setting auth to be persistent in SESSION storage, not cookies
    // SESSION is easier to work with

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(e) {
        console.log('AUTH ERROR', e);
      });
  }, [firebaseConfig]);

// Check to see if User is logged in
// User loads page, check status --> set state accordingly
useEffect(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      // Logged in
      console.log("user",user);
      setUserInformation(user);
      setLoggedIn(true);
    } else {
      // Not logged in
      setUserInformation({});
      setLoggedIn(false);
    }
    // Stop loading once everything is looked over
    setLoading(false);
  })

}, [])

  // Login
  function LoginFunction(e) {
    e.presentDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log("LOGIN RESPONSE", response);
        console.log("login success")
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log("LOGIN ERROR", error)
      })
  }
  
  // Logout
  function LogoutFunction() {
    firebase
    .auth()
    .signOut()
    .then(function() {
      setLoggedIn(false);
      console.log("logout success")
    })
    .catch(function(error) {
      console.log("LOGOUT ERROR", error)
    });

  }

  // Create Acc
  function CreateAccountFunction(e) {
    e.preventDefault(); // prevents the form from being set as a default form
    console.log("form payload", e);
    // Default values for testing --> named in CreatAccForm.js
    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log("VALID ACCOUNT CREATE", response);
        console.log("account success")
        setLoggedIn(true);
      })
      .catch(function(e) {
        console.log("CREATE ACCOUNT ERROR", e);
      }) 

  }
// -------- ** -------- //
  return (
  <div className="App">
    <Header LogoutFunction={LogoutFunction} isLoggedIn={loggedIn}/>
    <Router>

      <Route exact path="/">
        {!loggedIn ? (<Redirect to="/login"/> ) : (<UserProfile userInformation={userInformation}/>)}
      </Route>

      <Route exact path="/login">
        {!loggedIn ?
        (<Login LoginFunction={LoginFunction}/>) : (<Redirect to="/" />)}
      </Route>

      <Route exact path="/create-account">
        {!loggedIn ?
        (<CreateAccount CreateAccountFunction={CreateAccountFunction} />) : (<Redirect to="/" />)}
      </Route>

    </Router>
  </div>
  );
}

export default App;
