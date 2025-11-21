import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = {
	// Next 16: params is a Promise
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export default async function DevotionPage({ params }: Props) {
	const { slug } = await params;

	let post;
	try {
		post = await getPostBySlug(slug);
	} catch {
		notFound();
	}

	return (
		<main>
			<header className="mb-8">
				<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
				{post.date && (
					<p className="text-xs text-gray-400">
						{new Date(post.date).toLocaleDateString()}
					</p>
				)}
			</header>

			<article
				className="prose max-w-none"
				dangerouslySetInnerHTML={{ __html: post.contentHtml }}
			/>
		</main>
	);
}
