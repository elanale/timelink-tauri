import { Link, useNavigate } from "@tanstack/react-router"; // ✅ Added useNavigate
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase.ts";

export default function NavBar() {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ Create navigation hook

  const handleLogout = async () => {
    await signOut(auth);
    navigate({ to: "/login" }); // ✅ Redirect after logout
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          TimeLink
        </Link>

        <ul className="flex gap-6 items-center text-gray-700 dark:text-gray-200 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-300 transition">
              Home
            </Link>
          </li>

          {user && (
            <li>
              <Link to="/dashboard" className="hover:text-blue-500 dark:hover:text-blue-300 transition">
                Dashboard
              </Link>
            </li>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-500 dark:hover:text-blue-300 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-500 dark:hover:text-blue-300 transition">
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
}
