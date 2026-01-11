"use client";

import { Button } from "@/components/Button";
import { FaShare } from "react-icons/fa6";

const ShareButton = ({
	title,
	excerpt,
	lastParagraph,
}: {
	title: string;
	excerpt: string;
	lastParagraph?: string;
}) => {
	const share = async () => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		// Use last paragraph if available, otherwise fall back to excerpt
		const shareText = lastParagraph || excerpt;
		const textWithUrl = `${shareText}\n\n${url}`;

		if (navigator.share) {
			await navigator.share({
				title,
				text: textWithUrl,
			});
		} else {
			await navigator.clipboard.writeText(textWithUrl);
		}
	};
	return (
		<Button
			className="w-full bg-primary! hover:bg-primary-dark! transition-colors border-t border-primary-dark py-4 fixed bottom-0 left-0 right-0"
			onClick={share}
		>
			<FaShare />
			Share
		</Button>
	);
};

export default ShareButton;
