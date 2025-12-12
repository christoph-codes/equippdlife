export type NavLink = {
	href: string;
	label: string;
	visible?: boolean;
};

export const navLinks: Record<string, NavLink> = {
	home: { href: "/", label: "Home" },
	devotions: { href: "/devotions", label: "Devotions", visible: true },
	studies: { href: "/studies", label: "Studies", visible: true },
	store: { href: "/store", label: "Store", visible: false },
	study: { href: "/study", label: "Study", visible: false },
	music: { href: "/pages/music", label: "Music", visible: true },
	about: { href: "/pages/about", label: "About", visible: true },
	requestPrayer: {
		href: "/pages/resources/request-prayer",
		label: "Request Prayer",
		visible: true,
	},
	contact: { href: "/pages/contact", label: "Contact", visible: false },
};
