import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { User, LockKeyhole } from "lucide-react";

type LocationState = {
  from?: {
    pathname: string;
  };
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { onLogin, usernameStorage, tokenStorage, isInitializing } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-primary-blue-50 p-4 ">
      <div className="bg-white relative border-primary-blue-600 border-2 shadow-lg w-[430px]  text-center px-5 sm:px-10 pb-10 pt-10">
        <div className="mx-auto flex items-center justify-center mb-6 ">
          <img
            src="/logo_luwydyro_light.svg"
            alt="Luwy Dyro"
            width={260}
            loading="lazy"
            decoding="async"
          />
        </div>

        <p className="text-primary-blue-600 mt-2 mb-3 text-2xl font-medium">Iniciar Sesión</p>

        <form className="space-y-4 text-left" onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label
              className="label-1 text-primary-blue-600 mb-1 block font-medium"
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
                className="
             body w-full text-primary-blue-600 placeholder:text-primary-blue-600 
              bg-white  border-2 border-primary-blue-600 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green-600 focus:border-primary-green-600 "
                required
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-blue-500  grid place-items-center h-6 w-6">
                <User/>
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label
              className="label-1 text-primary-blue-600 mb-1 block font-medium"
              htmlFor="contrasena"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                placeholder="Escribe tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="
              body w-full text-primary-blue-600 placeholder:text-primary-blue-600 
              bg-white  border-2 border-primary-blue-600 pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green-600 focus:border-primary-green-600 "
                required
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-blue-500 grid place-items-center h-6 w-6">
                <LockKeyhole />
              </span>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-3" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full 
            bg-primary-blue-600 text-white text-xl font-medium mt-5 p-3 hover:bg-primary-green-600 transition-colors
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
