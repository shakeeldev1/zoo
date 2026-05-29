// ================= IMPORTS =================
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
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

  // ================= TOKEN =================
  const storedToken = localStorage.getItem("token");

  // ================= STATES =================
  const [token, setToken] = useState(storedToken || null);

  const [isLogin, setIsLogin] = useState(false);

  const [loading, setLoading] = useState(true);

  // ================= VERIFY USER =================
  const {
    data,
    isSuccess,
    isError,
    isLoading: verifyLoading,
  } = useVerifyUserQuery(undefined, {
    skip: !token,
  });

  // ================= TOKEN VERIFY =================
  useEffect(() => {

    // NO TOKEN
    if (!token) {

      setIsLogin(false);

      setLoading(false);

      return;
    }

    // VERIFY LOADING
    if (verifyLoading) {

      setLoading(true);

      return;
    }

    // VALID TOKEN
    if (isSuccess && data?.success) {

      setIsLogin(true);

      setLoading(false);
    }

    // INVALID TOKEN
    if (isError) {

      localStorage.removeItem("token");

      setToken(null);

      setIsLogin(false);

      setLoading(false);
    }

  }, [
    token,
    verifyLoading,
    isSuccess,
    isError,
    data,
  ]);

  // ================= LOGIN =================
  const loginUser = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    setIsLogin(true);
  };

  // ================= LOGOUT =================
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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