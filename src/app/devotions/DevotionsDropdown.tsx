"use client";

import { getDevotionLabel } from "@/lib/helpers";
import { PostMeta } from "@/lib/posts";

export default function DevotionsDropdown({ posts }: { posts: PostMeta[] }) {
	return (
		<select
			className="bg-white/10 text-white px-3 py-2 rounded text-sm font-semibold focus:outline-none focus:ring w-full"
			onChange={(e) => {
				const slug = e.target.value;
				if (slug) window.location.href = `/devotions/${slug}`;
			}}
			defaultValue=""
		>
			<option value="" disabled>
				Select a devotion
			</option>
			{posts.map((post: PostMeta) => (
				<option key={post.slug} value={post.slug}>
					{getDevotionLabel(post.date)}
				</option>
			))}
		</select>
	);
}
