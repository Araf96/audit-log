import React from "react";
import {
  BrowserRouter as Router
 } from "react-router-dom";

import Navigation from "./Shared/Components/Navigation/Navigation";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigation/>
      </Router>
    </React.Fragment>
  );
}

export default App;
