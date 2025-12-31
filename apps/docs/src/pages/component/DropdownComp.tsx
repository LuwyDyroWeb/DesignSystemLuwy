import {
	cloneElement,
	type Dispatch,
	type FC,
	forwardRef,
	type HTMLAttributes,
	type ReactElement,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useRef,
	useState,
    useEffect
} from 'react';



const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
	<svg
		fill="currentColor"
		width="1em"
		height="1em"
		viewBox="0 -6 524 524"
		style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
	>
		<path d="M64 191L98 157 262 320 426 157 460 191 262 387 64 191Z" />
	</svg>
);

export interface DropdownProps extends HTMLAttributes<HTMLElement> {
	children: ReactElement<DropdownToggleProps | DropdownMenuProps>[];
	className?: string;
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
const Dropdown = (props: DropdownProps) => {
	const { children, className, isOpen = null, setIsOpen } = props;

	const [state, setState] = useState<boolean>(
		!!(isOpen !== null && !!setIsOpen ? isOpen : false),
	);

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const closeMenu = useCallback(() => {
		if (isOpen !== null && setIsOpen) {
			setIsOpen(false);
		} else {
			setState(false);
		}
	}, [isOpen, setIsOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropdownRef.current) return;

			if (!dropdownRef.current.contains(event.target as Node)) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [closeMenu]);

	return (
		<div
			data-component-name='Dropdown'
			ref={dropdownRef}
			className={`relative inline-flex ${className}`}>
			{children.map((child: ReactElement, index: number) =>
				// @ts-expect-error ignore
				['DropdownMenu', 'DropdownToggle'].includes(child.type.displayName as string)
					? cloneElement(child, {
							// @ts-expect-error ignore
							isOpen: isOpen !== null && !!setIsOpen ? isOpen : state,
							setIsOpen: isOpen !== null && !!setIsOpen ? setIsOpen : setState,
							key: index,
						})
					: child,
			)}
		</div>
	);
};
Dropdown.displayName = 'Dropdown';

export interface DropdownToggleProps {
	label: string;
	hasIcon?: boolean;
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	trigger?: 'click' | 'hover';
	className?: string;
}
export const DropdownToggle= (props: DropdownToggleProps) => {
	const {
		label,
	hasIcon = true,
	isOpen = false,
	setIsOpen,
	trigger = 'click',
	className,
	} = props;

	const handleClick = () => {
		if (setIsOpen) setIsOpen(!isOpen);
	};

	const handleMouseEnter = () => {
		if (trigger === 'hover' && setIsOpen) setIsOpen(true);
	};

	return (
		<button
			type="button"
			className={`
				flex items-center justify-between px-4 py-2 border rounded
				bg-white dark:bg-zinc-900
				${isOpen ? 'shadow-inner' : ''}
				${className ?? ''}
			`}
			onClick={trigger === 'click' ? handleClick : undefined}
			onMouseEnter={handleMouseEnter}
			aria-expanded={isOpen}
		>
			<span>{label}</span>
			{hasIcon && <ArrowIcon isOpen={isOpen} />}
		</button>
	);
};
DropdownToggle.displayName = 'DropdownToggle';


export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
	children: ReactNode | ReactNode[];
	className?: string;
	isCloseAfterLeave?: boolean;
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
export const DropdownMenu = forwardRef<HTMLUListElement, DropdownMenuProps>(
	(props, ref) => {
		const {
			isOpen = false,
			setIsOpen,
			children,
			className,
			isCloseAfterLeave = true,
			...rest
		} = props;

		const onMouseLeave =
			isCloseAfterLeave && setIsOpen ? () => setIsOpen(false) : undefined;

		if (!isOpen) return null;

		return (
			<ul
				data-component-name="Dropdown/DropdownMenu"
				ref={ref}
				role="menu"
				onMouseLeave={onMouseLeave}
				className={`absolute left-0 top-full mt-1 z-50 min-w-60 flex flex-col gap-2 px-2 py-2border border-zinc-300/25 bg-white shadow-lg rk:border-zinc-800/50 dark:bg-zinc-900 ${className ?? ''}`}
				{...rest}
			>
				{children}
			</ul>
		);
	}
);

DropdownMenu.displayName = 'DropdownMenu';

export interface DropdownItemProps extends HTMLAttributes<HTMLLIElement> {
	children: ReactNode;
	className?: string;
	color?: string;
	isActive?: boolean;
	isDisabled?: boolean;
	icon?: string;
	rightIcon?: string;
	isOpen?: boolean;
}
export const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>((props, ref) => {
	const {
		children,
		className,
		color,
		isActive = false,
		isDisabled,
		icon,
		rightIcon,
		isOpen,
		...rest
	} = props;

	const colorClass: Record<string, string> = {
    primary: "text-primary-blue-500",
    secondary: "text-primary-bluedark-500",
    error: "text-alert-error-500",
    info: "text-alert-info-500",
    warning: "text-alert-warning-500",
    success: "text-alert-success-500",
    white: "text-neutro-white-500",
    black: "text-neutro-black-500",
	};

    const baseClasses = `p-2 flex items-center w-full whitespace-nowrap cursor-pointer rounded-sm border-zinc-300/25 dark:border-zinc-800/50 ${!isDisabled ? 'hover:bg-zinc-500/10' : ''} ${color ? colorClass[color] : ''} ${(isActive || isOpen) ? 'bg-zinc-500/5' : ''} ${isDisabled ? '!opacity-50 cursor-not-allowed' : ''} transition-100`.trim().replace(/\s+/g, ' ');

	return (
		<li
			data-component-name='Dropdown/DropdownItem'
			ref={ref}
			className={`${baseClasses} ${className ? className : ""}`}
			{...rest}>
			{icon && <svg className='inline-flex text-xl ltr:mr-1.5 rtl:ml-1.5' fill="currentColor" width="1em" height="1em" viewBox="0 -6 524 524" ><path d="M64 191L98 157 262 320 426 157 460 191 262 387 64 191Z" /></svg>}
			{children}
			{rightIcon && (
                <svg className='inline-flex text-xl ltr:ml-1.5 rtl:mr-1.5' fill="currentColor" width="1em" height="1em" viewBox="0 -6 524 524" ><path d="M64 191L98 157 262 320 426 157 460 191 262 387 64 191Z" /></svg>
			)}
		</li>
	);
});
DropdownItem.displayName = 'DropdownItem';

type DropdownDividerProps = HTMLAttributes<HTMLDivElement>;
export const DropdownDivider: FC<DropdownDividerProps> = (props) => {
	const { className, ...rest } = props;
	return <div className={`-mx-2 border-t border-inherit ${className}`}{...rest}></div>;
};
DropdownDivider.displayName = 'DropdownDivider';

type DropdownContentProps = HTMLAttributes<HTMLDivElement>;
export const DropdownContent: FC<DropdownContentProps> = (props) => {
	const { children, className, ...rest } = props;
	return (
		<div className={`px-2 ${className}`} {...rest}>
			{children}
		</div>
	);
};
DropdownContent.displayName = 'DropdownContent';

export default Dropdown;
