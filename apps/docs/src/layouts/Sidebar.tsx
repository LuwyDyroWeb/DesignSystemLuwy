import { useState, useEffect } from "react";
import type React from "react";
import {
  ChevronDown,
  Home,
  Route,
  LayoutDashboard,
  BookType,
  Component,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useSidebarStatus from "../hooks/useSidebarStatus";

type MenuChild = {
  label: string;
  href?: string;
};

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuChild[];
  onAction?: () => void;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const homeItem: MenuItem = { label: "Home", icon: Home, href: "/" };

export const Sidebar = () => {
  // const [isExpanded, setIsExpanded] = useState(true);
  const { sidebarStatus, setSidebarStatus } = useSidebarStatus();
  const [openItemLabel, setOpenItemLabel] = useState<string | null>("null");

  const location = useLocation();

  const menuSections: MenuSection[] = [
    {
      title: "Documentación",
      items: [
        {
          label: "Instalación",
          icon: Route,
          children: [
            // { label: "Colores", href: "/core/colores" },
            { label: "Tokens", href: "/recursos" },
            { label: "Instalación" },
            { label: "Changelog" },
            { label: "Estructura del Proyecto" },
          ],
        },
        {
          label: "Layout",
          icon: LayoutDashboard,
          children: [
            { label: "Aside", href: "/documentation/sidebar" },
            { label: "Header", href: "/documentation/header" },
            { label: "Footer", href: "/documentation/footer" },
          ],
        },
        {
          label: "Contenido",
          icon: BookType,
          children: [
            { label: "Colores", href: "/core/colores" },
            { label: "Tipografía" },
          ],
        },
        {
          label: "Componentes",
          icon: Component,
          children: [
            { label: "Button", href: "/componente/botones" },
            { label: "Dropdown" },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    let parentLabelToOpen: string | null = null;
    //Buscamos la ruta actual pertenece al un hijo
    for (const section of menuSections) {
      for (const item of section.items) {
        if (item.children) {
          const isChildActive = item.children.some(
            (child) => child.href === location.pathname
          );
          if (isChildActive) {
            parentLabelToOpen = item.label;
            break;
          }
        }
      }
      if (parentLabelToOpen) break;
    }
    setOpenItemLabel(parentLabelToOpen);
  }, [location.pathname]);

  const handleItemClick = (label: string) => {
    setOpenItemLabel((prevLabel) => (prevLabel === label ? null : label));
  };

  return (
    <aside
      className={`h-screen bg-white text-primary-blue-600 border overflow-auto scrollbar-w flex flex-col top-0 transition-all duration-300 ${
        sidebarStatus
          ? "md:w-64 max-md:left-0 sticky max-md:fixed"
          : "md:w-19 max-md:-left-19 max-md:fixed"
      }  z-1001`}
    >

      <div className="flex items-center">
        <div className="p-6 bg-primary-blue-600  shrink-0 min-w-full w-full flex justify-center items-center">
          {!sidebarStatus && (
            <button
              className="cursor-pointer text-white"
              onClick={() => setSidebarStatus(!sidebarStatus)}
            >
              <PanelLeftOpen />
            </button>
          )}

          {sidebarStatus && (
            <div className="w-full flex justify-between items-center gap-3 ">
              <Link to="/">
                <img
                  src="/logo_luwydyro_dark.svg"
                  alt="LogoTipo"
                  className="h-8"
                />
              </Link>
              <button
                className="cursor-pointer text-white"
                onClick={() => setSidebarStatus(!sidebarStatus)}
              >
                <PanelLeftClose />
              </button>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 pt-6 px-4 pb-20">
        <NavItem
          item={homeItem}
          isExpanded={sidebarStatus}
          isOpen={false}
          onClick={() => {}}
        ></NavItem>

        {menuSections.map((section) => (
          <div key={section.title}>
            <b
              className={`flex justify-center pt-4 pb-2 text-[0.625rem] font-bold uppercase text-primary-blue-600
                  ${sidebarStatus ? "px-2 justify-start" : ""}
                
                `}
            >
              {sidebarStatus
                ? section.title
                : section.title.length > 4
                ? section.title.substring(0, 3) + "..."
                : section.title}
            </b>

            {section.items.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                isExpanded={sidebarStatus}
                isOpen={openItemLabel === item.label}
                onClick={() => {
                  handleItemClick(item.label);
                  setSidebarStatus(sidebarStatus);
                }}
              ></NavItem>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

type NavItemProps = {
  item: MenuItem;
  isExpanded: boolean;
  isOpen: boolean;
  onClick: () => void;
};

const NavItem = ({ item, isExpanded, isOpen, onClick }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = item.href ? location.pathname === item.href : false;

  const handleClick = () => {
    if (item.onAction) {
      item.onAction();
    } else if (item.children) {
      onClick();
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between px-2 py-3 mb-2 cursor-pointer transition-colors duration-150
          ${
            isOpen || isActive
              ? "bg-primary-blue-50  text-primary-blue-700 font-semibold"
              : "hover:bg-primary-blue-50"
          }
        `}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <item.icon className="h-6 w-6 shrink-0" />
          {isExpanded && <span className="ml-4 flex-1">{item.label}</span>}
        </div>
        {isExpanded && item.children && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {isOpen && isExpanded && item.children && (
        <div className="px-3 py-2 space-y-2">
          {item.children.map((child: MenuChild) => (
            <Link
              key={child.label}
              to={child.href || "#"}
              className={`flex text-sm text-primary-blue-400 min-h-8 hover:text-primary-blue-600 m-0 justify-start items-center border-l-1 border-primary-blue-100 px-3
                    ${
                      location.pathname === child.href
                        ? "text-primary-blue-600 font-semibold"
                        : "text-primary-blue-50 hover:text-primary-blue-600"
                    }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
