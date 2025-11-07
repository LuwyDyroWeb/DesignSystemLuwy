import { Palette, Puzzle, FileCode } from "lucide-react";

const SummaryCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) => {
  return (
    <div className="bg-primary-green-200 border-2 border-primary-green-600 p-6 rounded-medium text-center flex flex-col items-center justify-center text-primary-blue-600 ">
      <Icon className="h-7 w-7 mb-2" />
      <span className="text-2xl font-medium mb-3">{value}</span>
      <p className="label text-base">{label}</p>
    </div>
  );
};



export const HomePage = () => {
  return (
    <div>
      <div className="pb-5 ">
        <p className="text-xl/6 text-primary-blue-600 font-normal mt-2 text-center">
          Un sistema de diseño integral que garantiza coherencia, accesibilidad
          y <br></br>eficiencia en todas las experiencias.
        </p>
      </div>

      <div className="flex justify-center align-middle pb-15">
        <button
          className="bg-primary-blue-600 text-white rounded-small px-3 py-1 border-primary-blue-600 border-2
            font-medium text-md mx-2
            hover:bg-white hover:text-primary-blue-600 hover:border-2 hover:border-primary-blue-600 
            transition-colors
            cursor-pointer
        "
        >
          Auto-synced con Figma
        </button>
        <button
          className="bg-white border-2 border-primary-blue-600 rounded-small px-3 py-1
            font-medium text-md mx-2 cursor-pointer
            hover:bg-primary-blue-600 hover:text-white
            transition-colors
        "
        >
          Archivo: UI Kit
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={Palette} value="+25" label="Design Tokens" />
        <SummaryCard icon={Puzzle} value="+25" label="Componentes" />
        <SummaryCard icon={FileCode} value="+25" label="Ejemplo de códigos" />
      </section>

      <section className="p-6 rounded-large border-primary-green-600 border-2  mt-15">
        <strong className="text-xl font-medium text-primary-green-600 mb-6 block">
          Propósito y alcance
        </strong>
        <p className="body text-primary-blue-600 mb-4">
          El Sistema de Diseño  sirve como la única fuente
          de verdad para todas las decisiones de diseño y desarrollo en nuestras
          plataformas. Abarca pautas visuales, patrones de interacción e
          implementaciones de código que garantizan experiencias de usuario
          consistentes.
        </p>

        <p className="body text-primary-blue-600 mb-10">
          Este sistema está diseñado para diseñadores, desarrolladores, gerentes
          de productos y partes interesadas que trabajan en soluciones de
          atención médica que priorizan la atención al paciente, accesibilidad y
          estándares médicos profesionales.
        </p>
      </section>

      <section className="mt-15">
        <strong className="text-2xl font-semibold text-primary-green-600 mb-6 block">
          Principios de diseño
        </strong>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6">
          <div className="flex flex-col md:flex-row border-2 rounded-large border-primary-blue-600 overflow-auto">
            <div className="min-w-full sm:min-w-auto lg:min-w-47 bg-primary-blue-600 flex justify-center items-center p-3">
              <Palette className="h-12 w-12 mb-2 text-white" />
            </div>
            <div className="p-5 bg-primary-blue-50 w-full">
              <b className="text-primary-blue-600">Consistencia</b>
              <p className="text-primary-blue-600">
                Lenguaje visual unificado en todos los puntos de contacto.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row border-2 rounded-large border-primary-blue-600 overflow-auto">
            <div className="min-w-full sm:min-w-auto lg:min-w-47 bg-primary-blue-600 flex justify-center items-center p-3">
              <Palette className="h-12 w-12 mb-2 text-white" />
            </div>
            <div className="p-5 bg-primary-blue-50 w-full">
              <b className="text-primary-blue-600">Consistencia</b>
              <p className="text-primary-blue-600">
                Lenguaje visual unificado en todos los puntos de contacto.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row border-2 rounded-large border-primary-blue-600 overflow-auto">
            <div className="min-w-full sm:min-w-auto lg:min-w-47 bg-primary-blue-600 flex justify-center items-center p-3">
              <Palette className="h-12 w-12 mb-2 text-white" />
            </div>
            <div className="p-5 bg-primary-blue-50 w-full">
              <b className="text-primary-blue-600">Consistencia</b>
              <p className="text-primary-blue-600">
                Lenguaje visual unificado en todos los puntos de contacto.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row border-2 rounded-large border-primary-blue-600 overflow-auto">
            <div className="min-w-full sm:min-w-auto lg:min-w-47 bg-primary-blue-600 flex justify-center items-center p-3">
              <Palette className="h-12 w-12 mb-2 text-white" />
            </div>
            <div className="p-5 bg-primary-blue-50 w-full">
              <b className="text-primary-blue-600">Consistencia</b>
              <p className="text-primary-blue-600">
                Lenguaje visual unificado en todos los puntos de contacto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-15">
        <strong className="text-2xl font-semibold text-primary-green-600 mb-6 block">
            ¿Como comenzar?
        </strong>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex flex-col rounded-large overflow-auto shadow-lg">
            <div className="min-w-full flex justify-center items-center ">
              <img src="./home/Back-Start-1.jpg" 
              alt="Paso 1"
              className="h-46 min-w-full "
              />
            </div>
             <div className="p-6 ">
              <b className="text-primary-blue-600 text-lg font-medium">1. Explore estilos</b>
              <p className="text-primary-blue-600">
                Comience con colores, tipografía y espaciado para comprender la base visual.
              </p>
            </div>
          </div>

           <div className="flex flex-col rounded-large overflow-auto shadow-lg">
            <div className="min-w-full flex justify-center items-center ">
              <img src="./home/Back-Start-1.jpg"  
              alt="Paso 1"
              className="h-46 min-w-full "
              />
            </div>
            <div className="p-6 ">
              <b className="text-primary-blue-600 text-lg font-medium">2. Explorar componentes</b>
              <p className="text-primary-blue-600">
                Descubra componentes reutilizables con código ejemplos y pautas de
 uso.
              </p>
            </div>
          </div>

         <div className="flex flex-col rounded-large overflow-auto shadow-lg">
            <div className="min-w-full flex justify-center items-center ">
              <img src="./home/Back-Start-1.jpg"  
              alt="Paso 1"
              className="h-46 min-w-full "
              />
            </div>
             <div className="p-6 ">
              <b className="text-primary-blue-600 text-lg font-medium">3. Implementar y construir</b>
              <p className="text-primary-blue-600">
                Utilice los recursos del desarrollador para implementar el sistema en tus proyectos.
              </p>
            </div>
          </div>
 
        </div>
      </section>
    </div>
  );
};

