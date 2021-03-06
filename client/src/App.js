import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.utils";
import {
  setCurrentTeacher,
  logoutTeacher,
} from "./redux/teacher/teacher.actions";

import { Provider } from "react-redux";
import store from "./redux/store";

import TeacherLogin from "./components/auth/teacher/teacherLogin.component";
import TeacherRegister from "./components/auth/teacher/teacherRegister.component";
import Navbar from "./components/navbar/navbar.component";
import Homepage from "./pages/homepage/homepage.page";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./pages/dashboard/dashboard.page";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token hader_auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentTeacher(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutTeacher());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/teacher-register" component={TeacherRegister} />
          <Route exact path="/teacher-login" component={TeacherLogin} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
