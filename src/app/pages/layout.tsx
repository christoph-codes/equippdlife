import { Header } from "@/components/Header";
import { ReactNode } from "react";

export type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
