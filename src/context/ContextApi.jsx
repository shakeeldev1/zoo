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
  const [user, setUser] = useState(null);

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
      setUser(null);
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
      // Prefer user from server response, then fallback to localStorage if not set yet
      if (data?.user) {
        setUser(data.user);
      } else if (!user) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Failed to parse user from localStorage", e);
          }
        }
      }
      setLoading(false);
    }

    // INVALID TOKEN
    if (isError) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);
      setIsLogin(false);
      setLoading(false);
    }
  }, [
    token,
    verifyLoading,
    isSuccess,
    isError,
    data,
    user,
  ]);

  // ================= LOGIN =================
  const loginUser = (newToken) => {

    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLogin(true);
  };

  // ================= LOGIN WITH USER (for OTP flow) =================
  const loginUserWithUser = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsLogin(true);
  };

  // ================= LOGOUT =================
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsLogin(false);
  };

  // ================= VALUE =================
  const value = useMemo(() => ({
    token,
    isLogin,
    loading,
    user,

    setToken,
    setIsLogin,
    setUser,

    loginUser,
    loginUserWithUser,
    logoutUser,

  }), [
    token,
    isLogin,
    loading,
    user,
  ]);

  // ================= PROVIDER =================
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextApi;