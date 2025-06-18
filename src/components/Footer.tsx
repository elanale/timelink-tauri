const currentYear = new Date().getFullYear();

export default function Footer() {
	return (
		<footer className="bg-slate-950 border-t border-slate-800 text-sm text-gray-400 px-6 py-8">
			<div className="text-center">
				© {currentYear} TimeLink. Built with ❤️ using Tauri by Elan Wygodski.
			</div>
		</footer>
	);
}
