import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";

// Pages
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from "./containers/UserProfile";

function App() {
  return <div className="App">
    <Router>
      <Route exact path="/">
        <UserProfile />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/create-account">
        <CreateAccount />
      </Route>
    </Router>
  </div>;
}

export default App;
