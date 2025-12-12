export type CommentData = {
	id: string;
	text: string;
	date: string;
};

export type CommentProps = {
	data: CommentData;
};

export const Comment = ({ data }: CommentProps) => {
	return (
		<div className="bg-white/5 p-4 rounded-lg border border-white/10">
			<p className="text-white mb-2">{data.text}</p>
			<p className="text-xs text-white/40">
				{new Date(data.date).toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				})}
			</p>
		</div>
	);
};
