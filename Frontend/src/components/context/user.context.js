import { createContext, useContext } from "react";
// import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  setisAuthenticated: () => {},
  setuser: () => {},
  newuser: false,
  setnewuser: () => {},
  //   loading: true,
  //   setLoading: () => {},
  //   authenticate: async () => {},
});


export const AuthProvider = AuthContext.Provider;

export default function useAuth() {
  return useContext(AuthContext);
}
