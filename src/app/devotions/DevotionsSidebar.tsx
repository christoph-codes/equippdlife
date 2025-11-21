"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DevotionsSidebar({ posts }: { posts: any[] }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const closeSidebar = () => setSidebarOpen(false);
	const handleNav = (slug: string) => {
		closeSidebar();
		router.push(`/devotions/${slug}`);
	};

	// Extract current slug from pathname
	const currentSlug = pathname?.startsWith("/devotions/")
		? pathname.replace("/devotions/", "")
		: "";

	<aside
		className={`fixed left-0 top-16 z-50 bg-primary border-r transition-transform duration-300 w-full md:w-64 h-[calc(100vh-4rem)] ${
			sidebarOpen ? "translate-x-0" : "-translate-x-full"
		} md:translate-x-0`}
		style={{ maxWidth: "100vw" }}
		aria-label="Devotion list"
	>
		{/* Mobile header with toggle inside sidebar */}
		<div className="md:hidden flex items-center justify-between px-4 py-1 border-b bg-primary">
			<span className="font-bold text-lg">Devotions</span>
			<button
				className="p-2 rounded focus:outline-none focus:ring"
				aria-label={sidebarOpen ? "Close devotion list" : "Open devotion list"}
				onClick={() => setSidebarOpen((open) => !open)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6"
				>
					{sidebarOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					)}
				</svg>
			</button>
		</div>
		<section className="space-y-2 overflow-y-auto h-full md:h-auto pt-2 pb-24 md:pb-0">
			{posts.length === 0 ? (
				<div className="p-4 text-center text-white/70">No devotions found.</div>
			) : (
				posts.map((post) => {
					const isSelected = post.slug === currentSlug;
					return (
						<button
							key={post.slug}
							onClick={() => handleNav(post.slug)}
							className={`w-full text-left border-b p-4 transition-colors cursor-pointer bg-transparent ${
								isSelected
									? "bg-white/10 border-white text-white font-bold"
									: "hover:bg-white/5"
							}`}
						>
							<h2 className="text-lg md:text-xl font-semibold truncate">
								{post.title}
							</h2>
							{post.date && (
								<p className="text-xs mt-1">
									{new Date(post.date).toLocaleDateString()}
								</p>
							)}
						</button>
					);
				})
			)}
		</section>
	</aside>;
}
