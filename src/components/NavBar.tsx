import { Link } from "@tanstack/react-router";

export default function NavBar() {
	return (
		<nav>
			<Link to="/">TimeLink</Link>
            <Link to="/dashboard">Dashboard</Link>
		</nav>
	);
}
