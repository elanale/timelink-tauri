import { Link } from "@tanstack/react-router";

export default function NavBar() {
	return (
		<nav className="flex items-center">
			<Link to="/">TimeLink</Link>
			<Link to="/dashboard">Dashboard</Link>
		</nav>
	);
}
