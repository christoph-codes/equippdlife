import { PostMeta } from "@/lib/posts";
import DevotionsDropdown from "../DevotionsDropdown";
import { Button } from "@/components/Button";

export type DevotionHeaderProps = {
	posts: PostMeta[];
};

const DevotionHeader = ({ posts }: DevotionHeaderProps) => {
	return (
		<header>
			<div className="md:hidden">
				<nav className="sticky top-16 z-40 bg-primary shadow flex items-center gap-2 px-4 py-3 border-b border-white justify-between">
					<span className="font-bold text-lg text-white mr-4 shrink-0">
						Devotions
					</span>
					<Button variant="secondary" href="/devotions">
						Back to Devotions
					</Button>
					{/* <DevotionsDropdown posts={posts} /> */}
				</nav>
			</div>
		</header>
	);
};

export default DevotionHeader;
