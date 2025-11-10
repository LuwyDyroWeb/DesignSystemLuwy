import { Calendar, ClipboardList, Check } from "lucide-react";
import { useState } from "react";
import { Button, ButtonIcon, type ButtonProps } from "@luwy-dyro/ui";
import { SelectState } from "./Select";

type Color = {
  name: ButtonProps["variant"];
  colorClass: string;
};

type Props = {
  type: string;
  config: {
    style: ButtonProps["buttonStyle"];
    color: ButtonProps["variant"];
    size: ButtonProps["size"];
    state: string;
  };
  onChange: (newConfig: Props["config"]) => void;
};

const ConfiguratorButton = ({ type, config, onChange }: Props) => {
  const { style, color, size, state } = config;
  const [activeCodeButton, setActiveCodeButton] = useState("HTML");
  const [copied, setCopied] = useState(false);

  const sizeClassMap: Record<NonNullable<ButtonProps["size"]>, string> = {
    tiny: "btn--sm",
    small: "btn--md",
    medium: "btn--lg",
    giant: "btn--xl",
  };
  const cssSizeClass = sizeClassMap[size || "small"];

  const styles: ButtonProps["buttonStyle"][] = ["filled", "outline", "clear"];
  const cssStyleClass =
    style === "outline"
      ? " btn--outline"
      : style === "clear"
      ? " btn--clear"
      : "";

  const isLoading = state === "loading";
  const isDisabled = state === "disabled";
  const loadingClass = isLoading ? " btn--loading" : "";
  // ------------------------------------------

  const sizes: ButtonProps["size"][] = ["tiny", "small", "medium", "giant"];

  const colors: Color[] = [
    { name: "primary-blue", colorClass: "bg-primary-blue-600" },
    { name: "primary-green", colorClass: "bg-primary-green-500" },
    { name: "secondary", colorClass: "bg-neutro-black-600" },
    { name: "error", colorClass: "bg-alert-error-600" },
    { name: "info", colorClass: "bg-alert-info-600" },
    { name: "warning", colorClass: "bg-alert-warning-600" },
    { name: "success", colorClass: "bg-alert-success-600" },
    { name: "neutro-white", colorClass: "bg-neutro-white-700" },
    { name: "neutro-black", colorClass: "bg-neutro-black-600" },
  ];

  const estados =
  type === "Type3"
    ? ["Grupo de 2", "Grupo de 3", "Grupo de 4", "Grupo de 5"]
    : ["default", "disabled", "loading"];

  const handleStyleChange = (newStyle: ButtonProps["buttonStyle"]) =>
    onChange({ ...config, style: newStyle });

  const handleColorChange = (newColor: ButtonProps["variant"]) =>
    onChange({ ...config, color: newColor });

  const handleSizeChange = (newSize: ButtonProps["size"]) =>
    onChange({ ...config, size: newSize });

  const handleStateChange = (newState: string) =>
    onChange({ ...config, state: newState });

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
      });
  };
  const groupCount = parseInt(state.replace("Grupo de ", "")) || 2;

  const reactCodeType: Record<string, string> = {
    Type1: `<Button variant="${color}" size="${size}" buttonStyle="${style}"${
      isDisabled ? " disabled" : ""
    }${isLoading ? " isLoading" : ""}>${isLoading ? "" : "Button"}</Button>`,

    Type2: `<ButtonIcon variant="${color}" size="${size}" buttonStyle="${style}"${
      isDisabled ? " disabled" : ""
    }${isLoading ? " isLoading" : ""} iconPosition="left">${
      isLoading ? "" : "Button"
    }</ButtonIcon>`,

    Type3: `<section className="flex text-center gap-1 grid-rows-1 grid-cols-${groupCount}">
${Array.from({ length: groupCount })
  .map(
    () =>
      `  <Button variant="${color}" size="${size}" buttonStyle="${style}">Button</Button>`
  )
  .join("\n")}
</section>`,
  };
  
  const htmlCodeType: Record<string, string> = {
    Type1: `<button class="btn btn--weight-regular ${cssSizeClass} btn--${color}${cssStyleClass}${loadingClass}" ${
      isDisabled ? "disabled" : ""
    }>${isLoading ? "" : "Button"}</button>`,

    Type2: `  <button class="btn btn--weight-regular ${cssSizeClass} btn--${color}${cssStyleClass}${loadingClass}" ${
      isDisabled ? "disabled" : ""
    }>
    ${
      isLoading
        ? ""
        : `<span class="btn_icon btn_icon--left">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor" />
        </svg>
    </span>
    <span class="btn_label">Button</span>`
    }
  </button>`,
      Type3: `<section className="flex text-center gap-1 grid-rows-1 grid-cols-${groupCount}">
${Array.from({ length: groupCount })
  .map(
    () =>
      `  <button class="btn btn--weight-regular ${cssSizeClass} btn--${color}${cssStyleClass}">Button</button>`
  )
  .join("\n")}
</section>`,
  };
  const reactCode = reactCodeType[type] || reactCodeType["Type1"];
  const htmlCode = htmlCodeType[type] || htmlCodeType["Type1"];

  const getStyleButtonClasses = (
    name: ButtonProps["buttonStyle"],
    index: number,
    total: number
  ) => {
    const base = "px-6 py-4 border-primary-green-600 cursor-pointer";
    const active = style === name ? "bg-primary-green-200" : "bg-white";

    let radius = "";
    if (total === 1) {
      // radius = "border-2 rounded-medium";
      radius = "border-y-2";
    } else if (index === 0) {
      radius = "border-2 rounded-l-medium";
    } else if (index === total - 1) {
      radius = "border-2 rounded-r-medium";
    } else {
      radius = "border-y-2";
    }

    return `${base} ${active} ${radius}`;
  };

  const getButtonCode = (nombre: string) => {
    const isActive = activeCodeButton === nombre;
    const baseClasses =
      "flex flex-col items-center rounded-small py-2 px-7 border-2 font-semibold text-xl cursor-pointer duration-200";
    let activeClasses = "";

    if (isActive) {
      if (nombre === "HTML") {
        activeClasses = "bg-[#F54927] text-white border-[#F54927]";
      } else if (nombre === "React") {
        activeClasses = "bg-[#00D8FF] text-white border-[#00D8FF]";
      }
    } else {
      activeClasses = "bg-white text-primary-blue-600";
    }
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <>
        <section className={`grid grid-cols-3 text-center`}>
          {styles.map((name, index) => (
            <button
              key={name}
              className={getStyleButtonClasses(name, index, styles.length)}
              onClick={() => handleStyleChange(name)}
            >
              <strong className="text-base font-medium text-primary-green-600 capitalize">
                {name}
              </strong>
            </button>
          ))}
        </section>
      <section className="grid grid-cols-1 xl:grid-cols-[2.1fr_1fr] xl:grid-rows-1 grid-row-2 mt-6 gap-6 ">
        <div className="flex flex-col">
          <div className="border-2 rounded-t-medium p-6 bg-primary-blue-600 border-primary-blue-600">
            <strong className="text-xl font-medium text-white">
              Propiedades personalizadas de CSS
            </strong>
          </div>
          <div className="border-2 border-t-0  rounded-b-medium p-6 border-primary-green-600">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-1 grid-row-2 gap-4">
              <div>
                <div className="border-2 text-center rounded-t-medium p-2 bg-primary-blue-600 border-primary-blue-600">
                  <strong className="text-base font-semibold text-white">
                    Title
                  </strong>
                </div>
                <div className="border-2 border-t-0 rounded-b-medium border-primary-blue-600">
                  <div className="flex bg-primary-blue-50 items-center justify-center p-6">
                    {(() => {
                      switch (type) {
                        case "Type1":
                          return (
                            <Button
                              variant={color}
                              size={size}
                              buttonStyle={style}
                              disabled={state === "disabled"}
                              isLoading={state === "loading"}
                            >
                              Button
                            </Button>
                          );

                        case "Type2":
                          return (
                            <ButtonIcon
                              variant={color}
                              size={size}
                              buttonStyle={style}
                              disabled={state === "disabled"}
                              icon
                              isLoading={state === "loading"}
                              iconPosition="left"
                            >
                              Button
                            </ButtonIcon>
                          );

                        case "Type3":
                          return (
                            <Button
                              variant={color}
                              size={size}
                              buttonStyle={style}
                            >
                              Button
                            </Button>
                          );
                      }
                    })()}
                  </div>
                  <div className="flex flex-col gap-6 p-6 items-center">
                    <SelectState
                      value={state}
                      onChange={handleStateChange}
                      options={estados}
                    />
                    <div className="grid grid-cols-1 2xl:grid-cols-2 grid-rows-2 2xl:grid-rows-1 w-full gap-y-2 divide-x-0 2xl:divide-x divide-primary-blue-600">
                      <div className="px-0 md:px-4 pb-0">
                        <strong className="text-xs text-primary-blue-600 font-semibold">
                          Size
                        </strong>
                        <div className="flex gap-3">
                          {sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSizeChange(s)}
                              className={` flex items-center justify-center min-w-6 min-h-6 border border-primary-blue-600 rounded cursor-pointer hover:bg-primary-blue-200
                                          ${
                                            size === s
                                              ? "bg-primary-blue-100"
                                              : "bg-white"
                                          }
                                        `}
                              aria-label={`Tamaño ${s}`}
                              title={`${s}`.toUpperCase()}
                            >
                              <Calendar className="shrink-0 w-3 text-primary-blue-600" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="px-0 md:px-4 md:pb-0">
                        <strong className="text-xs text-primary-blue-600 font-semibold">
                          Color
                        </strong>
                        <div className="flex flex-wrap gap-3">
                          {colors.map(({ name, colorClass }) => (
                            <button
                              key={name}
                              onClick={() => handleColorChange(name)}
                              className={`flex items-center justify-center w-6 h-6 rounded-large border transition-colors duration-200
                                 ${
                                   color === name
                                     ? "border-primary-blue-600"
                                     : "border-neutral-200"
                                 } `}
                              aria-label={`Color ${name}`}
                            >
                              <div
                                className={`rounded-large h-3 w-3 ${colorClass}`}
                              ></div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-2 w-full">
                      <button
                        className={getButtonCode("HTML")}
                        onClick={() => setActiveCodeButton("HTML")}
                      >
                        HTML
                      </button>
                      <button
                        className={getButtonCode("React")}
                        onClick={() => setActiveCodeButton("React")}
                      >
                        React
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-2 rounded-medium p-6 pt-10  border-primary-green-200">
                {activeCodeButton === "React" && (
                  <code className="block text-primary-blue-600 text-base whitespace-normal mb-7">
                    {(() => {
                      switch (type) {
                        case "Type1":
                          return `import { Button } from "@luwy-dyro/ui";`;
                        case "Type2":
                          return `import { ButtonIcon } from "@luwy-dyro/ui";`;
                        case "Type3":
                          return `import { Button } from "@luwy-dyro/ui";`;
                      }
                    })()}
                  </code>
                )}
                <div className="relative border-2 rounded-medium p-6 pt-13 bg-primary-green-50 border-primary-green-200">
                  <div className="right-3 top-3 absolute">
                    <button
                      className="p-1"
                      onClick={() =>
                        handleCopy(
                          activeCodeButton === "React" ? reactCode : htmlCode
                        )
                      }
                    >
                      {copied ? (
                        <Check className="text-primary-green-700 duration-100" />
                      ) : (
                        <ClipboardList className="hover:text-primary-green-700 text-primary-green-500 duration-100" />
                      )}
                      {copied && (
                        <span className="absolute -top-5 -left-4 text-xs font-semibold bg-primary-green-600 text-white px-2 py-1 rounded-medium shadow-md animate-fade-in">
                          Copiado
                        </span>
                      )}
                    </button>
                  </div>
                  {activeCodeButton === "React" ? (
                    <code className="text-primary-blue-600 text-base whitespace-normal text-wrap">
                      {reactCode}
                    </code>
                  ) : (
                    <>
                      <code className="text-primary-blue-600 text-base whitespace-normal">
                        {htmlCode}
                      </code>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between gap-6 border-2 rounded-t-medium p-6 bg-primary-blue-600 border-primary-blue-600">
            <strong className="text-xl font-medium text-white">
              Propiedades de animación
            </strong>
            <span className="flex items-center justify-center w-10 h-10 bg-white rounded-small">
              <Calendar className="shrink-0 w-4 text-primary-blue-600"></Calendar>
            </span>
          </div>
          <div className="flex border-2 border-t-0 rounded-b-medium p-6 border-primary-green-600 h-full">
            <div className="flex items-center justify-center border-2 rounded-medium p-6 bg-primary-blue-50 border-primary-blue-600 w-full">
              {(() => {
                switch (type) {
                  case "Type1":
                    return (
                      <Button
                        variant={color}
                        size={size}
                        buttonStyle={style}
                        disabled={state === "disabled"}
                        isLoading={state === "loading"}
                      >
                        Button
                      </Button>
                    );

                  case "Type2":
                    return (
                      <ButtonIcon
                        variant={color}
                        size={size}
                        buttonStyle={style}
                        disabled={state === "disabled"}
                        icon
                        isLoading={state === "loading"}
                        iconPosition="left"
                      >
                        Button
                      </ButtonIcon>
                    );

                  case "Type3": {

                    const buttons = Array.from({ length: groupCount });
                    
                    return (
                      <section
                        className={`flex text-center gap-1 grid-rows-1 grid-cols-${groupCount}`}
                      >
                        {buttons.map((_, index) => (
                          <Button
                            key={index}
                            variant={color}
                            size={size}
                            buttonStyle={style}
                          >
                            Button
                          </Button>
                         
                        ))}
                      </section>
                    );
                  }
                }
              })()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const ButtonPage = () => {
  const [activeTypeButton, setActiveTypeButton] = useState<string>("Type1");
  const [configByType, setConfigByType] = useState<
    Record<string, Props["config"]>
  >({
    Type1: {
      style: "filled",
      color: "primary-blue",
      size: "medium",
      state: "Selecciona estado",
    },
    Type2: {
      style: "filled",
      color: "primary-blue",
      size: "medium",
      state: "Selecciona estado",
    },
    Type3: {
      style: "filled",
      color: "primary-blue",
      size: "medium",
      state: "Selecciona estado",
    },
  });

  const typeLabels: Record<string, string> = {
    Type1: "Button 1",
    Type2: "Button 2",
    Type3: "Group Button",
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

  return (
    <div>
      <div className="pb-5 ">
        <p className="text-xl/6 text-primary-blue-600 font-normal mt-2 text-center">
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                fill="#ffffff"
              />
            </svg>
          </span>
          {typeLabels["Type1"]}
        </button>
        <button
          className={getButtonType("Type2")}
          onClick={() => setActiveTypeButton("Type2")}
        >
          <span className="block h-6 w-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                fill="#ffffff"
              />
            </svg>
          </span>
          {typeLabels["Type2"]}
        </button>
        <button
          className={getButtonType("Type3")}
          onClick={() => setActiveTypeButton("Type3")}
        >
          <span className="block h-6 w-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                fill="#ffffff"
              />
            </svg>
          </span>
          {typeLabels["Type3"]}
        </button>
      </section>
      <div className="bg-primary-blue-600 px-6 py-4 rounded-large mb-10  ">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">
            {activeTypeButton ? typeLabels[activeTypeButton] : "Component"}
          </h3>
        </div>
      </div>
      {activeTypeButton === "Type1" && (
        <ConfiguratorButton
          type="Type1"
          config={configByType.Type1}
          onChange={(newConfig) =>
            setConfigByType((prev) => ({ ...prev, Type1: newConfig }))
          }
        />
      )}
      {activeTypeButton === "Type2" && (
        <ConfiguratorButton
          type="Type2"
          config={configByType.Type2}
          onChange={(newConfig) =>
            setConfigByType((prev) => ({ ...prev, Type2: newConfig }))
          }
        />
      )}

      {activeTypeButton === "Type3" && (
        <ConfiguratorButton
          type="Type3"
          config={configByType.Type3}
          onChange={(newConfig) =>
            setConfigByType((prev) => ({ ...prev, Type3: newConfig }))
          }
        />
      )}
      <section className="mt-15">
        <strong className="text-2xl font-semibold text-primary-green-600 mb-6 block">
          Guia de uso
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
