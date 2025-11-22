import { Dispatch, InputHTMLAttributes } from "react";

export type InputProps = {
	placeholder?: string;
	name: string;
	value: string;
	label: string;
	onChange: Dispatch<React.SetStateAction<string>>;
	type?: InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
	rows?: number;
};

const Input = ({
	name,
	value,
	onChange,
	label,
	placeholder,
	type,
	rows,
	...rest
}: InputProps) => {
	const isTextarea = type === "textarea";
	if (isTextarea) {
		return (
			<fieldset className="flex flex-col">
				<label htmlFor={name} className="font-bold">
					{label}
				</label>
				<textarea
					{...rest}
					id={name}
					name={name}
					className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={rows}
				/>
			</fieldset>
		);
	}
	return (
		<fieldset className="flex flex-col">
			<label htmlFor={name} className="font-bold">
				{label}
			</label>
			<input
				{...rest}
				id={name}
				name={name}
				className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</fieldset>
	);
};

export default Input;
