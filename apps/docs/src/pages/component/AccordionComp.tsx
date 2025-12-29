
import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";

type AccordionSignProps = "plus" | "arrow" | "no" | React.ReactNode;
type AccordionSignPositionProps = "left" | "right";

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen?: boolean;
}

const Collapse = ({ children, isOpen = false, ...rest }: CollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
   if (!contentRef.current) return;

    if (!isOpen) {
      setHeight(0);
      return;
    }

    const element = contentRef.current;
    const observer = new ResizeObserver(() => {
      setHeight(element.scrollHeight);
    });

    observer.observe(element);
    setHeight(element.scrollHeight);

    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div
      {...rest}
      className={`overflow-hidden duration-300 ease-in-out `}
      style={{
        maxHeight: `${height}px`,
        opacity: isOpen ? 1 : 0,
      }}
      aria-hidden={!isOpen}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

interface AccordionItemInternalProps {
  activeItem?: string;
  setActiveItem?: (id: string | undefined) => void;
}

interface AccordionItemProps
  extends HTMLAttributes<HTMLDivElement>,
    AccordionItemInternalProps {
  children: ReactNode;
  className?: string;
  id: string;
  title: string;
  sign?: AccordionSignProps;
  signPosition?: AccordionSignPositionProps;
  color?: string;
}

const ArrowIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-300 ${
      isActive && "rotate-180"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const AccordionItem = ({
  id,
  children,
  title,
  sign,
  signPosition = "left",
  color = "white",
  activeItem,
  setActiveItem,
  className,
  ...rest
}: AccordionItemProps) => {
  const _isActive = activeItem === id;

  const renderSign = () => {
    if (!sign) return null;

    if (typeof sign !== "string") {
      return <span className="ml-auto">{sign}</span>;
    }

    if (sign === "arrow") {
      return (
        <span className="ml-auto">
          <ArrowIcon isActive={_isActive} />
        </span>
      );
    }

    if (sign === "plus") {
      return (
        <span className="ml-auto text-xl font-bold">
          {_isActive ? "−" : "+"}
        </span>
      );
    }

    return null;
  };

  const accordionColor: Record<string, string> = {
    primary: "text-primary-bluedark-500",
    secondary: "text-primary-blue-500",
    error: "text-alert-error-500",
    info: "text-alert-info-500",
    warning: "text-alert-warning-500",
    success: "text-alert-success-500",
    white: "text-neutro-white-500",
    black: "text-neutro-black-500",
  };
  
  return (
    <div
      key={id}
      data-id={id}
      data-component-name="AccordionItem"
      className={`border-b border-inherit last:border-none ${className || ''}`}
      {...rest}
    >
      <button
        data-sign={sign}
        data-sign-position={signPosition}
        {...(_isActive && { "data-active": "" })}
        onClick={() =>
          setActiveItem ? setActiveItem(_isActive ? undefined : id) : null
        }
        className={`accordion-btn last:border-none flex w-full items-center p-4 hover:opacity-75 transition-all duration-300 ease-in-out ${_isActive ? accordionColor[color] :accordionColor.white}`}
      >
        {/* IZQUIERDA */}
        {signPosition === "left" && renderSign()}

        <div className="flex grow items-center pl-2">
          <span className="font-bold">{title}</span>
        </div>

        {/* DERECHA */}
        {signPosition !== "left" && renderSign()}
      </button>
      <Collapse key={id} isOpen={activeItem === id}>
        <div className="px-4 pb-4">{children}</div>
      </Collapse>
    </div>
  );
};
AccordionItem.displayName = "AccordionItem";


interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  activeItemId?: string;
  sign?: AccordionSignProps;
  signPosition?: AccordionSignPositionProps;
  color?: string;
}

function isAccordionItem(child: ReactNode): child is ReactElement<AccordionItemProps> {
  return isValidElement(child) && child.type === AccordionItem;
}


export const Accordion = ({
  children,
  className,
  activeItemId,
  sign = "plus",
  signPosition = "left",
  color,
  ...rest
}: AccordionProps) => {
  const childrenArray = Children.toArray(children);
  const firstChild = childrenArray[0];

  const [activeItem, setActiveItem] = useState<string | undefined>(
  activeItemId ||
    (isValidElement(firstChild)
      ? (firstChild as ReactElement<{ id: string }>).props.id
      : undefined)
);
  return (
    <div
      data-component-name="Accordion"
      className={`border rounded-md border-neutro-white-900 ${className || ''}`}
      {...rest}
    >
      {Children.map(children, (child) =>
        isAccordionItem(child)
          ? cloneElement(child, {
              activeItem,
              setActiveItem,
              sign: child.props.sign ?? sign,
              signPosition: child.props.signPosition ?? signPosition,
              color: child.props.color ?? color,
            })
        :  <code>{`Solo se permite usar "<AccordionItem> como hijo`}</code>
      )}
    </div>
  );
};
Accordion.displayName = "Accordion";

