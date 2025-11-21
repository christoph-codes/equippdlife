import { Header } from "@/components/Header";
import { getAllPosts, PostMeta } from "@/lib/posts";
import DevotionsSidebar from "./DevotionsSidebar";
import DevotionsDropdown from "./DevotionsDropdown";
export default function Layout({ children }: { children: React.ReactNode }) {
	const posts = getAllPosts();
	return (
		<>
			<Header />
			{/* Mobile devotion header above content */}
			<div className="md:hidden">
				<nav className="sticky top-16 z-40 bg-primary shadow flex items-center gap-2 px-4 py-3 border-b border-white">
					<img
						src="/equippd_logo_abbr.svg"
						alt="Equippd Logo"
						className="w-10 h-10 mr-2 shrink-0"
					/>
					<span className="font-bold text-lg text-white mr-4 shrink-0">
						Devotions
					</span>
					<DevotionsDropdown posts={posts} />
				</nav>
			</div>
			<div className="flex justify-center w-full overflow-x-hidden">
				{/* Sidebar only on desktop */}
				<div className="hidden md:block">
					<DevotionsSidebar posts={posts} />
				</div>
				<main className="w-full max-w-2xl pt-4 px-4 sm:px-0">{children}</main>
			</div>
		</>
	);
}
