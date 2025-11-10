import { useState } from "react";
import { Calendar, Check, ClipboardList, ChevronDown, MonitorCog, MonitorDown, Pyramid, Atom  } from "lucide-react";

export const RecursosDev = () => {
  const [activeTypeButton, setActiveTypeButton] = useState<string>("Type1");
  const [open, setOpen] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const toggleSection = (sectionName: string) => {
    setOpen((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const typeLabels: Record<string, string> = {
    Type1: "Blazor / .NET",
    Type2: "React",
    Type3: "Angular",
  };

  const getButtonType = (nombre: string) => {
    const isActive = activeTypeButton === nombre;
    return `
      flex flex-col items-center rounded-medium py-3 px-7 border-2 font-semibold cursor-pointer duration-300 gap-1 text-white p-3 border-2 font-medium text-sm cursor-pointer
      ${
        isActive
          ? "border-primary-blue-700 bg-primary-blue-700"
          : "hover:bg-primary-blue-700 hover:border-primary-blue-700 border-primary-blue-600 bg-primary-blue-600"
      }
    `;
  };

  const handleCopy = (paso: string, text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(paso);
        setTimeout(() => setCopied(null), 1500);
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
      });
  };

  const guias: Record<
    string,
    Array<{
      title: string;
      steps: Array<{
        description?: string;
        code?: string;
        codeId?: string;
        link?: string;
      }>;
    }>
  > = {
    Type1: [
      {
        title: "Instalar dependencias",
        steps: [
          {
            description:
              'Instalar TailwindCSS versión 4.1. (Link de referencia: <a class="text-blue-700" href="https://tailwindcss.com/docs/installation/tailwind-cli" target="_blank">Web Oficial</a>)',
            code: `npm install tailwindcss @tailwindcss/cli`,
            codeId: "install",
          },
          {
            description:
              `Token de seguridad: Crear un archivo <strong class="text-primary-blue-500 font-bold">.npmrc</strong> en la raiz de su proyecto, al nivel de su package.json y pegar el contenido`,
            code: `@luwy-dyro:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=NPM_TOKEN`,
            codeId: "npmrc",
          },
          {
            description: "Instalar Tokens y Ui Componentes TI-CSF version 1",
            code: `npm install @luwy-dyro/tokens @luwy-dyro/ui`,
            codeId: "install2",
          },
        ],
      },
      {
        title: "Configure Tailwind CSS",
        steps: [
          {
            description: `Abrir su archivo CSS principal de la siguiente ruta <strong class="text-primary-blue-500 font-bold">wwwroot/app.css</strong> o la que usa como CSS principal. Copiar y pegar la importación`,
            code: `@import "@luwy-dyro/tokens/css/preset.css";
@import "tailwindcss";
@import "@luwy-dyro/ui/styles";`,
            codeId: "tailwind",
          },
        ],
      },
      {
        title: "Tailwind CLI build process",
        steps: [
          {
            description:
          `Correr en el terminal del proyecto el CLI para escanear los recursos de clases y desplegar en CSS`,
            code: `npx @tailwindcss/cli -i ./wwwroot/app.css -o ./wwwroot/output.css --watch`,
            codeId: "build",
          },
          {
            description:
          `Agregar el llamado al output.css en el App.razor o _Layout.cshtml o en el file donde se hace los llamados "&lthead>... &lthead/>"`,
            code: `<link href="./output.css" rel="stylesheet"></link>`,
            codeId: "build2",
          },
        ],
      },
    ],

    Type2: [
      {
        title: "Instalar dependencias entorno VITE",
        steps: [
          {
            description:
              'Instalar TailwindCSS versión 4.1. (Link de referencia: <a class="text-blue-700" href="https://tailwindcss.com/docs/installation/tailwind-cli" target="_blank">Web Oficial</a>)',
            code: `npm install tailwindcss @tailwindcss/vite`,
            codeId: "install",
          },
          {
            description:
              `Token de seguridad: Crear un archivo <strong class="text-primary-blue-500 font-bold">.npmrc</strong> en la raiz de su proyecto, al nivel de su package.json y pegar el contenido`,
            code: `@luwy-dyro:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=NPM_TOKEN`,
            codeId: "npmrc",
          },
          {
            description: "Instalar Tokens y Ui Componentes TI-CSF version 1",
            code: `npm install @luwy-dyro/tokens @luwy-dyro/ui`,
            codeId: "install2",
          },
        ],
      },
      {
        title: "Configure Tailwind CSS",
        steps: [
          {
            description: `Abrir su archivo CSS principal <strong class="text-primary-blue-500 font-bold">index.css</strong>. Copiar y pegar la importación`,
            code: `@import "@luwy-dyro/tokens/css/preset.css";
@import "tailwindcss";
@import "@luwy-dyro/ui/styles";`,
            codeId: "tailwind",
          },
        ],
      },
      {
        title: "Vite Configuration",
        steps: [
          {
            description:
          `En la configuración de vite, por lo general este archivo: vite.config.ts Importar el plugin`,
            code: `import tailwindcss from '@tailwindcss/vite'`,
            codeId: "build",
          },
          {
            description:
          `Agregar el llamado al TailwindCSS en plugins: [tailwindcss(), ]"`,
            code: `tailwindcss(),`,
            codeId: "build2",
          },
        ],
      },
    ],
    Type3: [
      {
        title: "Instalar dependencias",
        steps: [
          {
            description:
              'Instalar TailwindCSS versión 4.1. (Link de referencia: <a class="text-blue-700" href="https://tailwindcss.com/docs/installation/framework-guides/angular" target="_blank">Web Oficial</a>)',
            code: `npm install tailwindcss @tailwindcss/postcss postcss --force`,
            codeId: "install",
          },
          {
            description:
              `Token de seguridad: Crear un archivo <strong class="text-primary-blue-500 font-bold">.npmrc</strong> en la raiz de su proyecto, al nivel de su package.json y pegar el contenido`,
            code: `@luwy-dyro:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=NPM_TOKEN`,
            codeId: "npmrc",
          },
          {
            description: "Instalar Tokens y Ui Componentes TI-CSF version 1",
            code: `npm install @luwy-dyro/tokens @luwy-dyro/ui`,
            codeId: "install2",
          },
        ],
      },
      {
        title: "Configure Tailwind CSS",
        steps: [
          {
            description: `Abrir su archivo CSS principal <strong class="text-primary-blue-500 font-bold">app.css</strong> o en el archivo CSS principal de su proyecto. Copiar y pegar la importación`,
            code: `@import "@luwy-dyro/tokens/css/preset.css";
@import "tailwindcss";
@import "@luwy-dyro/ui/styles";`,
            codeId: "tailwind",
          },
        ],
      },
      {
        title: "Configure PostCSS Plugins",
        steps: [
          {
            description:
          `Crear un archivo .postcssrc.json en la raiz principal del proyecto, importar el plugin. Copiar y pegar `,
            code: `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`,
            codeId: "build",
          },
          
        ],
      },
    ],
  };

  return (
    <div>
      <div className="pb-5 ">
        <p className="text-xl/6 text-primary-blue-600 font-normal mt-2 text-left">
          Todo lo que los desarrolladores necesitan para implementar el sistema
          de diseño en sus proyectos.
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 grid-rows-3 pb-15 pt-8 gap-6">
        <button
          className={getButtonType("Type1")}
          onClick={() => setActiveTypeButton("Type1")}
        >
          <span className="block h-6 w-6">
            <MonitorCog />
          </span>
          {typeLabels["Type1"]}
        </button>
        <button
          className={getButtonType("Type2")}
          onClick={() => setActiveTypeButton("Type2")}
        >
          <span className="block h-6 w-6">
            <Atom />
          </span>
          {typeLabels["Type2"]}
        </button>
        <button
          className={getButtonType("Type3")}
          onClick={() => setActiveTypeButton("Type3")}
        >
          <span className="block h-6 w-6">
           <Pyramid />
          </span>
          {typeLabels["Type3"]}
        </button>
      </section>
      <div className="relative w-full">
        <button
          onClick={() => toggleSection("guia")}
          className="flex items-center justify-between bg-primary-blue-600 px-6 py-4 rounded-small mb-10 w-full"
        >
          <h3 className="text-2xl font-semibold text-white">
            Guía de instalación -{" "}
            {activeTypeButton ? typeLabels[activeTypeButton] : "Component"}
          </h3>
          <ChevronDown
            className={`h-6 w-6 text-white transition-transform duration-200 ${
              open.includes("guia") ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {open.includes("guia") && (
        <section className="animate-slideDown">
          {guias[activeTypeButton]?.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`flex flex-col justify-between mb-${
                sectionIndex === guias[activeTypeButton].length - 1 ? "20" : "7"
              }`}
            >
              <div className="flex flex-row items-center justify-between gap-6 border-2 rounded-t-medium p-6 bg-primary-blue-600 border-primary-blue-600">
                <strong className="text-xl font-medium text-white">
                  {section.title}
                </strong>
                <span className="flex items-center justify-center w-10 h-10 bg-white rounded-small">
                  <Calendar className="shrink-0 w-4 text-primary-blue-600" />
                </span>
              </div>

              <div className="flex flex-col border-t-0 border-2 rounded-b-medium p-6 border-primary-green-600">
                {section.steps?.map((step, stepIndex) => (
                  <div key={stepIndex} className="mb-8 last:mb-0">
                    {step.description && (
                      <p
                        className="mb-5"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    )}
                    {step.code && (
                      <div className="relative border-2 rounded-medium p-6 pr-12 bg-primary-green-50 border-primary-green-200 w-full">
                        {step.codeId && (
                          <div className="right-3 top-3 absolute">
                            <button
                              className="p-1"
                              onClick={() =>
                                handleCopy(step.codeId!, step.code!)
                              }
                            >
                              {copied === step.codeId ? (
                                <Check className="text-primary-green-700 duration-100" />
                              ) : (
                                <ClipboardList className="hover:text-primary-green-700 text-primary-green-500 duration-100" />
                              )}
                              {copied === step.codeId && (
                                <span className="absolute -top-5 -left-4 text-xs font-semibold bg-primary-green-600 text-white px-2 py-1 rounded-medium shadow-md animate-fade-in">
                                  Copiado
                                </span>
                              )}
                            </button>
                          </div>
                        )}
                        <code className="text-primary-blue-600 text-base whitespace-pre-wrap text-wrap">
                          {step.code}
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
      <section className="mt-5">
        <strong className="text-2xl font-semibold text-primary-green-600 mb-6 block">
          Integración API de Figma
        </strong>
        <p className="text-xl font-normal text-primary-blue-500">
          Este sistema de diseño se sincroniza automáticamente con el archivo
          Figma mediante webhooks y la API de Figma. Así es como funciona la
          integración:
        </p>
        <div className="grid grid-rows-2 md:grid-rows-1 gap-6 md:grid-cols-[2fr_1.4fr] mt-7">
          <div className="p-6 rounded-medium border-primary-green-600 border-2">
            <strong className="text-xl font-medium text-primary-blue-500 mb-7 block">
              Actualizaciones automáticas
            </strong>
            <ul className="body text-primary-blue-600 mb-4 list-disc list-inside pl-2 gap-2">
              <li className="mb-3">
                Sincronización en tiempo real cuando cambian los tokens de
                diseño
              </li>
              <li className="mb-3">
                Las actualizaciones de componentes se reflejan inmediatamente
              </li>
              <li className="mb-3">
                Los cambios de estilo se propagaron a la documentación.
              </li>
              <li>Control de versiones para cambios de diseño.</li>
            </ul>
          </div>
          <div className="p-6 rounded-medium border-primary-green-600 border-2">
            <strong className="text-xl font-medium text-primary-blue-500 mb-7 block">
              Beneficios para desarrolladores
            </strong>
            <ul className="body  text-primary-blue-600 mb-4 list-disc list-inside pl-2">
              <li className="mb-3">Tokens de diseño siempre actualizados</li>
              <li className="mb-3">Sincronización manual reducida</li>
              <li className="mb-3">
                Alineación del flujo de trabajo de diseño y desarrollo
              </li>
              <li>Generación automática de códigos</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
