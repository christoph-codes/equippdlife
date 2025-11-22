import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { Button } from "@/components/Button";
import { Metadata } from "next";

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
		<>
			<header className="p-3 space-y-2">
				<h1 className="text-3xl">Devotions</h1>
				<h2 className="text-lg">
					Grow in truth. Stand firm in faith. Live equipped.
				</h2>

				<p>
					At Equippd, our heart is to help believers grow together in unity
					through Scripture-centered devotionals that strengthen your walk with
					Christ. Each devotion is written to encourage, challenge, and equip
					you with biblical truth for everyday life.
				</p>

				<p>Stay grounded. Stay encouraged. Stay unified in Christ.</p>
				<Button href={`/devotions/${posts[0].slug}`}>
					Read Today's Devotion
				</Button>
			</header>
		</>
	);
}
