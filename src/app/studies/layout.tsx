import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
return (
<div className="flex flex-col min-h-screen">
<Header />
<div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
<Footer />
</div>
);
}
