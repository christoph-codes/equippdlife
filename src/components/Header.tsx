import Link from "next/link";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/devotions", label: "Devotions", visible: true },
	{ href: "/store", label: "Store", visible: false },
	{ href: "/music", label: "Music", visible: false },
	{ href: "/about", label: "About", visible: true },
	{ href: "/contact", label: "Contact", visible: true },
];

export function Header() {
	return (
		<header className="sticky top-0 z-50 bg-primary shadow flex items-center justify-between px-4 py-3 border-b border-white">
			<Link href="/" className="flex items-center gap-2">
				<img
					src="/equippd_logo_desert.svg"
					alt="Equippd Logo"
					className="w-16"
				/>
			</Link>
			<nav className="hidden sm:flex gap-6">
				{navLinks
					.filter((link) => link.visible)
					.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="hover:text-primary-200 font-medium text-white"
						>
							{link.label}
						</Link>
					))}
			</nav>
		</header>
	);
}
