import { type Component } from "solid-js";

const currentYear = new Date().getFullYear();

const Footer: Component = () => {
	return (
		<footer className="bg-slate-950 border-t border-slate-800 text-sm text-gray-400 px-6 py-8">
			<div className="text-center">
				© {currentYear} TimeLink. Built with ❤️ using Tauri.
			</div>
		</footer>
	);
};

export default Footer;
