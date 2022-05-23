import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  loggedUid: null,
  token: null,
  login: (uid, token) => {console.log("hello")},
  logout: () => {console.log("hello00")},
});
