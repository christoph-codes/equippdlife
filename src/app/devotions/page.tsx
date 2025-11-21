import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function DevotionsPage() {
	const posts = getAllPosts();

	return (
		<main className="max-w-[300px] py-12 px-4 space-y-8">
			<header>
				<h1 className="text-3xl font-bold">Devotions</h1>
				<p className="text-sm text-gray-500">
					Reflections and studies to encourage your walk.
				</p>
			</header>

			<section className="space-y-6">
				{posts.map((post) => (
					<article key={post.slug} className="border-b pb-4">
						<h2 className="text-xl font-semibold">
							<Link
								href={`/devotions/${post.slug}`}
								className="hover:underline"
							>
								{post.title}
							</Link>
						</h2>

						{post.date && (
							<p className="text-xs text-gray-400 mt-1">
								{new Date(post.date).toLocaleDateString()}
							</p>
						)}
					</article>
				))}

				{posts.length === 0 && (
					<p className="text-sm text-gray-500">
						No devotions yet. Add an <code>.mdx</code> file in{" "}
						<code>src/content/posts</code>.
					</p>
				)}
			</section>
		</main>
	);
}
