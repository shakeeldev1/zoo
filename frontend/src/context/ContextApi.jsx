// ================= IMPORTS =================
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useVerifyUserQuery } from "../redux/api/AuthApi";

// ================= CREATE CONTEXT =================
export const AppContext = createContext();

// ================= CUSTOM HOOK =================
export const useAppContext = () => {
  return useContext(AppContext);
};

// ================= PROVIDER =================
const ContextApi = ({ children }) => {

  // ================= STATES =================
  const [token, setToken] = useState(null);

  const [isLogin, setIsLogin] = useState(false);

  const [loading, setLoading] = useState(true);

  // ================= LOAD TOKEN FROM STORAGE =================
  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
      setIsLogin(false);
      setLoading(false);
    }

  }, []);

  // ================= VERIFY TOKEN FROM BACKEND =================
  const {
    data,
    isSuccess,
    isError,
    isLoading,
  } = useVerifyUserQuery(undefined, {
    skip: !token, // 🔥 ONLY RUN IF TOKEN EXISTS
  });

  // ================= VALIDATION CHECK =================
  useEffect(() => {

    // NO TOKEN
    if (!token) return;

    // WHILE VERIFYING
    if (isLoading) {
      setLoading(true);
      return;
    }

    // TOKEN VALID
    if (isSuccess && data?.success) {
      setIsLogin(true);
      setLoading(false);
    }

    // TOKEN INVALID
    if (isError) {
      localStorage.removeItem("token");
      setToken(null);
      setIsLogin(false);
      setLoading(false);
    }

  }, [token, isSuccess, isError, isLoading, data]);

  // ================= LOGIN FUNCTION =================
  const loginUser = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    // ❌ DO NOT SET isLogin HERE (backend will decide)
    setIsLogin(false);
  };

  // ================= LOGOUT FUNCTION =================
  const logoutUser = () => {

    localStorage.removeItem("token");

    setToken(null);

    setIsLogin(false);
  };

  // ================= VALUE =================
  const value = useMemo(() => ({
    
    token,
    isLogin,
    loading,

    setToken,
    setIsLogin,

    loginUser,
    logoutUser,

  }), [
    token,
    isLogin,
    loading,
  ]);

  // ================= PROVIDER =================
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextApi;