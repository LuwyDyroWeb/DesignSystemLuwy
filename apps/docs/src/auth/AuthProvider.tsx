import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "./firebase";

export interface IAuthContextProps {
  isInitializing: boolean;
  onLogin: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  onLoginWithGoogle: () => Promise<void>;
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
      const response = await fetch("https://dummyjson.com/auth/login", {
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
      // const storedToken = localStorage.getItem("accessToken");
      // const storedUsername = localStorage.getItem("username");
      const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const storedUsername = localStorage.getItem("username") || sessionStorage.getItem("username");
      console.log("Restaurando sesión:");
      if (storedUsername) setUsernameStorage(storedUsername);
      if (storedToken) setTokenStorage(storedToken);

      setIsInitializing(false);
    };

    restoreSession();
  }, []);

  const onLoginWithGoogle = useCallback(async () => {
    try {
      const user = await loginWithGoogle();

      if (!user) throw new Error("No se pudo iniciar sesión con Google");

      const username = user.displayName || user.email || "Usuario Google";
      const token = user.uid;
      const storage = localStorage;

      storage.setItem("username", username);
      storage.setItem("accessToken", token);
      
      setTokenStorage(token);
      setUsernameStorage(username);
    } catch (err) {
      console.error("Google Login Error:", err);
      throw err;
    }
  }, []);

  const onLogin = useCallback(async (username: string, password: string, rememberMe: boolean) => {
    try {
      const { accessToken } = await loginWithApi(username, password);
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("username", username);
      storage.setItem("accessToken", accessToken);

      setTokenStorage(accessToken);
      setUsernameStorage(username);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const onLogout = useCallback(
    async (isNavigate = true) => {
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("accessToken");
      console.log("Logging out...");
      setTokenStorage(null);
      setUsernameStorage(null);
      if (isNavigate) navigate(`./`, { replace: true });
    },
    [navigate]
  );

  const value: IAuthContextProps = useMemo(
    () => ({
      isInitializing,
      onLogin,
      onLoginWithGoogle,
      usernameStorage,
      tokenStorage,
      onLogout,
    }),
    [
      isInitializing,
      onLogin,
      onLoginWithGoogle,
      usernameStorage,
      tokenStorage,
      onLogout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
