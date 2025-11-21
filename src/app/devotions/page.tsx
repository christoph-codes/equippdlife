import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/posts";

export default function DevotionsPage() {
	const posts = getAllPosts();
	if (posts.length > 0) {
		redirect(`/devotions/${posts[0].slug}`);
	}
	// Fallback UI if no posts exist
	return (
		<main className="py-12 px-4 space-y-8">
			<header>
				<h1 className="text-3xl font-bold">Devotions</h1>
				<p className="text-sm text-gray-500">
					Reflections and studies to encourage your walk.
				</p>
			</header>
			<section className="space-y-6">
				<p className="text-sm mb-2">No devotions found.</p>
			</section>
		</main>
	);
}
