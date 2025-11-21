"use client";

import { Button } from "@/components/Button";
import { FaShare } from "react-icons/fa6";

const ShareButton = ({
	title,
	excerpt,
}: {
	title: string;
	excerpt: string;
}) => {
	const share = async () => {
		if (navigator.share) {
			await navigator.share({
				title,
				text: excerpt,
				url: typeof window !== "undefined" ? window.location.href : "",
			});
		} else {
			await navigator.clipboard.writeText(
				typeof window !== "undefined" ? window.location.href : ""
			);
		}
	};
	return (
		<Button
			className="w-full bg-primary border-t border-white py-4 fixed bottom-0 left-0 right-0"
			onClick={share}
		>
			<FaShare />
			Share
		</Button>
	);
};

export default ShareButton;
