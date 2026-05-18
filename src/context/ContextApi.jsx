// ================= IMPORTS =================
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  // ================= CHECK TOKEN =================
  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {

      setToken(storedToken);

      setIsLogin(true);

    } else {

      setToken(null);

      setIsLogin(false);
    }

    setLoading(false);

  }, []);

  // ================= LOGIN FUNCTION =================
  const loginUser = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    setIsLogin(true);
  };

  // ================= LOGOUT FUNCTION =================
  const logoutUser = () => {

    localStorage.removeItem("token");

    setToken(null);

    setIsLogin(false);
  };

  // ================= VALUE =================
  const value = useMemo(() => ({
    
    // states
    token,
    isLogin,
    loading,

    // setters
    setToken,
    setIsLogin,

    // functions
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