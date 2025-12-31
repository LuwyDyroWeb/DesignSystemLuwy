import { useLocation, Link } from "react-router-dom";
import { FolderInput } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { PanelLeftOpen, House } from "lucide-react";
import useSidebarStatus from "../hooks/useSidebarStatus";

export const Header = () => {
  const location = useLocation();
  const { onLogout } = useAuth();
  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();

  const routeTitles: { [key: string]: string } = {
    "/": "Home",
    "/documentacion/tokens": "Tokens",
    "/documentacion/instalacion": "Instalación",
    "/documentacion/changelog": "Changelog",
    "/documentacion/structure": "Estructura del Proyecto",
    "/content/colores": "Colores",
    "/content/tipografia": "Tipografía",
    "/componente/botones": "Botones",
    "/componente/accordion": "Accordion",
    "/componente/dropdown": "Dropdown",
  };

  const title = routeTitles[location.pathname] || "";

  return (
    <header className="bg-primary-bluedark-950 sticky top-0 z-1000 pt-2">
      <div className=" border border-primary-blue-800 shadow-sm md:px-6 px-3 py-2 mt-2 rounded-lg mb-10  ">
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
                <House className="md:h-4 md:w-4 h-4 w-4" />
              </Link>
              <Link className={`flex items-center gap-1 before:pe-2 before:content-["/"] text-xs `} to={location.pathname}>
                   <b className="text-sm md:text-md font-normal">
                    {title}
                  </b>
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:gap-7 gap-4">
            <div className="flex items-center">
              <img
                src="/perfil.png"
                alt={`LuwyDyro`}
                className="h-8 w-8 rounded-full "
              />
            </div>
            <button
              className="text-blue-50 h-6 w-5 mr-6 cursor-pointer  hover:text-red-400 duration-200"
              onClick={() => onLogout(true)}
            >
              
              <FolderInput  strokeWidth={1.5} />
              
              
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
