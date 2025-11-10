import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

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
      console.log("Bienvenido a Clínica San Felipe")
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error.", err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-green-50 p-4 bg-[url(/Background-Texture.svg)]">
      <div className="bg-white relative rounded-large border-primary-green-600 border-2 shadow-lg w-[430px]  text-center px-5 sm:px-10 pb-10 pt-10">
        <div className="mx-auto flex items-center justify-center -mt-27 mb-6 ">
          <img
            src="/Logo_SF.svg"
            alt="Clinica San Felipe"
            width={138}
            height={138}
            loading="lazy"
            decoding="async"
          />
        </div>

        <h1 className="text-2xl font-medium text-primary-blue-600">Design System</h1>
        <p className=" body-1 text-primary-blue-600 mt-2 mb-7">
          Sistema de diseño de la Clínica San Felipe
        </p>

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
              bg-white  border-2 border-primary-blue-600 rounded-medium  pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green-600 focus:border-primary-green-600 "
                required
              />
              <span
                className="
                pointer-events-none
                absolute left-4 top-1/2 -translate-y-1/2
                grid place-items-center
                h-6 w-6 
                "
              >
                <img
                  src="./icons/icon-logueo.svg"
                  alt=""
                  className="w-full"
                  aria-hidden="true"
                />
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
              bg-white  border-2 border-primary-blue-600 rounded-medium  pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-green-600 focus:border-primary-green-600 "
                required
              />
              <span
                className="
                pointer-events-none
                absolute left-4 top-1/2 -translate-y-1/2
                grid place-items-center
                h-6 w-6 
                "
              >
                <img
                  src="./icons/icon-logueo.svg"
                  alt=""
                  className="w-full"
                  aria-hidden="true"
                />
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
            bg-primary-blue-600 text-white text-xl font-medium mt-5  p-3 rounded-medium  hover:bg-primary-green-600 transition-colors
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
