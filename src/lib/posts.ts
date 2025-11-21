import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const postsDir = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
	title: string;
	slug: string;
	date: string;
	excerpt?: string;
};

export type Post = PostMeta & {
	contentHtml: string;
};

export function getPostSlugs(): string[] {
	return fs
		.readdirSync(postsDir)
		.filter((file) => file.endsWith(".mdx")) // <- .mdx files
		.map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
	const slugs = getPostSlugs();

	const posts = slugs.map((slug) => {
		const fullPath = path.join(postsDir, `${slug}.mdx`);
		const raw = fs.readFileSync(fullPath, "utf8");
		const { data } = matter(raw);

		return {
			title: (data.title as string) ?? slug,
			slug: (data.slug as string) ?? slug,
			date: (data.date as string) ?? "",
			excerpt: (data.excerpt as string) ?? "",
		};
	});

	// newest first if date present
	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const fullPath = path.join(postsDir, `${slug}.mdx`);
	const raw = fs.readFileSync(fullPath, "utf8");

	const { data, content } = matter(raw);

	const processed = await remark().use(remarkGfm).use(html).process(content);

	const contentHtml = processed.toString();

	const excerpt = // snippet of first 160 chars without markdown
		processed.toString().slice(0, 160).trim();

	return {
		title: (data.title as string) ?? slug,
		slug: (data.slug as string) ?? slug,
		date: (data.date as string) ?? "",
		excerpt: excerpt ?? "",
		contentHtml,
	};
}
