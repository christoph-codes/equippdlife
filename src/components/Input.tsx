import { InputHTMLAttributes, ChangeEvent } from "react";

type BaseInputProps = {
	label: string;
	name: string;
	type?: InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
	rows?: number;
	className?: string;
	value?: string;
	placeholder?: string;
	required?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type InputProps = BaseInputProps;

export const Input = ({
	name,
	label,
	className,
	onChange,
	type,
	rows,
	value,
	placeholder,
	required,
}: InputProps) => {
	const baseInputStyles = `bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-desert focus:border-desert w-full placeholder:text-white/50 ${className ?? ""}`;

	if (type === "textarea") {
		return (
			<fieldset className="flex flex-col">
				<label htmlFor={name} className="font-bold text-white mb-2">
					{label}
				</label>
				<textarea
					id={name}
					name={name}
					className={baseInputStyles}
					onChange={onChange}
					value={value}
					rows={rows}
					placeholder={placeholder}
					required={required}
				/>
			</fieldset>
		);
	}

	return (
		<fieldset className="flex flex-col">
			<label htmlFor={name} className="font-bold text-white mb-2">
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				className={baseInputStyles}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				required={required}
			/>
		</fieldset>
	);
};

export default Input;
