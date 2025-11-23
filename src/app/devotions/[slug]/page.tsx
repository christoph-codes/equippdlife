import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ShareButton from "./ShareButton";
import DevotionHeader from "./DevotionHeader";

type Props = {
	// Next 16: params is a Promise
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const { slug } = await params;

	let post;
	try {
		post = await getPostBySlug(slug);
	} catch {
		notFound();
	}
	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: ["/equippd_og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: ["/equippd_og_image.png"],
		},
	};
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
		<>
			<DevotionHeader posts={getAllPosts()} />
			<div className="p-6 mb-12 flex justify-center items-center h-full">
				<article
					className="prose max-w-none"
					dangerouslySetInnerHTML={{ __html: post.contentHtml }}
				/>
				<div className="mt-8 flex">
					<ShareButton title={post.title ?? ""} excerpt={post.excerpt ?? ""} />
				</div>
			</div>
		</>
	);
}
