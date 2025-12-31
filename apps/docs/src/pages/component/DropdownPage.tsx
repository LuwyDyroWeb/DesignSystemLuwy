import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

import Dropdown, {
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "./DropdownComp";

export const DropdownPage = () => {
  const DROPDOWN_EXAMPLE_BASIC_REACT = `import Dropdown, { DropdownContent, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from "@luwydyroweb/ui";
  
<Dropdown>
  <DropdownToggle label="Seleccionar Opción" />
  <DropdownMenu>
    <DropdownContent>Dropdown</DropdownContent>
    <DropdownDivider />
    <DropdownItem>Item 1</DropdownItem>
    <DropdownItem>Item 2</DropdownItem>
  </DropdownMenu>
</Dropdown>`;

  const [exampleBasic, setExampleBasic] = useState<"react" | "html">("react");

  const DROPDOWN_EXAMPLE_BASIC =
    exampleBasic === "react" ? DROPDOWN_EXAMPLE_BASIC_REACT : "";

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl text-white font-bold">Dropdown</div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-white">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4 text-primary-blue-600">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl text-white">Uso Básico</span>
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
            <div className=" w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-col items-center gap-4 py-2">
                <Dropdown>
                  <DropdownToggle label="Seleccionar Opción" />
                  <DropdownMenu>
                    <DropdownContent>Dropdown</DropdownContent>
                    <DropdownDivider />
                    <DropdownItem>Item 1</DropdownItem>
                    <DropdownItem>Item 2</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <CodeBlock
                code={DROPDOWN_EXAMPLE_BASIC}
                language={exampleBasic === "react" ? "tsx" : "html"}
                copyId="accordion-basic"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
