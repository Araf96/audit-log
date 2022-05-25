import React, {
  useState,
  useCallback,
  useEffect,
  Suspense,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Navigation from "./Shared/Components/Navigation/Navigation";
import { AuthContext } from "./Context/authCTX";
// import Site from "./Sites/Pages/Sites";
// import User from "./User/Pages/User";
// import AddSite from "./Sites/Pages/AddSite";
// import UpdateSite from "./Sites/Pages/UpdateSite";
// import Login from "./User/Pages/Login";
// import Signup from "./User/Pages/Signup";
// import About from "./Extra/About";
import "./App.css";
import LoadingSpinner from "./Shared/Components/ActionElements/LoadingSpinner";

const Site = React.lazy(() => import("./Sites/Pages/Sites"));
const User = React.lazy(() => import("./User/Pages/User"));
const AddSite = React.lazy(() => import("./Sites/Pages/AddSite"));
const UpdateSite = React.lazy(() => import("./Sites/Pages/UpdateSite"));
const Login = React.lazy(() => import("./User/Pages/Login"));
const Signup = React.lazy(() => import("./User/Pages/Signup"));
const About = React.lazy(() => import("./Extra/About"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUid, setLoggedUid] = useState(null);
  const [uToken, setUToken] = useState(null);

  const login = useCallback((uid, token) => {
    setIsLoggedIn(true);
    setLoggedUid(uid);
    setUToken(token);
    localStorage.setItem("userInfo", JSON.stringify({ id: uid, token }));
  },[]);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setLoggedUid(null);
    setUToken(null);
    localStorage.removeItem("userInfo");
  },[]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));

    if (userData && userData.id && userData.token) {
      try{
        const verify = async()=>{
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/verify`,{headers:{'x-auth': userData.token}});
          if(response.status===200){
            login(userData.id, userData.token);
          }
        }
        verify();
      }catch(e){

      }
    }
  }, [login]);

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
        <Route path="/" element={<Site key="home-route" />}></Route>
        <Route
          path="/sites/:userid"
          element={<Site key="usersite-route" />}
        ></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/about" element={<About />}></Route>
        {/* <Route path="/:userid/sites" element={<Site />}></Route> */}
        <Route path="/addsite" element={<AddSite />}></Route>
        <Route path="/updateSite/:siteid" element={<UpdateSite />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ isLoggedIn, loggedUid, uToken, login: login, logout: logout }}
      >
        <Router>
          <Navigation />
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner asOverlay />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
