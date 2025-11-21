import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps
>(({ href, className, ...rest }, ref) => {
	const buttonStyles =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap text-base py-3 font-bold uppercase text-center hover:bg-black/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
	if (href) {
		const { type, disabled, ...anchorProps } = rest;
		return (
			<Link
				className={`${buttonStyles} ${className ?? ""}`}
				href={href}
				ref={ref as React.Ref<HTMLAnchorElement>}
				{...anchorProps}
			/>
		);
	}
	return (
		<button
			className={`${buttonStyles} ${className ?? ""}`}
			ref={ref as React.Ref<HTMLButtonElement>}
			{...rest}
		/>
	);
});

Button.displayName = "Button";
