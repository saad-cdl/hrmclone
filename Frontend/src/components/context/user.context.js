import { createContext, useContext } from "react";
// import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext({
  isAuthenticated: true,
  user: { name: 'Demo HR', email: 'hr@demo.com', role: 'admin' },
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
