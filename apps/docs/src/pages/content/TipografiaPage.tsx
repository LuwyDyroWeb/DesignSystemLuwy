import { SlidersHorizontal } from "lucide-react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import coldarkDark from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark";

type FontWeightValue = {
  name: string
  label: string;
};
type FontSizeValue = {
  name: string
  label: string;
};

export const TipografiaPage = () => {
const FONT_WEIGHT: FontWeightValue[] = [
  {name: "font-thin", label: "font-weight: 100"},
  {name: "font-extralight", label: "font-weight: 200"},
  {name: "font-light", label: "font-weight: 300"},
  {name: "font-normal", label: "font-weight: 400"},
  {name: "font-medium", label: "font-weight: 500"},
  {name: "font-semibold", label: "font-weight: 600"},
  {name: "font-bold", label: "font-weight: 700"},
  {name: "font-extrabold", label: "font-weight: 800"},
  {name: "font-black", label: "font-weight: 900"},
];

const FONT_SIZE: FontSizeValue[] = [
  {name: "text-xs", label: "font-size: 12px" },
  {name: "text-sm", label: "font-size: 14px" },
  {name: "text-base", label: "font-size: 16px" },
  {name: "text-lg", label: "font-size: 18px" },
  {name: "text-xl", label: "font-size: 20px" },
  {name: "text-2xl", label: "font-size: 24px" },
  {name: "text-3xl", label: "font-size: 30px" },
  {name: "text-4xl", label: "font-size: 36px" },
  {name: "text-5xl", label: "font-size: 48px" },
];

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl text-white font-bold">
          Font Family: <span className="font-light">Work Sans</span>
        </div>
                <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Font Size</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 px-4 py-2">
              <div className="flex flex-col items-start gap-8 py-2 ">
                {FONT_SIZE.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-start justify-center gap-1"
                  >
                    <div className="text-neutro-black-100  text-xs"> {item.name}:
                      <code className="ml-2 text-xs text-primary-bluedark-200">{item.label}</code>
                    </div>
                    <p className={`text-white ${item.name}`}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-wrap flex-row justify-between gap-x-3 pb-4 w-full">
            <div className="flex flex-row items-center gap-3 pb-4">
              <SlidersHorizontal className="h-7 w-7" />
              <span className="text-2xl ">Font Weight</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 w-full">
            <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 px-4 py-2">
              <div className="flex flex-col items-start gap-8 py-2 ">
                {FONT_WEIGHT.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-start justify-center gap-1"
                  >
                    <div className="text-neutro-black-100  text-xs"> {item.name}:
                      <code className="ml-2 text-xs text-primary-bluedark-200">{item.label}</code>
                    </div>
                    <p className={`text-white ${item.name}`}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
