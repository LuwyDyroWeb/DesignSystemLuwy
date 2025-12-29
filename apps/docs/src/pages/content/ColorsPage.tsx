// import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { logo_LD_light } from "../../assets/images";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coldarkDark from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark";

export const ColorsPage = () => {
  // const [copied, setCopied] = useState<string | null>(null);

  // const handleCopy = (paso: string, text: string) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       setCopied(paso);
  //       setTimeout(() => setCopied(null), 1500);
  //     })
  //     .catch((err) => {
  //       console.error("Error al copiar:", err);
  //     });
  // };
  const COLORS: Record<string, string> = {
    "bg-primary-blue-700": "blue",
    "bg-primary-bluedark-700": "bluedark",
    "bg-alert-error-700": "error",
    "bg-alert-info-700": "info",
    "bg-alert-warning-700": "warning",
    "bg-alert-success-700": "success",
  };

  //     const COLORS_EXAMPLE_REACT = `@theme {
  //   --color-primary-blue-700: #004fa3;
  //   --color-primary-bluedark-700: #0425a6;
  //   --color-alert-error-700: #7f1b15;
  //   --color-alert-info-700: #016194;
  //   --color-alert-warning-700: #b1771a;
  //   --color-alert-success-700: #215924;
  //   --color-neutro-white-700: #b5b5b5;
  //   --color-neutro-black-700: #000000;
  // }
  //   `;
  const COLORS_EXAMPLE_REACT = `@theme {
  --color-primary-bluedark-50: #e6ebfe;
  --color-primary-bluedark-100: #bac8fd;
  --color-primary-bluedark-200: #8fa5fc;
  --color-primary-bluedark-300: #6381fb;
  --color-primary-bluedark-400: #375efa;
  --color-primary-bluedark-500: #0b3bf9;
  --color-primary-bluedark-600: #052ed2;
  --color-primary-bluedark-700: #0425a6;
  --color-primary-bluedark-800: #031b7a;
  --color-primary-bluedark-900: #02114f;
  --color-primary-bluedark-950: #010825;
  --color-primary-blue-50: #e6f2ff;
  --color-primary-blue-100: #b8daff;
  --color-primary-blue-200: #8ac2ff;
  --color-primary-blue-300: #5cabff;
  --color-primary-blue-400: #2e93ff;
  --color-primary-blue-500: #007aff;
  --color-primary-blue-600: #0065d1;
  --color-primary-blue-700: #004fa3;
  --color-primary-blue-800: #003975;
  --color-primary-blue-900: #002347;
  --color-primary-blue-950: #000c1a;
  --color-alert-error-50: #f7e9e9;
  --color-alert-error-100: #e7bcb9;
  --color-alert-error-200: #dc9b98;
  --color-alert-error-300: #cc6e68;
  --color-alert-error-400: #c2514b;
  --color-alert-error-500: #b3261e;
  --color-alert-error-600: #a3231b;
  --color-alert-error-700: #7f1b15;
  --color-alert-error-800: #621511;
  --color-alert-error-900: #4b100d;
  --color-alert-info-50: #e6f3fa;
  --color-alert-info-100: #b1daf1;
  --color-alert-info-200: #8bc8ea;
  --color-alert-info-300: #55afe0;
  --color-alert-info-400: #35a0da;
  --color-alert-info-500: #0288d1;
  --color-alert-info-600: #027cbe;
  --color-alert-info-700: #016194;
  --color-alert-info-800: #014b73;
  --color-alert-info-900: #013958;
  --color-alert-warning-50: #fef6e9;
  --color-alert-warning-100: #fde4bb;
  --color-alert-warning-200: #fcd79b;
  --color-alert-warning-300: #fbc56d;
  --color-alert-warning-400: #fab951;
  --color-alert-warning-500: #f9a825;
  --color-alert-warning-600: #e39922;
  --color-alert-warning-700: #b1771a;
  --color-alert-warning-800: #895c14;
  --color-alert-warning-900: #694710;
  --color-alert-success-50: #eaf2eb;
  --color-alert-success-100: #bed7bf;
  --color-alert-success-200: #9fc3a1;
  --color-alert-success-300: #73a876;
  --color-alert-success-400: #58975b;
  --color-alert-success-500: #2e7d32;
  --color-alert-success-600: #2a722e;
  --color-alert-success-700: #215924;
  --color-alert-success-800: #19451c;
  --color-alert-success-900: #133515;
  --color-neutro-white-50: #ffffff;
  --color-neutro-white-100: #ffffff;
  --color-neutro-white-200: #ffffff;
  --color-neutro-white-300: #ffffff;
  --color-neutro-white-400: #ffffff;
  --color-neutro-white-500: #ffffff;
  --color-neutro-white-600: #e8e8e8;
  --color-neutro-white-700: #b5b5b5;
  --color-neutro-white-800: #8c8c8c;
  --color-neutro-white-900: #6b6b6b;
  --color-neutro-black-50: #e6e6e6;
  --color-neutro-black-100: #b0b0b0;
  --color-neutro-black-200: #8a8a8a;
  --color-neutro-black-300: #545454;
  --color-neutro-black-400: #333333;
  --color-neutro-black-500: #000000;
  --color-neutro-black-600: #000000;
  --color-neutro-black-700: #000000;
  --color-neutro-black-800: #000000;
  --color-neutro-black-900: #000000;
}`;

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl text-white font-bold">Uso</div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Paleta de Colores</span>
              <code className="text-primary-bluedark-200">Tokens</code>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 px-4 py-2">
              <div className="flex flex-wrap items-center gap-6 py-2 ">
                {Object.entries(COLORS).map(([name, item]) => (
                  <div
                    key={name}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <span
                      className={`${name} text-black rounded-2xl inline-flex items-center justify-center p-2.5`}
                    >
                      <img
                        src={logo_LD_light}
                        alt="Logo Luwy Design"
                        className="h-6 w-6"
                      />
                    </span>
                    <div className="text-white">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full max-h-svh rounded-medium border border-dashed border-zinc-500 p-4 pr-5">
              <SyntaxHighlighter
                className="overflow-hidden custom-scrollbar w-full h-full"
                language={"css"}
                style={coldarkDark}
                customStyle={{
                  background: "transparent",
                  margin: 0,
                }}
              >
                {COLORS_EXAMPLE_REACT}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
