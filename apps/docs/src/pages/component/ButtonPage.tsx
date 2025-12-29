import { useState } from "react";
import { Button, type ButtonProps } from "@luwydyroweb/ui";
import { SlidersHorizontal, ClipboardList, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coldarkDark from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark";

export const ButtonPage = () => {
  const BTN_STYLE: ButtonProps["buttonStyle"][] = [
    "filled",
    "outline",
    "clear",
  ];
  const BTN_COLOR: ButtonProps["variant"][] = [
    "primary",
    "secondary",
    "error",
    "info",
    "warning",
    "success",
    "neutro-black",
    "neutro-white",
  ];
  const BTN_SIZE: ButtonProps["size"][] = ["tiny", "small", "medium", "giant"];

  const BUTTON_STYLE_EXAMPLE_REACT = `<Button buttonStyle="filled">filled</Button>
<Button buttonStyle="outline">outline</Button>
<Button buttonStyle="clear">clear</Button>
<Button disabled>disabled</Button>
`;
  const BUTTON_STYLE_EXAMPLE_HTML = `<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue">filled</button>
<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue btn--outline">outline</button>
<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue btn--clear">clear</button>
<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue" disabled>Disabled</button>
`;

  const BUTTON_COLOR_EXAMPLE_REACT = `<Button variant="primary">primary</Button>
<Button variant="secondary">secondary</Button>
<Button variant="error">error</Button>
<Button variant="info">info</Button>
<Button variant="warning">warning</Button>
<Button variant="success">success</Button>
<Button variant="neutro-black">neutro-black</Button>
<Button variant="neutro-white">neutro-white</Button>
`;
  const BUTTON_COLOR_EXAMPLE_HTML = `<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue">primary</button>
<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue">secondary</button>
<button type="button" class="btn btn--weight-regular btn--md btn--primary-bluedark">primary</button>
<button type="button" class="btn btn--weight-regular btn--md btn--alert-error">error</button>
<button type="button" class="btn btn--weight-regular btn--md btn--alert-info">info</button>
<button type="button" class="btn btn--weight-regular btn--md btn--alert-warning">warning</button>
<button type="button" class="btn btn--weight-regular btn--md btn--alert-success">success</button>
<button type="button" class="btn btn--weight-regular btn--md btn--neutro-black">neutro-black</button>
<button type="button" class="btn btn--weight-regular btn--md btn--neutro-white">neutro-white</button>
`;

  const BUTTON_SIZE_EXAMPLE_REACT = `<Button size="tiny">tiny</Button>
<Button size="small">small</Button>
<Button size="medium">medium</Button>
<Button size="giant">giant</Button>
`;
  const BUTTON_SIZE_EXAMPLE_HTML = `<button type="button" class="btn btn--weight-regular btn--sm btn--primary-blue">tiny</button>
<button type="button" class="btn btn--weight-regular btn--md btn--primary-blue">small</button>
<button type="button" class="btn btn--weight-regular btn--lg btn--primary-blue">medium</button>
<button type="button" class="btn btn--weight-regular btn--xl btn--primary-blue">giant</button>
`;

  const [copied, setCopied] = useState<string | null>(null);
  const [styleExample, setStyleExample] = useState<"react" | "html">("react");
  const [colorExample, setColorExample] = useState<"react" | "html">("react");
  const [sizeExample, setSizeExample] = useState<"react" | "html">("react");

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
  const BUTTON_STYLE_EXAMPLE =
    styleExample === "react"
      ? BUTTON_STYLE_EXAMPLE_REACT
      : BUTTON_STYLE_EXAMPLE_HTML;
  const BUTTON_COLOR_EXAMPLE =
    colorExample === "react"
      ? BUTTON_COLOR_EXAMPLE_REACT
      : BUTTON_COLOR_EXAMPLE_HTML;
  const BUTTON_SIZE_EXAMPLE =
    sizeExample === "react"
      ? BUTTON_SIZE_EXAMPLE_REACT
      : BUTTON_SIZE_EXAMPLE_HTML;
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl text-white font-bold">Uso</div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Styles</span>
              <code className="text-primary-bluedark-200">ButtonStyle</code>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  styleExample === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setStyleExample("react")}
              >
                React
              </button>
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  styleExample === "html" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setStyleExample("html")}
              >
                HTML
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-wrap items-center gap-4 py-2">
                {BTN_STYLE.map((item) => (
                  <Button key={item} buttonStyle={item} aria-label={item}>
                    {item}
                  </Button>
                ))}
                <Button key="disabled" disabled aria-label="disabled">
                  Disabled
                </Button>
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <div className="flex flex-wrap items-center gap-4 relative not-xl:pt-4">
                <div className="right-0 top-0 absolute">
                  <button
                    className="p-1"
                    onClick={() =>
                      handleCopy("style-example", BUTTON_STYLE_EXAMPLE)
                    }
                  >
                    {copied === "style-example" ? (
                      <Check className="text-primary-blue-700 duration-100" />
                    ) : (
                      <ClipboardList className="hover:text-primary-blue-700 text-primary-blue-500 duration-100" />
                    )}
                    {copied === "style-example" && (
                      <span className="absolute -top-5 -left-4 text-xs font-semibold bg-primary-blue-600 text-white px-3 py-1 rounded-medium shadow-md animate-fade-in">
                        Copiado
                      </span>
                    )}
                  </button>
                </div>
                <SyntaxHighlighter
                  className="overflow-hidden custom-scrollbar w-full"
                  language={styleExample === "react" ? "tsx" : "html"}
                  style={coldarkDark}
                  customStyle={{
                    background: "transparent",
                    margin: 0,
                  }}
                >
                  {BUTTON_STYLE_EXAMPLE}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Color</span>
              <code className="text-primary-bluedark-200">variant</code>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  colorExample === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setColorExample("react")}
              >
                React
              </button>
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  colorExample === "html" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setColorExample("html")}
              >
                HTML
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-wrap items-center gap-4 py-2">
                {BTN_COLOR.map((item) => (
                  <Button key={item} variant={item} aria-label={item}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <div className="flex flex-wrap items-center gap-4 relative not-xl:pt-4">
                <div className="right-0 top-0 absolute">
                  <button
                    className="p-1"
                    onClick={() =>
                      handleCopy("color-example", BUTTON_COLOR_EXAMPLE)
                    }
                  >
                    {copied === "color-example" ? (
                      <Check className="text-primary-blue-700 duration-100" />
                    ) : (
                      <ClipboardList className="hover:text-primary-blue-700 text-primary-blue-500 duration-100" />
                    )}
                    {copied === "color-example" && (
                      <span className="absolute -top-5 -left-4 text-xs font-semibold bg-primary-blue-600 text-white px-3 py-1 rounded-medium shadow-md animate-fade-in">
                        Copiado
                      </span>
                    )}
                  </button>
                </div>
                <SyntaxHighlighter
                  className="overflow-hidden custom-scrollbar w-full"
                  language={colorExample === "react" ? "tsx" : "html"}
                  style={coldarkDark}
                  customStyle={{
                    background: "transparent",
                    margin: 0,
                  }}
                >
                  {BUTTON_COLOR_EXAMPLE}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Size</span>
              <code className="text-primary-bluedark-200">ButtonStyle</code>
            </div>
            <div className="bg-primary-blue-900 px-3 py-2 flex flex-row gap-1 h-fit items-center rounded-medium text-sm">
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  sizeExample === "react" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setSizeExample("react")}
              >
                React
              </button>
              <button
                className={`py-1 px-2 rounded-md text-white duration-300 ${
                  sizeExample === "html" ? "bg-primary-blue-600" : ""
                }`}
                onClick={() => setSizeExample("html")}
              >
                HTML
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
              <div className="flex flex-wrap items-center gap-4 py-2">
                {BTN_SIZE.map((item) => (
                  <Button key={item} size={item} aria-label={item}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <div className="flex flex-wrap items-center gap-4 relative not-xl:pt-4">
                <div className="right-0 top-0 absolute">
                  <button
                    className="p-1"
                    onClick={() =>
                      handleCopy("size-example", BUTTON_SIZE_EXAMPLE)
                    }
                  >
                    {copied === "size-example" ? (
                      <Check className="text-primary-blue-700 duration-100" />
                    ) : (
                      <ClipboardList className="hover:text-primary-blue-700 text-primary-blue-500 duration-100" />
                    )}
                    {copied === "size-example" && (
                      <span className="absolute -top-5 -left-4 text-xs font-semibold bg-primary-blue-600 text-white px-3 py-1 rounded-medium shadow-md animate-fade-in">
                        Copiado
                      </span>
                    )}
                  </button>
                </div>
                <SyntaxHighlighter
                  className="overflow-hidden custom-scrollbar w-full"
                  language={sizeExample === "react" ? "tsx" : "html"}
                  style={coldarkDark}
                  customStyle={{
                    background: "transparent",
                    margin: 0,
                  }}
                >
                  {BUTTON_SIZE_EXAMPLE}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};
