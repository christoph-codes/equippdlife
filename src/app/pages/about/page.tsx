import { Metadata } from "next";
import PageTemplate from "../PageTemplate";

export const metadata: Metadata = {
	title: "About » Equippd",
	description:
		"Equip believers with the truth, habits, and tools needed to live boldly for Jesus — not just on Sundays, but in every moment of daily life.",
	openGraph: {
		title: "About » Equippd",
		description:
			"Equip believers with the truth, habits, and tools needed to live boldly for Jesus — not just on Sundays, but in every moment of daily life.",
		// url: "https://equippdlife.com/pages/about",
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
		title: "About » Equippd",
		description:
			"Equip believers with the truth, habits, and tools needed to live boldly for Jesus — not just on Sundays, but in every moment of daily life.",
		images: ["/equippd_og_image.png"],
	},
};

const AboutPage = () => {
	return (
		<PageTemplate
			title="About Equippd"
			description="Equip believers with the truth, habits, and tools needed to live boldly for Jesus — not just on Sundays, but in every moment of daily life."
		>
			<h2>Mission Statement</h2>
			<p>
				Training God’s people to do His work and build up the body of Christ.
			</p>

			<p>Ephesians 4:12</p>

			<h2>Vision Statement</h2>
			<p>
				To see the body of Christ grow in unity, faith, and maturity — reaching
				the full and complete standard of Christ.
			</p>

			<p>Ephesians 4:13</p>

			<p>
				We envision a generation of believers who walk in unity, grounded in
				Scripture, standing firm in their identity in Christ, and reflecting Him
				in every space they influence.
			</p>

			<h2>Core Values</h2>
			<p>
				Speak the truth in love. Grow in every way more and more like Christ.
			</p>

			<p>Ephesians 4:15</p>

			<p>
				These values shape everything we create, teach, and champion. Our goal
				is to help believers grow spiritually, emotionally, and practically as
				they follow Jesus.
			</p>

			<h2>Our Focus</h2>
			<p>Truly being the church — in every arena of life.</p>

			<p>
				We believe the Christian life is more than attending a service. It’s
				living out your faith in the places God has intentionally positioned you
				— at home, at work, in conversations, in culture, and in community.
			</p>

			<p>
				God is glorified in both the small and big moments. In the quiet habits.
				In the daily obedience. In the miracles only He can produce.
			</p>

			<p>
				Equippd exists to help believers carry their faith into these moments
				with confidence, discipline, and unity in Christ.
			</p>

			<h2>Our Story</h2>
			<p>From rules to relationship. From perception to purpose.</p>

			<p>
				When Equippd began, it was born out of a real and raw experience: A new
				Christian who thought following Jesus was a list of rules — something
				restrictive, rigid, and honestly… lame.
			</p>

			<p>But God quickly shattered that misconception.</p>

			<ul>
				<li>Instead of rules, He revealed relationship.</li>
				<li>Instead of limitation, He revealed purpose.</li>
				<li>Instead of religion, He revealed transformation.</li>
			</ul>
			<p>
				Equippd was created to help other believers discover this same truth —
				that following Jesus isn’t a burden; it’s a powerful, purpose-filled
				life of identity, joy, unity, and daily growth.
			</p>

			<p>
				Our heart is to reshape the perception of what it means to walk with
				Christ and to help believers become everything God has called them to
				be.
			</p>

			<h2>What Equippd Offers</h2>
			<p>A Resource for Real Life Faith</p>

			<p>
				Equippd equips Christians to live out their faith in the everyday spaces
				where life actually happens.
			</p>

			<p>Not just the Sunday life.</p>
			<p>But the Monday-through-Saturday life.</p>

			<p>Here’s how:</p>

			<h3>Apparel</h3>

			<p>
				Wearable reminders of biblical truth that spark conversation and
				encourage faith wherever you go.
			</p>

			<h3>Music</h3>

			<p>
				Playlists that fill your environment with worship, truth, and
				Christ-centered encouragement.
			</p>

			<h3>Trainings & Studies</h3>

			<p>
				Scripture-based lessons that strengthen spiritual discipline, deepen
				your understanding of God’s Word, and help you grow in practical
				discipleship.
			</p>

			<h3>Lifestyle</h3>

			<p>
				Daily habits, rhythms, and resources that integrate your walk with Jesus
				into every part of your life.
			</p>

			<p>
				Equippd exists to unify believers and equip them to walk boldly, speak
				truth in love, and live fully for Christ in every area they influence.
			</p>

			<h2>Our Identity</h2>
			<p>Unity in Christ is more than a phrase — it’s our foundation.</p>

			<p>
				We believe the church is strongest when believers live equipped, grow
				together, and carry the presence of Jesus into every space they occupy.
			</p>

			<p>
				This is the heartbeat of Equippd.
				<br />
				This is why we exist.
				<br />
				This is who we are.
			</p>
		</PageTemplate>
	);
};

export default AboutPage;
