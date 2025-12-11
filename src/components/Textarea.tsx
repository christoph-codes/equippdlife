import { TextareaHTMLAttributes, forwardRef } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...rest }, ref) => {
		const baseStyles =
			"w-full p-4 bg-white/10 text-white rounded-lg border border-white/20 focus:border-desert focus:outline-none resize-none";

		return (
			<textarea
				className={`${baseStyles} ${className ?? ""}`}
				ref={ref}
				{...rest}
			/>
		);
	}
);

Textarea.displayName = "Textarea";
