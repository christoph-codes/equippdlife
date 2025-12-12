import { Button } from "@/components/Button";

export type StudyPostHeaderProps = {
studyTitle: string;
studySlug: string;
};

const StudyPostHeader = ({ studyTitle, studySlug }: StudyPostHeaderProps) => {
return (
<header>
<div className="md:hidden">
<nav className="sticky top-16 z-40 bg-primary shadow flex items-center gap-2 px-4 py-3 border-b border-white justify-between">
<span className="font-bold text-lg text-white mr-4 shrink-0">
{studyTitle}
</span>
<Button variant="secondary" href={`/studies/${studySlug}`}>
Back to {studyTitle}
</Button>
</nav>
</div>
<div className="hidden md:block">
<nav className="sticky top-16 z-40 bg-primary shadow flex items-center gap-2 px-4 py-3 border-b border-white">
<Button variant="secondary" href={`/studies/${studySlug}`}>
← Back to {studyTitle}
</Button>
</nav>
</div>
</header>
);
};

export default StudyPostHeader;
