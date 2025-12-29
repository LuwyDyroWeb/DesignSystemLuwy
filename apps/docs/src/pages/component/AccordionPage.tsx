import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

import { Accordion, AccordionItem } from "./AccordionComp";

export const AccordionPage = () => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at leo eleifend, rutrum ligula vitae, congue turpis. Donec dignissim leo iaculis justo viverra, sit amet iaculis quam mollis. Ut auctor feugiat leo quis viverra. Pellentesque posuere augue sit amet diam volutpat, sed pharetra nunc tristique. Aliquam sollicitudin augue neque, vitae interdum mi molestie quis. Mauris vestibulum neque quis mi consectetur, vitae luctus neque bibendum.";

  const ACCORDION_EXAMPLE_BASIC_REACT = `import { Accordion, AccordionItem } from '@luwydyroweb/ui';
  
<Accordion>
  <AccordionItem id="item1" title="Item 1">
    {...}
  </AccordionItem>
  <AccordionItem id="item2" title="Item 2">
    {...}
  </AccordionItem>
</Accordion>`;

  const ACCORDION_EXAMPLE_NESTED_REACT = `import { Accordion, AccordionItem } from '@luwydyroweb/ui';
  
<Accordion>
  <AccordionItem id="item1" title="Item 1">
    <Accordion>
      <AccordionItem id="item1.1" title="Item 1.1">
        {...}
      </AccordionItem>
      <AccordionItem id="item1.2" title="Item 1.2">
        {...}
      </AccordionItem>
    </Accordion>
  </AccordionItem>
  <AccordionItem id="item2" title="Item 2">
    {...}
  </AccordionItem>
</Accordion>`;
  const ACCORDION_EXAMPLE_ICONS_REACT = `import { Accordion, AccordionItem } from '@luwydyroweb/ui';
  
<Accordion>
  <AccordionItem id="item1" title="Default" sign="plus">
    {...}
  </AccordionItem>
  <AccordionItem id="item2" title="Flecha" sign="arrow">
    {...}
  </AccordionItem>
  <AccordionItem id="item3" title="Sin icono" sign="no">
    {...}
  </AccordionItem>
  <AccordionItem id="item4" title="SVG Perzonalizado" sign={<SlidersHorizontal/>}>
    {...}
  </AccordionItem>
</Accordion>`;

  const [exampleBasic, setExampleBasic] = useState<"react" | "html">("react");
  const [exampleNested, setExampleNested] = useState<"react" | "html">("react");
  const [exampleIcons, setExampleIcons] = useState<"react" | "html">("react");

  const ACCORDION_EXAMPLE_BASIC =
    exampleBasic === "react" ? ACCORDION_EXAMPLE_BASIC_REACT : "";
  const ACCORDION_EXAMPLE_NESTED =
    exampleNested === "react" ? ACCORDION_EXAMPLE_NESTED_REACT : "";
  const ACCORDION_EXAMPLE_ICONS =
    exampleIcons === "react" ? ACCORDION_EXAMPLE_ICONS_REACT : "";

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl text-white font-bold">Accordion</div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-white">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4 text-primary-blue-600">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Uso Básico</span>
              <code className="text-primary-bluedark-200">Children</code>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-smext-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  exampleBasic === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setExampleBasic("react")}
              >
                React
              </button>
              {/* <button
              className={`py-1 px-2 rounded-md text-white duration-300 ${exampleBasic === "html" ? "bg-primary-blue-600" : ""}`}
              onClick={() => setExampleBasic("html")}
            >
              HTML
            </button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-col items-center gap-4 py-2">
                <Accordion>
                  <AccordionItem id="item1" title="Item 1">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item2" title="Item 2">
                    {loremIpsum}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <CodeBlock
                code={ACCORDION_EXAMPLE_BASIC}
                language={exampleBasic === "react" ? "tsx" : "html"}
                copyId="accordion-basic"
              />
            </div>
          </div>
        </div>

        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-white">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4 text-primary-blue-600">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Accordion Anidado</span>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-smext-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  exampleNested === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setExampleNested("react")}
              >
                React
              </button>
              {/* <button
              className={`py-1 px-2 rounded-md text-white duration-300 ${exampleNested === "html" ? "bg-primary-blue-600" : ""}`}
              onClick={() => setExampleNested("html")}
            >
              HTML
            </button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-col items-center gap-4 py-2">
                <Accordion>
                  <AccordionItem id="item1" title="Item 1">
                    <Accordion>
                      <AccordionItem id="item1.1" title="Item 1.1">
                        {loremIpsum}
                      </AccordionItem>
                      <AccordionItem id="item1.2" title="Item 1.2">
                        {loremIpsum}
                      </AccordionItem>
                    </Accordion>
                  </AccordionItem>
                  <AccordionItem id="item2" title="Item 2">
                    {loremIpsum}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <CodeBlock
                code={ACCORDION_EXAMPLE_NESTED}
                language={exampleNested === "react" ? "tsx" : "html"}
                copyId="accordion-Nested"
              />
            </div>
          </div>
        </div>

        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-white">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4 text-primary-blue-600">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Íconos</span>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-smext-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  exampleIcons === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setExampleIcons("react")}
              >
                React
              </button>
              {/* <button
              className={`py-1 px-2 rounded-md text-white duration-300 ${exampleIcons === "html" ? "bg-primary-blue-600" : ""}`}
              onClick={() => setExampleIcons("html")}
            >
              HTML
            </button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-col items-center gap-4 py-2">
                <Accordion>
                  <AccordionItem id="item1" title="Default" sign="plus">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item2" title="Flecha" sign="arrow">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item3" title="Sin icono" sign="no">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem
                    id="item4"
                    title="SVG Perzonalizado"
                    sign={<SlidersHorizontal />}
                  >
                    {loremIpsum}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <CodeBlock
                code={ACCORDION_EXAMPLE_ICONS}
                language={exampleIcons === "react" ? "tsx" : "html"}
                copyId="accordion-Nested"
              />
            </div>
          </div>
        </div>

        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-white">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4 text-primary-blue-600">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Posición del Ícono</span>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-smext-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  exampleIcons === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setExampleIcons("react")}
              >
                React
              </button>
              {/* <button
              className={`py-1 px-2 rounded-md text-white duration-300 ${exampleIcons === "html" ? "bg-primary-blue-600" : ""}`}
              onClick={() => setExampleIcons("html")}
            >
              HTML
            </button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-col items-center gap-4 py-2">
                <Accordion>
                  <AccordionItem id="item1" title="Default" sign="plus">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item2" title="Flecha" sign="arrow">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item3" title="Sin icono" sign="no">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem
                    id="item4"
                    title="SVG Perzonalizado"
                    sign={<SlidersHorizontal />}
                  >
                    {loremIpsum}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <CodeBlock
                code={ACCORDION_EXAMPLE_ICONS}
                language={exampleIcons === "react" ? "tsx" : "html"}
                copyId="accordion-Nested"
              />
            </div>
          </div>
        </div>

        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-white">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4 text-primary-blue-600">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Colores</span>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-smext-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  exampleIcons === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setExampleIcons("react")}
              >
                React
              </button>
              {/* <button
              className={`py-1 px-2 rounded-md text-white duration-300 ${exampleIcons === "html" ? "bg-primary-blue-600" : ""}`}
              onClick={() => setExampleIcons("html")}
            >
              HTML
            </button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-col items-center gap-4 py-2">
                <Accordion>
                  <AccordionItem id="item1" title="primary" color="primary">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item2" title="secondary" color="secondary">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item3" title="error" color="error">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item4" title="info" color="info">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item5" title="warning" color="warning">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item6" title="success" color="success">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item7" title="white" color="white">
                    {loremIpsum}
                  </AccordionItem>
                  <AccordionItem id="item8" title="black" color="black">
                    {loremIpsum}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <CodeBlock
                code={ACCORDION_EXAMPLE_ICONS}
                language={exampleIcons === "react" ? "tsx" : "html"}
                copyId="accordion-Nested"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
