"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { NavLink, navLinks } from "@/lib/navLinks";
import { CartIcon } from "@/components/store/CartIcon";

export function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (isMobileMenuOpen) {
			// Prevent background scroll
			document.body.style.overflowY = "hidden";
			document.body.style.position = "fixed";
			document.body.style.width = "100%";
		} else {
			// Restore scroll
			document.body.style.overflowY = "";
			document.body.style.position = "";
			document.body.style.width = "";
		}
		// Clean up on unmount
		return () => {
			document.body.style.overflowY = "";
			document.body.style.position = "";
			document.body.style.width = "";
		};
	}, [isMobileMenuOpen]);

	return (
		<header className="sticky top-0 z-50 bg-primary shadow flex items-center justify-between px-4 py-3 border-b border-primary-dark">
			<Link href="/" className="flex items-center gap-2">
				<Image
					src="/equippd_logo_desert.svg"
					alt="Equippd Logo"
					className="w-16"
					width={64}
					height={20}
				/>
			</Link>
			<nav className="hidden sm:flex items-center gap-6">
				{Object.values(navLinks)
					.filter((link): link is NavLink => (link as NavLink).visible === true)
					.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="transition-colors hover:text-desert font-bold uppercase text-white"
						>
							{link.label}
						</Link>
					))}
				<CartIcon />
			</nav>
			<nav className="sm:hidden flex items-center gap-2">
				<CartIcon />
				{/* Hamburger menu for mobile */}
				<button
					className="p-2 rounded focus:outline-none focus:ring"
					aria-label="Open menu"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6 text-white"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</nav>
			{/* Mobile menu - animated slide-in sidebar */}
			<aside
				className={`absolute top-0 right-0 bottom-0 w-4/5 h-screen border-l bg-primary shadow-md flex flex-col transition-all duration-400 transform z-50 ${
					isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
			>
				<div className="flex justify-between items-center">
					<Image
						className="w-24 pl-3"
						src="/equippd_logo_abbr.svg"
						alt="Equippd logo"
						width={400}
						height={60}
					/>
					<button
						className="p-6 text-white cursor-pointer"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<FaXmark size={24} />
					</button>
				</div>
				<div className="flex flex-col justify-between flex-1 min-h-0">
					<div className="">
						{Object.values(navLinks)
							.filter((link): link is NavLink => link.visible === true)
							.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="block px-4 py-2 text-white font-bold text-2xl"
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								>
									{link.label}
								</Link>
							))}
					</div>
					<p className="border-t border-white text-white/60 text-base px-4 py-3">
						<span className="block font-bold text-white text-xl uppercase">
							Unity in Christ
						</span>
						Copyright © {new Date().getFullYear()} Equippd
					</p>
				</div>
			</aside>
		</header>
	);
}
