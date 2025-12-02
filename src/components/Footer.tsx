export default function Footer() {
	return (
		<footer className="w-full border-t border-primary-dark py-4 px-2 mt-8">
			<h4 className="text-center text-xl leading-none text-desert">
				Speak Truth in Love. Grow More Like Christ.
			</h4>
			<p className="max-w-4xl mb-0! mx-auto px-4 text-center text-sm text-desert-dark font-bold">
				&copy; {new Date().getFullYear()} Equippd. All rights reserved.
			</p>
		</footer>
	);
}
