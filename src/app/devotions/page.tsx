import { getAllPosts, PostMeta } from "@/lib/posts";
import { Metadata } from "next";
import { getDevotionLabel } from "@/lib/helpers";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Devotions » Equippd",
	description:
		"Our heart is to help believers grow together in unity through Scripture-centered devotionals that strengthen your walk with Christ.",
	openGraph: {
		title: "Devotions » Equippd",
		description:
			"Our heart is to help believers grow together in unity through Scripture-centered devotionals that strengthen your walk with Christ.",
		url: "https://equippdlife.com",
		images: [
			{
				url: "/equippd_og_image.png",
				width: 1200,
				height: 630,
				alt: "Equippd » Unity in Christ",
			},
		],
		type: "website",
	},
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITEURL || "http://localhost:3000"
	),
	twitter: {
		card: "summary_large_image",
		title: "Devotions » Equippd",
		description:
			"Our heart is to help believers grow together in unity through Scripture-centered devotionals that strengthen your walk with Christ.",
		images: ["/equippd_og_image.png"],
	},
};

export default function DevotionsPage() {
	const posts = getAllPosts();

	return (
		<div className="flex flex-1 flex-col justify-center items-center max-w-3xl mx-auto pt-6 h-full overflow-y-auto">
			<header className="p-3 space-y-2 text-center">
				<h1 className="text-3xl">Devotions</h1>
				<p>Grow in truth. Stand firm in faith. Live equipped.</p>
			</header>
			<section className="flex flex-col pb-24 md:pb-0">
				{posts.length === 0 ? (
					<div className="p-4 text-center text-white/70">
						No devotions found.
					</div>
				) : (
					posts.map((post: PostMeta, idx: number) => (
						<Link
							key={post.slug}
							href={`/devotions/${post.slug}`}
							className={`w-full text-center rounded-sm py-4 px-6 transition-colors cursor-pointer bg-transparent hover:bg-white/5 ${
								idx === 0
									? "opacity-100"
									: "opacity-60 hover:opacity-100 focus:opacity-100"
							}`}
						>
							<h2 className="text-lg md:text-xl font-semibold truncate">
								{getDevotionLabel(post.date)}
							</h2>
							<p className="text-xs mb-0!">{post.title}</p>
						</Link>
					))
				)}
			</section>
		</div>
	);
}
