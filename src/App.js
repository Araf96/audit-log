import React, { useState, useCallback, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./Context/authCTX";
import Site from "./Sites/Pages/Sites";
import User from "./User/Pages/User";
import AddSite from "./Sites/Pages/AddSite";
import UpdateSite from "./Sites/Pages/UpdateSite";
import Navigation from "./Shared/Components/Navigation/Navigation";
import Login from "./User/Pages/Login";
import Signup from "./User/Pages/Signup";
import About from "./Extra/About";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    console.log("Inside login");
    setIsLoggedIn(true);
  });
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });

  let routes = (
    <Routes>
      <Route path="/about" element={<About />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
  );

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Site />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/:userid/sites" element={<Site />}></Route>
        <Route path="/addsite" element={<AddSite />}></Route>
        <Route path="/updateSite/:siteid" element={<UpdateSite />}></Route>
        {/* <Route path="/logout" element={<Login />}></Route> */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <Router>
          <Navigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
