import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const studiesDir = path.join(process.cwd(), "src/content/studies");

export type StudyMeta = {
	title: string;
	slug: string;
	description: string;
};

export type StudyPostMeta = {
	title: string;
	slug: string;
	date: string;
	excerpt?: string;
	studySlug: string;
};

export type StudyPost = StudyPostMeta & {
	contentHtml: string;
};

export type Study = StudyMeta & {
	posts: StudyPostMeta[];
};

// Get all studies (top-level directories in studies folder)
export function getAllStudies(): StudyMeta[] {
	if (!fs.existsSync(studiesDir)) {
		return [];
	}

	const studyFolders = fs
		.readdirSync(studiesDir)
		.filter((item) => {
			const fullPath = path.join(studiesDir, item);
			return fs.statSync(fullPath).isDirectory();
		});

	const studies = studyFolders.map((folder) => {
		const metaPath = path.join(studiesDir, folder, "meta.json");
		if (fs.existsSync(metaPath)) {
			const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
			return {
				title: meta.title || folder,
				slug: folder,
				description: meta.description || "",
			};
		}
		return {
			title: folder,
			slug: folder,
			description: "",
		};
	});

	return studies;
}

// Get a specific study with its posts
export function getStudyBySlug(studySlug: string): Study | null {
	const studyPath = path.join(studiesDir, studySlug);

	if (!fs.existsSync(studyPath)) {
		return null;
	}

	// Read meta.json
	const metaPath = path.join(studyPath, "meta.json");
	let meta: StudyMeta = {
		title: studySlug,
		slug: studySlug,
		description: "",
	};

	if (fs.existsSync(metaPath)) {
		const metaData = JSON.parse(fs.readFileSync(metaPath, "utf8"));
		meta = {
			title: metaData.title || studySlug,
			slug: studySlug,
			description: metaData.description || "",
		};
	}

	// Get all MDX posts in the study folder
	const files = fs
		.readdirSync(studyPath)
		.filter((file) => file.endsWith(".mdx"));

	const posts = files.map((file) => {
		const fullPath = path.join(studyPath, file);
		const raw = fs.readFileSync(fullPath, "utf8");
		const { data } = matter(raw);

		const slug = file.replace(/\.mdx$/, "");
		return {
			title: (data.title as string) ?? slug,
			slug: (data.slug as string) ?? slug,
			date: (data.date as string) ?? "",
			excerpt: (data.excerpt as string) ?? "",
			studySlug: studySlug,
		};
	});

	// Sort by date, newest first
	posts.sort((a, b) => (a.date < b.date ? 1 : -1));

	return {
		...meta,
		posts,
	};
}

// Get a specific post within a study
export async function getStudyPost(
	studySlug: string,
	postSlug: string
): Promise<StudyPost | null> {
	const postPath = path.join(studiesDir, studySlug, `${postSlug}.mdx`);

	if (!fs.existsSync(postPath)) {
		return null;
	}

	const raw = fs.readFileSync(postPath, "utf8");
	const { data, content } = matter(raw);

	const processed = await remark().use(remarkGfm).use(html).process(content);
	const contentHtml = processed.toString();

	const excerpt = processed.toString().slice(0, 160).trim();

	return {
		title: (data.title as string) ?? postSlug,
		slug: (data.slug as string) ?? postSlug,
		date: (data.date as string) ?? "",
		excerpt: excerpt ?? "",
		studySlug: studySlug,
		contentHtml,
	};
}

// Get all post slugs for a study (for static generation)
export function getStudyPostSlugs(studySlug: string): string[] {
	const studyPath = path.join(studiesDir, studySlug);

	if (!fs.existsSync(studyPath)) {
		return [];
	}

	return fs
		.readdirSync(studyPath)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}
