export const getDevotionLabel = (dateStr: string) => {
	// Parse date as UTC to avoid timezone issues
	const postDate = new Date(dateStr + "T00:00:00Z");
	const today = new Date();
	const isToday =
		postDate.getUTCFullYear() === today.getUTCFullYear() &&
		postDate.getUTCMonth() === today.getUTCMonth() &&
		postDate.getUTCDate() === today.getUTCDate();
	return isToday
		? "Today"
		: postDate.toLocaleDateString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric",
		  });
};
