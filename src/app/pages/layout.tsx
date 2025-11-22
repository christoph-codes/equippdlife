import { Header } from "@/components/Header";
import { ReactNode } from "react";

export type LayoutProps = {
	title: string;
	description: string;
	children: ReactNode;
};

const Layout = ({ title, description, children }: LayoutProps) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
