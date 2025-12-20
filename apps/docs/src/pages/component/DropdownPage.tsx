import { SlidersHorizontal } from "lucide-react";
import {
  Children,
  cloneElement,
  type FC,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
// import classNames from 'classnames';
// import Collapse from './Collapse';
// import Icon from '@/components/icon/Icon';

// @start-snippet:: interface
type TAccordionSignProps = "plus" | "arrow" | "no";
type TAccordionSignPositionProps = "left" | "right";
// @end-snippet:: interface

// @start-snippet:: interface
interface ICollapseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen?: boolean;
}
const Collapse: FC<ICollapseProps> = (props) => {
  const { children, isOpen = false, className, ...rest } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  return (
    <div
      {...rest}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
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

// @end-snippet:: interface

// @start-snippet:: interface
interface IAccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  id: string;
  title: string;
  // activeItem?: string;
  // setActiveItem?: Dispatch<SetStateAction<string | undefined>>;
  sign?: TAccordionSignProps;
  signPosition?: TAccordionSignPositionProps;
  color?: string;
}
// @end-snippet:: interface
export const AccordionItem: FC<IAccordionItemProps> = (props) => {
  const {
    id,
    children,
    className,
    title,
    // @ts-expect-error ignore
    activeItem,
    // @ts-expect-error ignore
    setActiveItem,
    sign,
    signPosition,
    color = "blue",
    ...rest
  } = props;

  const _isActive = activeItem === id;

  // let _signIcon;

  // switch (sign) {
  // 	case 'plus':
  // 		_signIcon = _isActive ? 'MinusSign' : 'PlusSign';
  // 		break;
  // 	case 'arrow':
  // 		_signIcon = _isActive ? 'ArrowUp01' : 'ArrowDown01';
  // 		break;
  // 	default:
  // 		_signIcon = null;
  // 		break;
  // }

  // const _isLeftSign = signPosition === 'left';

  const accordionColor: Record<string, string> = {
    primary: "btn--primary-bluedark",
    secondary: "btn--primary-blue",
    error: "btn--alert-error",
    info: "btn--alert-info",
    warning: "btn--alert-warning",
    success: "btn--alert-success",
  };

  return (
    <div
      key={id}
      id={id}
      data-component-name="AccordionItem"
      className={`${className} border-b border-inherit last:border-none`}
      {...rest}>
      <button
        data-sign={sign}
        data-sign-position={signPosition}
        {...(_isActive && { "data-active": "" })}
        onClick={() => setActiveItem ? setActiveItem(_isActive ? undefined : id) : null}
        className={`${className} accordion-btn border-b border-inherit last:border-none flex w-full items-center p-4 hover:opacity-75 transition-all duration-300 ease-in-out ${accordionColor[color]}`}>
        <div className="flex grow items-center pl-2">
          <span className="font-bold">{title}</span>
        </div>
      </button>
      <Collapse key={id} isOpen={activeItem === id}>
        <div className="px-4 pb-4">{children}</div>
      </Collapse>
    </div>
  );
};
AccordionItem.displayName = "AccordionItem";

// @start-snippet:: interface
interface IAccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  activeItemId?: string;
  sign?: TAccordionSignProps;
  signPosition?: TAccordionSignPositionProps;
  color?: string;
}
// @end-snippet:: interface
const Accordion: FC<IAccordionProps> = (props) => {
  const {
    children,
    className,
    activeItemId,
    sign = "plus",
    signPosition = "left",
    color,
    ...rest
  } = props;

  const [activeItem, setActiveItem] = useState<string | undefined>(
    activeItemId || (Array.isArray(children) && children?.flat()[0].props.id)
  );
  return (
    <div
      data-component-name="Accordion"
      className={`${className} border border-zinc-500/10 dark:border-zinc-500/25`}
      {...rest}
    >
      {Children.map(children, (child) =>
        // @ts-expect-error ignore
        ["AccordionItem"].includes(child?.type?.displayName) ? (
          cloneElement(child as ReactElement<IAccordionItemProps>, {
            // @ts-expect-error ignore
            activeItem,
            setActiveItem,
            sign,
            signPosition,
            // @ts-expect-error ignore
            color: child?.props?.color || color,
          })
        ) : (
          <code>Solo un AccordionItem debería usarse como hijo</code>
        )
      )}
    </div>
  );
};
Accordion.displayName = "Accordion";

export default Accordion;

export const DropdownPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-3xl text-white font-bold">Uso</div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-row items-center gap-3 pb-4">
            <SlidersHorizontal className="h-7 w-7" />
            <span className="text-2xl ">Uso Básico</span>
            <code className="text-primary-bluedark-200">Children</code>
          </div>
          <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
            <div className="flex flex-wrap items-center gap-4">
              <Accordion>
                <AccordionItem id="item1" title="Item 1" color="primary">
                  Contenido del Item 1
                </AccordionItem>
                <AccordionItem id="item2" title="Item 2" color="secondary">
                  Contenido del Item 2
                </AccordionItem>
                <AccordionItem id="item3" title="Item 3" color="success">
                  Contenido del Item 3
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-row items-center gap-3 pb-4">
            <SlidersHorizontal className="h-7 w-7" />
            <span className="text-2xl ">Color</span>
            <code className="text-primary-bluedark-200">variant</code>
          </div>
          <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
            <div className="flex flex-wrap items-center gap-4">
            
            </div>
          </div>
        </div>
        <div className="border-2 border-primary-blue-600 p-6 rounded-medium flex flex-col items-start justify-center text-primary-blue-600">
          <div className="flex flex-row items-center gap-3 pb-4">
            <SlidersHorizontal className="h-7 w-7" />
            <span className="text-2xl ">Sizes</span>
            <code className="text-primary-bluedark-200">ButtonStyle</code>
          </div>
          <div className="overflow-x-auto w-full rounded-medium border border-dashed border-zinc-500 p-4">
            <div className="flex flex-wrap items-center gap-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};
