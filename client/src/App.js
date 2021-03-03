import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

// Pages
import NotFoundPage from "./pages/404Page";
import SignIn from "./pages/SignInPage.jsx";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

class App extends Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/Home" component={HomePage} />
        <Route exact path="/Register" component={RegisterPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  }
}

export default App;
