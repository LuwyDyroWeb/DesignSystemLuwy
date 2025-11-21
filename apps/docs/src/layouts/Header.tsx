import { useLocation, Link } from "react-router-dom";
import { Power } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { PanelLeftOpen, House } from "lucide-react";
import useSidebarStatus from "../hooks/useSidebarStatus";

export const Header = () => {
  const location = useLocation();
  const { onLogout } = useAuth();
  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const routeTitles: { [key: string]: string } = {
    "/": "",
    "/documentacion/tokens": "Tokens",
    "/documentacion/instalacion": "Instalación",
    "/documentacion/changelog": "Changelog",
    "/documentacion/structure": "Estructura del Proyecto",
    "/content/colores": "Colores",
    "/content/tipografia": "Tipografía",
    "/componente/botones": "Botones",
    "/componente/dropdown": "Dropdown",
  };

  const title = routeTitles[location.pathname] || "";

  return (
    <header className="bg-transparent sticky top-0 z-1000 pt-2">
      <div className="bg-primary-bluedark-950 border border-primary-blue-800 shadow-sm md:px-6 px-3 py-3.5 rounded-lg mb-10  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 divide-x divide-dashed  divide-primary-blue-300 ">
            <button
              className="flex ml-4 pr-2 text-white items-center cursor-pointer justify-center md:hidden"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <PanelLeftOpen strokeWidth={1.5} className=" h-5 w-5"/>
            </button>

            <div className="flex items-center md:gap-3 gap-2 py-2 text-white">
              <Link to={"/"}>
                <House className="md:h-5 md:w-5 h-4 w-4" strokeWidth={2.5}/>
              </Link>
              <Link className={`flex items-center gap-1 before:pe-2 before:content-["/"] `} to={location.pathname}>
                   <h1 className="text-sm md:text-xl font-medium">
                    {title}
                  </h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:gap-7 gap-4">
            <div className="flex items-center">
              <img
                src="/perfil.png"
                alt={`LuwyDyro`}
                className="h-10 w-10 rounded-full border-2 border-gray-200"
              />
            </div>
            <button
              className="text-red-500 h-6 w-5 mr-6 cursor-pointer  hover:text-red-300 duration-200"
              onClick={() => onLogout(true)}
            >
              <Power strokeWidth={3.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
