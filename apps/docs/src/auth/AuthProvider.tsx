import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface IAuthContextProps {
  isInitializing: boolean;
  onLogin: (username: string, password: string) => Promise<void>;
  usernameStorage: string | null;
  tokenStorage: string | null;
  onLogout: (isRedirect: boolean) => Promise<void>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("AuthProvider mounted");
  const [tokenStorage, setTokenStorage] = useState<string | null>(null);
  const [usernameStorage, setUsernameStorage] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const navigate = useNavigate();

  const loginWithApi = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Error en login:", data);
        throw new Error(data.message || "Login inválido");
      }

      return data;
    } catch (err) {
      console.error("Error inesperado:", err);
      throw err;
    }
  };

  useEffect(() => {
    const restoreSession = () => {
      const storedToken = localStorage.getItem("access_token");
      const storedUsername = localStorage.getItem("username");
      console.log("Restaurando sesión:");
      if (storedUsername) setUsernameStorage(storedUsername);
      if (storedToken) setTokenStorage(storedToken);

      setIsInitializing(false);
    };

    restoreSession();
  }, []);

  const onLogin = useCallback(async (username: string, password: string) => {
    try {
      const { access_token } = await loginWithApi(username, password);
      const storage = localStorage;

      storage.setItem("username", username);
      storage.setItem("access_token", access_token);

      setTokenStorage(access_token);
      setUsernameStorage(username);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const onLogout = useCallback(async (isNavigate = true) => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    console.log("Logging out...");
    setTokenStorage(null);
    setUsernameStorage(null);
    if (isNavigate) navigate(`./`, { replace: true });
  }, [navigate]);

  const value: IAuthContextProps = useMemo(
    () => ({
      isInitializing,
      onLogin,
      usernameStorage,
      tokenStorage,
      onLogout,
    }),
    [isInitializing, onLogin, usernameStorage, tokenStorage, onLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
