"use client";

import { useState } from "react";

export type Comment = {
id: string;
text: string;
date: string;
};

export type CommentsProps = {
studySlug: string;
postSlug: string;
};

const Comments = ({ studySlug, postSlug }: CommentsProps) => {
// Initialize comments from localStorage
const [comments, setComments] = useState<Comment[]>(() => {
if (typeof window === "undefined") return [];
const storageKey = `study-comments-${studySlug}-${postSlug}`;
const stored = localStorage.getItem(storageKey);
if (stored) {
try {
return JSON.parse(stored);
} catch (e) {
console.error(`Failed to parse comments for ${storageKey}`, e);
return [];
}
}
return [];
});
const [newComment, setNewComment] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);

// Save comments to localStorage
const saveComments = (updatedComments: Comment[]) => {
const storageKey = `study-comments-${studySlug}-${postSlug}`;
localStorage.setItem(storageKey, JSON.stringify(updatedComments));
setComments(updatedComments);
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (!newComment.trim()) return;

setIsSubmitting(true);

const comment: Comment = {
id: Date.now().toString(),
text: newComment.trim(),
date: new Date().toISOString(),
};

const updatedComments = [comment, ...comments];
saveComments(updatedComments);
setNewComment("");
setIsSubmitting(false);
};

return (
<div className="w-full mt-8 border-t border-white/20 pt-8">
<h2 className="text-2xl font-bold mb-6 text-white">Discussion</h2>

{/* Comment Form */}
<form onSubmit={handleSubmit} className="mb-8">
<textarea
value={newComment}
onChange={(e) => setNewComment(e.target.value)}
placeholder="Share your thoughts..."
className="w-full p-4 bg-white/10 text-white rounded-lg border border-white/20 focus:border-desert focus:outline-none resize-none min-h-[120px]"
disabled={isSubmitting}
/>
<button
type="submit"
disabled={isSubmitting || !newComment.trim()}
className="mt-2 px-6 py-2 bg-desert text-primary font-bold rounded hover:bg-desert/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
>
{isSubmitting ? "Posting..." : "Post Comment"}
</button>
</form>

{/* Comments List */}
<div className="space-y-4">
{comments.length === 0 ? (
<p className="text-white/60 text-center py-8">
No comments yet. Be the first to share your thoughts!
</p>
) : (
comments.map((comment) => (
<div
key={comment.id}
className="bg-white/5 p-4 rounded-lg border border-white/10"
>
<p className="text-white mb-2">{comment.text}</p>
<p className="text-xs text-white/40">
{new Date(comment.date).toLocaleDateString(undefined, {
year: "numeric",
month: "long",
day: "numeric",
hour: "2-digit",
minute: "2-digit",
})}
</p>
</div>
))
)}
</div>
</div>
);
};

export default Comments;
