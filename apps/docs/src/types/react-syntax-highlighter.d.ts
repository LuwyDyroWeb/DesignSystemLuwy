declare module "react-syntax-highlighter" {
  import * as React from "react";

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: Record<string, React.CSSProperties>;
    children?: string | string[];
    customStyle?: React.CSSProperties;
    showLineNumbers?: boolean;
    wrapLongLines?: boolean;
    className?: string;
  }

  export const Prism: React.FC<SyntaxHighlighterProps>;
  export default Prism;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark" {
  import * as React from "react";

  const style: Record<string, React.CSSProperties>;
  export default style;
}
declare module "react-syntax-highlighter/dist/esm/styles/prism/dracula" {
  import * as React from "react";

  const style: Record<string, React.CSSProperties>;
  export default style;
}