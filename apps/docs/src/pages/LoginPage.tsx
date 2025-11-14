import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { EyeOff, Eye } from "lucide-react";

type LocationState = {
  from?: {
    pathname: string;
  };
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const { onLogin, usernameStorage, tokenStorage, isInitializing } = useAuth();
  const [usuario, setUsuario] = useState("emilys");
  const [contrasena, setContrasena] = useState("emilyspass");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = state?.from?.pathname || "/";

  if (isInitializing) {
    return null;
  }

  if (tokenStorage && usernameStorage) {
    console.log("Usuario ya autenticado, redirigiendo...");
    return <Navigate to={from} replace />;
  }
  const toggleVisibility = (field: string) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!usuario || !contrasena) {
      setError("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      await onLogin(usuario, contrasena);
      console.log("Bienvenido a Design System - LuwyDyro");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error.", err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-blue-950 p-4 ">
      <div className="bg-primary-bluedark-950 rounded-xl relative border-primary-bluedark-800 border shadow-lg w-[380px]  text-center px-5 sm:px-8 py-10">
        <div className="mx-auto flex items-center justify-center mb-6">
          <img
            src="/logo_luwydyro_dark.svg"
            alt="Luwy Dyro"
            width={260}
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="text-blue-50 mt-2 mb-3 text-xl font-medium">
          Iniciar Sesión
        </p>
        <form className="space-y-4 text-left" onSubmit={handleLogin} noValidate>
          <div className="mb-4">
            <label
              className="label-1 text-blue-200 mb-1 block text-sm"
              htmlFor="usuario"
            >
              Usuario
            </label>

            <div className="relative">
              <input
                id="usuario"
                type="text"
                placeholder="Escribe tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="body w-full text-blue-200 text-sm rounded-md bg-primary-bluedark-950 border border-primary-bluedark-600 px-4 py-2.5 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              className="label-1 text-blue-200 mb-1 block text-sm"
              htmlFor="contrasena"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="contrasena"
                name="contrasena"
                type={visibility.password ? 'text' : 'password'}
                placeholder="Escribe tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="body w-full text-blue-200 text-sm rounded-md bg-primary-bluedark-950 border border-primary-bluedark-600 px-4 py-2.5 focus:outline-none focus:border-blue-400"
                required
              />
              <div className="absolute top-0.5 bottom-0.5 flex justify-center items-center px-1 rounded-sm end-2">
                <div className="text-primary-blue-600" onClick={() => toggleVisibility('password')} tabIndex={-1}>
                  {visibility.password ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm mb-3" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full 
            bg-primary-blue-400 text-white rounded-md text-md font-medium mt-5 p-3 hover:bg-primary-green-600 transition-colors
            cursor-pointer
            "
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};
