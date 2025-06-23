import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@ui/context/AuthContext.tsx";
import { auth, db } from "@utils/services/firebase.ts";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, loading]);

  const isEduEmail = (email: string) => email.trim().endsWith(".edu");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isEduEmail(email)) {
      setError("Only .edu email addresses are allowed.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Set the display name
      await updateProfile(userCred.user, { displayName: name });

      // Save user info to Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        joinedAt: Date.now(),
        role: "user",
        emailVerified: false,
      });

      // Send email verification
      await sendEmailVerification(userCred.user);

      alert("Verification email sent! Please check your inbox before logging in.");
      navigate({ to: "/login" });
    } catch (err: any) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <input
          type="email"
          placeholder=".edu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}
