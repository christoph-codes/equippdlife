import Footer from "@/components/Footer";
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
			<Footer />
		</>
	);
};

export default Layout;
