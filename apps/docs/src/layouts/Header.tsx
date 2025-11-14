import { useLocation } from "react-router-dom";
import { Power } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { PanelLeftOpen } from "lucide-react";
import useSidebarStatus from "../hooks/useSidebarStatus";

export const Header = () => {
  const location = useLocation();
  const { onLogout } = useAuth();
  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const routeTitles: { [key: string]: string } = {
    "/": "LuwyDyro - Design System",
    "/componente/botones": "Botones",
    "/componente/colores": "Colores",
    "/componente/tipografia": "Tipografía",
    "/componente/otros": "Otros Componentes",
    "/recursos": "Recursos de desarrollador",
    "/core/colores": "Colores",
  };

  const title = routeTitles[location.pathname] || "Luwy Dyro";

  return (
    <header className="bg-transparent sticky top-0 z-1000 pt-2">
      <div className="bg-primary-bluedark-950 border border-primary-blue-800 shadow-sm md:px-6 px-3 py-3.5 rounded-lg mb-10  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="flex h-12 w-12 text-white items-center cursor-pointer justify-center md:hidden"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <PanelLeftOpen />
            </button>
            <h1 className="text-xl md:text-3xl font-medium sm:ml-4 text-white">
              {title}
            </h1>
          </div>
          <div className="flex items-center sm:gap-7 gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/perfil.png"
                alt={`LuwyDyro`}
                className="h-10 w-10 rounded-full border-2 border-gray-200"
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-white max-sm:hidden">
                  {" "}
                  Luwy Dyro
                </p>
                <span className="max-sm:hidden text-xs font-medium text-primary-blue-500 -mt-1">
                  Dev FrontEnd
                </span>
              </div>
            </div>
            <button className="text-white h-12 w-12 cursor-pointer  hover:text-primary-blue-500 duration-200" onClick={() => onLogout(true)}>
              <Power strokeWidth={3.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
