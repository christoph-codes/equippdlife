"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBarsStaggered } from "react-icons/fa6";
import { PostMeta } from "@/lib/posts";
import { getDevotionLabel } from "@/lib/helpers";

export default function DevotionsSidebar({ posts }: { posts: PostMeta[] }) {
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
	return (
		<>
			{/* Mobile devotion navigation dropdown */}
			<nav className="md:hidden sticky top-16 z-40 bg-primary shadow flex items-center gap-2 px-4 py-3 border-b border-white">
				<span className="font-bold text-lg text-white mr-4 shrink-0">
					Devotions
				</span>
				<select
					className="bg-white/10 text-white px-3 py-2 rounded text-sm font-semibold focus:outline-none focus:ring w-full"
					onChange={(e) => handleNav(e.target.value)}
					defaultValue=""
				>
					<option value="" disabled>
						Select a devotion
					</option>
					{posts.map((post) => (
						<option key={post.slug} value={post.slug}>
							{getDevotionLabel(post.date)}
						</option>
					))}
				</select>
			</nav>
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
						aria-label={
							sidebarOpen ? "Close devotion list" : "Open devotion list"
						}
						onClick={() => setSidebarOpen((open) => !open)}
					>
						<FaBarsStaggered size={24} className="text-white" />
					</button>
				</div>
				<section className="overflow-y-auto h-full md:h-auto pb-24 md:pb-0">
					{posts.length === 0 ? (
						<div className="p-4 text-center text-white/70">
							No devotions found.
						</div>
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
										{getDevotionLabel(post.date)}
									</h2>
									<p className="text-xs mt-1">{post.title}</p>
								</button>
							);
						})
					)}
				</section>
			</aside>
		</>
	);
}
