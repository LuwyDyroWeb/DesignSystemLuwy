import { useLocation } from 'react-router-dom';
import {  Power } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

export const Header = () => {
  const location = useLocation();
  const { onLogout } = useAuth();

  const routeTitles: { [key: string]: string } = {
    '/': 'LuwyDyro - Design System',
    '/componente/botones': 'Botones',
    '/componente/colores': 'Colores',
    '/componente/tipografia': 'Tipografía',
    '/componente/otros': 'Otros Componentes',
    '/recursos': 'Recursos de desarrollador',
        '/core/colores': 'Colores',
  };

  const title = routeTitles[location.pathname] || 'Componente';

  return (
    <header className="bg-white sticky top-0 z-1000 pt-6 rounded-b-lg">
      <div className="bg-primary-green-600 shadow-sm px-6 py-3.5 rounded-lg mb-10  ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-white">{title}</h1>
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-2">
              <img
                src="/perfil.png"
                alt={`LuwyDyro`}
                className="h-10 w-10 rounded-full border-2 border-gray-200"
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-white"> Luwy Dyro</p>
                <span className="text-xs font-medium text-primary-blue-500 -mt-1">
                  Dev FrontEnd
                </span>
              </div>
            </div>
            <Power className='text-white cursor-pointer hover:text-primary-blue-500 duration-200' strokeWidth={3.5} onClick={() => onLogout(true)}/>
          </div>
        </div>
      </div>
    </header>
  );
};