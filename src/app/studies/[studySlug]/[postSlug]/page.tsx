import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
getAllStudies,
getStudyBySlug,
getStudyPost,
getStudyPostSlugs,
} from "@/lib/studies";
import { Button } from "@/components/Button";
import StudyPostHeader from "./StudyPostHeader";
import Comments from "./Comments";

type Props = {
params: Promise<{ studySlug: string; postSlug: string }>;
searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
const studies = getAllStudies();
const params: { studySlug: string; postSlug: string }[] = [];

for (const study of studies) {
const postSlugs = getStudyPostSlugs(study.slug);
for (const postSlug of postSlugs) {
params.push({ studySlug: study.slug, postSlug });
}
}

return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
const { studySlug, postSlug } = await params;

const post = await getStudyPost(studySlug, postSlug);
if (!post) {
notFound();
}

const study = getStudyBySlug(studySlug);

return {
title: `${post.title} » ${study?.title} » Equippd`,
description: post.excerpt,
openGraph: {
title: `${post.title} » ${study?.title} » Equippd`,
description: post.excerpt,
images: ["/equippd_og_image.png"],
},
twitter: {
card: "summary_large_image",
title: `${post.title} » ${study?.title} » Equippd`,
description: post.excerpt,
images: ["/equippd_og_image.png"],
},
};
}

export default async function StudyPostPage({ params }: Props) {
const { studySlug, postSlug } = await params;

const post = await getStudyPost(studySlug, postSlug);
if (!post) {
notFound();
}

const study = getStudyBySlug(studySlug);
if (!study) {
notFound();
}

return (
<>
<StudyPostHeader studyTitle={study.title} studySlug={studySlug} />
<div className="p-6 mb-12 flex flex-col justify-center items-center h-full max-w-3xl mx-auto">
<article
className="prose max-w-none mb-8"
dangerouslySetInnerHTML={{ __html: post.contentHtml }}
/>
<Comments studySlug={studySlug} postSlug={postSlug} />
</div>
</>
);
}
