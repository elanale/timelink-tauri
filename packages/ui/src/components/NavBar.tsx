import { Link, useNavigate } from "@tanstack/solid-router";
import { auth } from "@utils/firebase";
import { signOut } from "firebase/auth";
import { Show, type Component } from "solid-js";
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
					className="text-2xl font-bold text-blue-600 dark:text-blue-400"
					to="/"
				>
					TimeLink
				</Link>
				<ul className="flex gap-6 items-center text-gray-700 dark:text-gray-200 font-medium">
					<Show when={user()}>
						<>
							<li>
								<Link
									className="hover:text-blue-500 dark:hover:text-blue-300 transition"
									to="/dashboard"
								>
									Dashboard
								</Link>
							</li>
							<li>
								<button
									className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
									onClick={handleLogout}
									type="button"
								>
									Logout
								</button>
							</li>
						</>
					</Show>
					<Show when={!user()}>
						<>
							<li>
								<Link
									className="hover:text-blue-500 dark:hover:text-blue-300 transition"
									to="/"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									className="hover:text-blue-500 dark:hover:text-blue-300 transition"
									to="/login"
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									className="hover:text-blue-500 dark:hover:text-blue-300 transition"
									to="/signup"
								>
									Sign Up
								</Link>
							</li>
						</>
					</Show>
				</ul>
			</nav>
		</header>
	);
};

export default NavBar;
