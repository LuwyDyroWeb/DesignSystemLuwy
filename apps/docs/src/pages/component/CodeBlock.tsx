import { useState } from "react";
import { Check, ClipboardList } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coldarkDark from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark";

interface CodeBlockProps {
  code: string;
  language: string;
  copyId: string;
}

export const CodeBlock = ({ code, language, copyId }: CodeBlockProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(copyId);
      setTimeout(() => setCopied(null), 1500);
    })
     .catch((err) => {
      console.error("Error al copiar:", err);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 relative not-xl:pt-4">
      <div className="right-0 top-0 absolute">
        <button className="p-1" onClick={handleCopy}>
          {copied === copyId ? (
            <Check className="text-primary-blue-700 duration-100" />
          ) : (
            <ClipboardList className="hover:text-primary-blue-700 text-primary-blue-500 duration-100" />
          )}

          {copied === copyId && (
            <span className="absolute -top-5 -left-4 text-xs font-semibold bg-primary-blue-600 text-white px-3 py-1 rounded-medium shadow-md animate-fade-in">
              Copiado
            </span>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        className="overflow-hidden custom-scrollbar w-full"
        language={language}
        style={coldarkDark}
        customStyle={{
          background: "transparent",
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};