export type NavLink = {
	href: string;
	label: string;
	visible?: boolean;
};

export const navLinks: Record<string, NavLink> = {
	home: { href: "/", label: "Home" },
	devotions: { href: "/devotions", label: "Devotions", visible: true },
	store: { href: "/store", label: "Store", visible: false },
	music: { href: "/music", label: "Music", visible: false },
	about: { href: "/about", label: "About", visible: true },
	contact: { href: "/contact", label: "Contact", visible: true },
};
