import { Button } from "@/components/Button";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-centerfont-sans">
			<header className="sr-only">Unity in Christ</header>
			<main className="flex min-h-screen w-full flex-col items-center justify-center ">
				<div className="flex flex-col justify-center text-center items-center gap-12 animate-fade-in">
					<Image
						className="animate-fade-in"
						src="/equippd_logo_desert.svg"
						alt="Equippd logo"
						width={200}
						height={40}
						priority
					/>
					<h1 className="sr-only">Equippd</h1>
					<div className="flex divide-x">
						<Button className="py-1 px-12" href="/about">
							Study
						</Button>
						<Button className="py-1 px-12" href="/store">
							Shop
						</Button>
						<Button className="py-1 px-12" href="/contact">
							Music
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
