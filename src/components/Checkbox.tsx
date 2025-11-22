import { Dispatch, SetStateAction } from "react";

export type CheckboxProps = {
	name: string;
	label: string;
	value: boolean;
	onChange: Dispatch<SetStateAction<boolean>>;
};

const Checkbox = ({ name, label, value, onChange }: CheckboxProps) => {
	return (
		<fieldset className="flex items-center space-x-2 mb-4 group">
			<input
				id={name}
				type="checkbox"
				className="h-5 w-5 border-desert border rounded-sm text-primary checked:bg-desert checked:text-black focus appearance-none cursor-pointer"
				checked={value}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<label
				className="font-bold cursor-pointer group-hover:text-desert hover:text-desert"
				htmlFor={name}
			>
				{label}
			</label>
		</fieldset>
	);
};

export default Checkbox;
