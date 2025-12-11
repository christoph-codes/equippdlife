"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { Comment, CommentData } from "@/components/Comment";

export type CommentsProps = {
studySlug: string;
postSlug: string;
};

const Comments = ({ studySlug, postSlug }: CommentsProps) => {
// Initialize comments from localStorage
const [comments, setComments] = useState<CommentData[]>(() => {
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
const saveComments = (updatedComments: CommentData[]) => {
const storageKey = `study-comments-${studySlug}-${postSlug}`;
localStorage.setItem(storageKey, JSON.stringify(updatedComments));
setComments(updatedComments);
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (!newComment.trim()) return;

setIsSubmitting(true);

const comment: CommentData = {
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
<Textarea
value={newComment}
onChange={(e) => setNewComment(e.target.value)}
placeholder="Share your thoughts..."
className="min-h-[120px]"
disabled={isSubmitting}
/>
<Button
type="submit"
disabled={isSubmitting || !newComment.trim()}
className="mt-2"
>
{isSubmitting ? "Posting..." : "Post Comment"}
</Button>
</form>

{/* Comments List */}
<div className="space-y-4">
{comments.length === 0 ? (
<p className="text-white/60 text-center py-8">
No comments yet. Be the first to share your thoughts!
</p>
) : (
comments.map((comment) => (
<Comment key={comment.id} data={comment} />
))
)}
</div>
</div>
);
};

export default Comments;
