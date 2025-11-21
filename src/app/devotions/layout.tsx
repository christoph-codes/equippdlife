import { Header } from "@/components/Header";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
	const posts = getAllPosts();
	return (
		<>
			<Header />
			<div className="flex">
				<aside className="w-64 min-h-screen border-r">
					<section className="space-y-6 scroll-y-auto">
						{posts.map((post) => (
							<Link key={post.slug} href={`/devotions/${post.slug}`}>
								<article className="border-b p-4 hover:bg-white/20 transition-colors">
									<h2 className="text-xl font-semibold">{post.title}</h2>

									{post.date && (
										<p className="text-xs text-gray-400 mt-1">
											{new Date(post.date).toLocaleDateString()}
										</p>
									)}
								</article>
							</Link>
						))}
					</section>
				</aside>
				<main className="flex-1 max-w-2xl mx-auto p-4">{children}</main>
			</div>
		</>
	);
}
