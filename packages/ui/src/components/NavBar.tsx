import { Link, useNavigate } from "@tanstack/solid-router";
import { auth } from "@utils/firebase";
import { signOut } from "firebase/auth";
import { type Component } from "solid-js";
import { useAuth } from "../context/AuthContext.tsx";

const NavBar: Component = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		navigate({ to: "/login" });
	};

	return (
		<header className="bg-white dark:bg-gray-900 shadow-md">
			<nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
				<Link
					to="/"
					className="text-2xl font-bold text-blue-600 dark:text-blue-400"
				>
					TimeLink
				</Link>

				<ul className="flex gap-6 items-center text-gray-700 dark:text-gray-200 font-medium">
					<li>
						<Link
							to="/"
							className="hover:text-blue-500 dark:hover:text-blue-300 transition"
						>
							Home
						</Link>
					</li>

					{user && (
						<li>
							<Link
								to="/dashboard"
								className="hover:text-blue-500 dark:hover:text-blue-300 transition"
							>
								Dashboard
							</Link>
						</li>
					)}

					{!user && (
						<>
							<li>
								<Link
									to="/login"
									className="hover:text-blue-500 dark:hover:text-blue-300 transition"
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to="/signup"
									className="hover:text-blue-500 dark:hover:text-blue-300 transition"
								>
									Sign Up
								</Link>
							</li>
						</>
					)}

					{user && (
						<li>
							<button
								type="button"
								onClick={handleLogout}
								className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
							>
								Logout
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default NavBar;
