import { ReactNode } from "react";

export type PageTemplateProps = {
	title: string;
	description: string;
	children: ReactNode;
};

const PageTemplate = ({ title, description, children }: PageTemplateProps) => {
	return (
		<>
			<section className="flex flex-col items-center mb-6 sm:p-24 p-12 bg-primary-dark">
				<div className="flex flex-col gap-2 text-center justify-center">
					<h1>{title}</h1>
					<p className="mb-0! max-w-1/2 mx-auto">{description}</p>
				</div>
			</section>
			<main className="py-6 px-6 mx-auto max-w-3xl space-y-6">{children}</main>
		</>
	);
};

export default PageTemplate;
