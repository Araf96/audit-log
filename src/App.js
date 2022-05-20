import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Site from "./Sites/Pages/Sites";
import User from "./User/Pages/User";
import AddSite from "./Sites/Pages/AddSite";
import UpdateSite from "./Sites/Pages/UpdateSite";
import Navigation from "./Shared/Components/Navigation/Navigation";
import Login from "./User/Pages/Login";
import Signup from "./User/Pages/Signup";

import "./App.css";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  let routes = (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Site />}></Route>
      <Route path="/users" element={<User />}></Route>
      <Route path="/:userid/sites" element={<Site />}></Route>
      <Route path="/addsite" element={<AddSite />}></Route>
      <Route path="/updateSite/:siteid" element={<UpdateSite />}></Route>
      <Route path="/logout" element={<Site />}></Route>
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>
  );
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <main>{routes}</main>
      </Router>
    </React.Fragment>
  );
}

export default App;
