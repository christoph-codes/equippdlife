import { Button } from "@/components/Button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Equippd » Unity in Christ",
	description:
		"A lifestyle brand equipping believers to grow, walk, and live as one body under Jesus.",
	openGraph: {
		title: "Equippd » Unity in Christ",
		description:
			"A lifestyle brand equipping believers to grow, walk, and live as one body under Jesus.",
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
		title: "Equippd » Unity in Christ",
		description:
			"A lifestyle brand equipping believers to grow, walk, and live as one body under Jesus.",
		images: ["/equippd_og_image.png"],
	},
};

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-centerfont-sans">
			<header className="sr-only">Unity in Christ</header>
			<main className="flex min-h-screen w-full flex-col items-center justify-center ">
				<div className="flex flex-col justify-center text-center items-center gap-12 animate-fade-in">
					<Image
						className="animate-fade max-w-full"
						src="/equippd_logo_desert.svg"
						alt="Equippd logo"
						width={400}
						height={60}
						priority
					/>
					<h1 className="sr-only">Equippd</h1>
					<p className="sr-only">
						A lifestyle brand equipping believers to grow, walk, and live as one
						body under Jesus.
					</p>
					<div className="flex divide-x">
						<Button className="py-1 px-10" href="/devotionals">
							Devotions
						</Button>
						<Button className="py-1 px-10" href="/study">
							Study
						</Button>
						<Button className="py-1 px-10" href="/store">
							Shop
						</Button>
						<Button className="py-1 px-10" href="/music">
							Music
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
