import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllStudies, getStudyBySlug, StudyPostMeta } from "@/lib/studies";
import Link from "next/link";
import { Button } from "@/components/Button";

type Props = {
params: Promise<{ studySlug: string }>;
searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
const studies = getAllStudies();
return studies.map((study) => ({ studySlug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
const { studySlug } = await params;

const study = getStudyBySlug(studySlug);
if (!study) {
notFound();
}

return {
title: `${study.title} » Studies » Equippd`,
description: study.description,
openGraph: {
title: `${study.title} » Studies » Equippd`,
description: study.description,
images: ["/equippd_og_image.png"],
},
twitter: {
card: "summary_large_image",
title: `${study.title} » Studies » Equippd`,
description: study.description,
images: ["/equippd_og_image.png"],
},
};
}

export default async function StudyPage({ params }: Props) {
const { studySlug } = await params;

const study = getStudyBySlug(studySlug);
if (!study) {
notFound();
}

return (
<div className="flex flex-1 flex-col justify-center items-center max-w-3xl mx-auto pt-6 h-full overflow-y-auto">
<div className="w-full mb-4 px-6">
<Button variant="secondary" href="/studies">
← Back to Studies
</Button>
</div>
<header className="p-3 space-y-2 text-center">
<h1 className="text-3xl">{study.title}</h1>
<p className="text-white/70">{study.description}</p>
</header>
<section className="flex flex-col pb-24 md:pb-0 w-full">
{study.posts.length === 0 ? (
<div className="p-4 text-center text-white/70">
No posts found for this study.
</div>
) : (
study.posts.map((post: StudyPostMeta, idx: number) => (
<Link
key={post.slug}
href={`/studies/${studySlug}/${post.slug}`}
className={`w-full text-center rounded-sm py-4 px-6 transition-all cursor-pointer bg-transparent hover:bg-white/5 animate-slidenfade${
idx === 0 ? "" : " devotion-faded"
}`}
style={{ animationDelay: `${idx * 0.3}s` }}
>
<h2 className="text-lg md:text-xl font-semibold truncate">
{post.title}
</h2>
{post.date && (
<p className="text-xs text-white/60">
{new Date(post.date).toLocaleDateString(undefined, {
year: "numeric",
month: "long",
day: "numeric",
})}
</p>
)}
</Link>
))
)}
</section>
</div>
);
}
