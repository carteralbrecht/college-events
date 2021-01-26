import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

// Pages
import MainPage from "./pages/index";
import NotFoundPage from "./pages/404";
import SignIn from "./pages/Signin";

class App extends Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  }
}

export default App;
