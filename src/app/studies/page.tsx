import { getAllStudies, StudyMeta } from "@/lib/studies";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
title: "Studies » Equippd",
description:
"Dive deeper into Scripture through comprehensive Bible studies designed to strengthen your faith and understanding of God's Word.",
openGraph: {
title: "Studies » Equippd",
description:
"Dive deeper into Scripture through comprehensive Bible studies designed to strengthen your faith and understanding of God's Word.",
url: "https://equippdlife.com/studies",
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
title: "Studies » Equippd",
description:
"Dive deeper into Scripture through comprehensive Bible studies designed to strengthen your faith and understanding of God's Word.",
images: ["/equippd_og_image.png"],
},
};

export default function StudiesPage() {
const studies = getAllStudies();

return (
<div className="flex flex-1 flex-col justify-center items-center max-w-3xl mx-auto pt-6 h-full overflow-y-auto">
<header className="p-3 space-y-2 text-center">
<h1 className="text-3xl">Studies</h1>
<p>Dive deeper. Walk together. Grow in truth.</p>
</header>
<section className="flex flex-col pb-24 md:pb-0 w-full">
{studies.length === 0 ? (
<div className="p-4 text-center text-white/70">No studies found.</div>
) : (
studies.map((study: StudyMeta, idx: number) => (
<Link
key={study.slug}
href={`/studies/${study.slug}`}
className={`w-full text-center rounded-sm py-6 px-6 transition-all cursor-pointer bg-transparent hover:bg-white/5 animate-slidenfade${
idx === 0 ? "" : " devotion-faded"
}`}
style={{ animationDelay: `${idx * 0.3}s` }}
>
<h2 className="text-lg md:text-xl font-semibold mb-2">
{study.title}
</h2>
<p className="text-sm text-white/70">{study.description}</p>
</Link>
))
)}
</section>
</div>
);
}
