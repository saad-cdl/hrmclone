import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await axios.post(
          "http://localhost:8000/HRMS/api/user/login",
          {},
          { withCredentials: true }
        );
        if (resp.status === 200) {
          setIsLoggedIn(true);
          const adminresp = await axios.get("http://localhost:8000/HRMS/api/user/isadmin", { withCredentials: true });
          if (adminresp.data.StatusCode === 200) {
            setAdmin(true);
          } else {
            setAdmin(false);
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { isloggedIn, admin, isLoading };
};

export default useAuth;
