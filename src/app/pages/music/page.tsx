import { Metadata } from "next";
import PageTemplate from "../PageTemplate";
import { musicPlaylists } from "@/lib/playlists";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
	title: "Music » Equippd",
	description:
		"We believe what we listen to should strengthen our faith — not fight against it.",
	openGraph: {
		title: "Music » Equippd",
		description:
			"We believe what we listen to should strengthen our faith — not fight against it.",
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
		title: "Music » Equippd",
		description:
			"We believe what we listen to should strengthen our faith — not fight against it.",
		images: ["/equippd_og_image.png"],
	},
};

const AboutPage = () => {
	return (
		<PageTemplate
			title="Equippd Music"
			description="We believe what we listen to should strengthen our faith — not fight against it."
		>
			<p>
				Music is powerful. It shapes our thoughts, our emotions, and the
				atmosphere around us. At Equippd, we believe what we listen to should
				strengthen our faith — not fight against it.
			</p>

			<p>
				That’s why we’ve curated playlists across every genre, filled with
				clean, Christ-honoring music that glorifies God and uplifts your spirit.
				Whether you’re working out, unwinding, driving, studying, or getting
				ready for the day — there’s a sound here for you.
			</p>

			<p>
				Fill your environment with truth. Saturate your mind with what builds
				you up. Enjoy!
			</p>

			<div className="grid gap-8 md:grid-cols-2">
				{Object.values(musicPlaylists).map((playlist) => (
					<div key={playlist.title}>
						<h2 className="text-2xl mb-2">{playlist.title}</h2>
						<p className="mb-4">{playlist.description}</p>
						<div
							dangerouslySetInnerHTML={{ __html: playlist.iFrameSnippet }}
						></div>
						<Button href={playlist.spotifyUrl} className="mt-4" target="_blank">
							Listen on Spotify
						</Button>
					</div>
				))}
			</div>
		</PageTemplate>
	);
};

export default AboutPage;
