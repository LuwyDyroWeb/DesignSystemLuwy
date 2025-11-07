import { ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";
import colors from "./colors.json";

interface Props {
  bgClass: string;
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
}




const CardColor = ({ name, bgClass, hex, rgb, cmyk }: Props) => {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-medium p-4 shadow-sm">
      <div className={`${bgClass} h-36 rounded-small`}></div>

      <div className="flex justify-start gap-2 mt-1">
        <span className="text-primary-green-600 text-lg font-medium">
          {name}
        </span>
        <span className="flex items-center justify-center w-6 h-6 bg-primary-blue-600 rounded-sm">
          <Calendar className="shrink-0 w-3 text-white" />
        </span>
      </div>

      <div className="mb-1.5">
        <p className="text-primary-blue-600 text-xs mb-1">Código: {hex}</p>
        <p className="text-primary-blue-600 text-xs mb-1">RGB: {rgb}</p>
        <p className="text-primary-blue-600 text-xs mb-1">CMYK: {cmyk}</p>
      </div>
      <button className="w-full bg-neutro-black-50 text-neutro-black-300 rounded-sm font-semibold">
        Text
      </button>
    </div>
  );
};

export const ColorsPage = () => {
  const [open, setOpen] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
  setOpen((prev) =>
    prev.includes(sectionName)
      ? prev.filter((name) => name !== sectionName)
      : [...prev, sectionName]
  );
};

  return (
    <div>
      <div className="pb-5">
        <p className="text-xl/6 text-primary-blue-600 font-normal mt-2 text-left">
          Lista completa de todos los tokens de diseño con valores y pautas de
          uso del sistema de diseño.
        </p>
      </div>
      <section>
        <div className="relative w-full">
          <button
            onClick={() => toggleSection("primary")}
            className="flex items-center justify-between bg-primary-blue-600 px-6 py-4 rounded-small mb-10 w-full"
          >
            <h3 className="text-2xl font-semibold text-white">Primary</h3>
            <ChevronDown
              className={`h-6 w-6 text-white transition-transform duration-200 ${
                open.includes("primary") ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {open.includes("primary") && (
            <section className="animate-slideDown pb-16 flex flex-col divide-y-2 divide-dashed divide-primary-blue-600">
            <div className="grid grid-cols-5 pb-6 gap-6">
              {colors.primary.blue.map((color, index) => (
                <CardColor key={index} {...color} />
              ))}
            </div>
            <div className="grid grid-cols-5 pt-6 gap-6">
              {colors.primary.green.map((color, index) => (
                <CardColor key={index} {...color} />
              ))}
            </div>
          </section>
        //   <section className="animate-slideDown animate-slideDown pb-16 flex flex-col divide-y-2 divide-dashed divide-primary-blue-600">
        //     {Object.entries(colors.primary).map(([name, colorList]) => (
        //       <div className="grid grid-cols-5 py-6 gap-6">
        //         {(colorList as any[]).map((color, index) => (
        //           <CardColor key={index} {...color} />
        //         ))}
        //       </div>
        //     ))}
        //   </section>
        )}
      </section>
      <section>
        <div className="relative w-full">
          <button
            onClick={() => toggleSection("alert")}
            className="flex items-center justify-between bg-primary-blue-600 px-6 py-4 rounded-small mb-10 w-full"
          >
            <h3 className="text-2xl font-semibold text-white">Alert</h3>
            <ChevronDown
              className={`h-6 w-6 text-white transition-transform duration-200 ${
                open.includes("alert")? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {open.includes("alert") && (
          <section className="animate-slideDown">
            <div className="grid grid-cols-5 pb-16 gap-6">
              {colors.alert.map((color, index) => (
                <CardColor key={index} {...color} />
              ))}
            </div>
          </section>
        )}
      </section>
      <section>
        <div className="relative w-full">
          <button
            onClick={() => toggleSection("neutro")}
            className="flex items-center justify-between bg-primary-blue-600 px-6 py-4 rounded-small mb-10 w-full"
          >
            <h3 className="text-2xl font-semibold text-white">Neutro</h3>
            <ChevronDown
              className={`h-6 w-6 text-white transition-transform duration-200 ${
                open.includes("neutro") ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {open.includes("neutro") && (
          <section className="animate-slideDown">
            <div className="grid grid-cols-5 pb-16 gap-6">
              {colors.neutro.map((color, index) => (
                <CardColor key={index} {...color} />
              ))}
            </div>
          </section>
        )}
      </section>
      <section className="mt-5">
        <strong className="text-2xl font-semibold text-primary-green-600 mb-9 block">
          Guía de uso de colores
        </strong>
        <div className="grid grid-rows-3 md:grid-rows-1 gap-6 md:grid-cols-3 mt-7">
          <div className="p-6 rounded-medium border-primary-green-600 border-2">
            <strong className="text-xl font-medium text-primary-blue-500 mb-5 block">
              Primary Brand Colors
            </strong>
            <ul className="body text-primary-blue-600 list-disc list-inside pl-2 gap-2">
              <li className="mb-3">
                Jerarquía clara: utilice niveles de encabezado consistentes para
                crear una jerarquía de información clara
              </li>
              <li className="mb-3">
                Flujo lógico: no omita los niveles de encabezado (h1 → h2 → h3,
                no h1 → h3)
              </li>
              <li>
                Espaciado consistente: mantenga márgenes y relleno consistentes
                entre elementos de texto
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-medium border-primary-green-600 border-2">
            <strong className="text-xl font-medium text-primary-blue-500 mb-5 block">
              Alert Color System
            </strong>
            <ul className="body  text-primary-blue-600 list-disc list-inside pl-2">
              <li className="mb-3">
                Longitud de línea: mantenga la longitud de línea entre 45 y 75
                caracteres para una legibilidad óptima
              </li>
              <li className="mb-3">
                Contraste: garantiza una relación de contraste mínima de 4,5:1
                para texto normal
              </li>
              <li>
                Tamaño de fuente: nunca utilice texto de menos de 12 píxeles
                para el contenido del cuerpo
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-medium border-primary-green-600 border-2">
            <strong className="text-xl font-medium text-primary-blue-500 mb-5 block">
              Neutro Color
            </strong>
            <ul className="body  text-primary-blue-600 list-disc list-inside pl-2">
              <li className="mb-3">
                Longitud de línea: mantenga la longitud de línea entre 45 y 75
                caracteres para una legibilidad óptima
              </li>
              <li className="mb-3">
                Contraste: garantiza una relación de contraste mínima de 4,5:1
                para texto normal
              </li>
              <li>
                Tamaño de fuente: nunca utilice texto de menos de 12 píxeles
                para el contenido del cuerpo
              </li>
            </ul>
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
              <img
                src="../home/Back-Start-1.jpg"
                alt="Paso 1"
                className="h-46 min-w-full "
              />
            </div>
            <div className="p-6 ">
              <b className="text-primary-blue-600 text-lg font-medium">
                WCAG AA Compliance
              </b>
              <p className="text-primary-blue-600">
                All color combinations meet WCAG 2.1 AA standards with a minimum
                contrast ratio of 4.5:1 for normal text and 3:1 for large text.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-large overflow-auto shadow-lg">
            <div className="min-w-full flex justify-center items-center ">
              <img
                src="../home/Back-Start-1.jpg"
                alt="Paso 1"
                className="h-46 min-w-full "
              />
            </div>
            <div className="p-6 ">
              <b className="text-primary-blue-600 text-lg font-medium">
                Color Blindness
              </b>
              <p className="text-primary-blue-600">
                Colors are tested for accessibility across different types of
                color vision deficiencies and never rely solely on color to
                convey information.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-large overflow-auto shadow-lg">
            <div className="min-w-full flex justify-center items-center ">
              <img
                src="../home/Back-Start-1.jpg"
                alt="Paso 1"
                className="h-46 min-w-full "
              />
            </div>
            <div className="p-6 ">
              <b className="text-primary-blue-600 text-lg font-medium">
                High Contrast
              </b>
              <p className="text-primary-blue-600">
                Dark mode variants provide enhanced contrast for users who
                prefer or require high-contrast interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
