import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: string;
	variant?: "primary" | "secondary";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps
>(({ href, className, variant = "primary", ...rest }, ref) => {
	const buttonStyles =
		"inline-flex items-center text-desert cursor-pointer justify-center gap-2 whitespace-nowrap text-base py-2 px-4 font-bold uppercase text-center  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
	const variantStyles =
		variant === "primary"
			? "bg-transparent hover:bg-black/20 focus-visible:ring-desert"
			: "bg-white/10 text-desert hover:bg-white/20 focus-visible:ring-white";
	const combinedStyles = `${buttonStyles} ${variantStyles}`;
	if (href) {
		const { type, disabled, ...anchorProps } = rest;
		return (
			<Link
				className={`${combinedStyles} ${className ?? ""}`}
				href={href}
				ref={ref as React.Ref<HTMLAnchorElement>}
				{...anchorProps}
			/>
		);
	}
	return (
		<button
			className={`${combinedStyles} ${className ?? ""}`}
			ref={ref as React.Ref<HTMLButtonElement>}
			{...rest}
		/>
	);
});

Button.displayName = "Button";
