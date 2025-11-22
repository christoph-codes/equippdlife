import { Metadata } from "next";
import PageTemplate from "../../PageTemplate";
import RequestPrayerForm from "@/forms/RequestPrayerForm";

export const metadata: Metadata = {
	title: "Request Prayer » Equippd",
	description:
		"You’re not meant to carry what burdens you alone. We believe in the power of prayer, the strength of community, and the God who hears every word spoken in faith.",
	openGraph: {
		title: "Request Prayer » Equippd",
		description:
			"You’re not meant to carry what burdens you alone. We believe in the power of prayer, the strength of community, and the God who hears every word spoken in faith.",
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
		title: "Request Prayer » Equippd",
		description:
			"You’re not meant to carry what burdens you alone. We believe in the power of prayer, the strength of community, and the God who hears every word spoken in faith.",
		images: ["/equippd_og_image.png"],
	},
};

const RequestPrayer = () => {
	return (
		<PageTemplate
			title="Request Prayer"
			description="You’re not meant to carry what burdens you alone. We believe in the power of prayer, the strength of community, and the God who hears every word spoken in faith."
		>
			<h2>Are you in need of prayer for yourself, a loved one, or a friend?</h2>
			<p>
				If something has been weighing on your heart, we want to come alongside
				you. No matter the situation — big or small — we are honored to
				personally pray for you and lift up your request before God.
			</p>

			<h3>You Are Not Alone</h3>

			<p>
				Scripture reminds us that we are one body in Christ. When one part of
				the body hurts, we all hurt; when one rejoices, we all rejoice.
			</p>
			<p>Your request matters.</p>
			<p>Your struggle matters.</p>
			<p>Your story matters.</p>

			<p>We’re here to pray with you and believe with you.</p>
			{/* PRAYER REQUEST FORM SECTION */}
			<RequestPrayerForm />
		</PageTemplate>
	);
};

export default RequestPrayer;
