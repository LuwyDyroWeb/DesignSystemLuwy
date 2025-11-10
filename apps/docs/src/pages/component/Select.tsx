import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const SelectState = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOut = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOut);
    return () => document.removeEventListener("mousedown", clickOut);
  }, []);


  const selected = value;



  return (
    <div ref={selectRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full border-2 border-primary-blue-600 rounded-medium px-4 py-2 bg-white text-primary-blue-600 focus:ring-2 focus:ring-primary-blue-100"
      >
        <div className="flex items-center">
          <span className="pointer-events-none mr-3 grid place-items-center">
             <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                fill="#003d96"
              />
            </svg>
          </span>
          <span className="capitalize">{selected}</span>
        </div>
        <ChevronDown
          className={`h-6 w-6 text-primary-blue-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-10 text-primary-blue-600 py-1.5 mt-3 w-full bg-white border-1 rounded-small shadow-md">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer capitalize hover:bg-primary-blue-100 ${
                value === opt ? "bg-primary-blue-50" : ""
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};