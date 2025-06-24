import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@ui/context/AuthContext.tsx";
import { auth, db } from "@utils/firebase";

import { type AnyFieldApi, useForm } from "@tanstack/solid-form";
import { Link, createFileRoute, useNavigate } from "@tanstack/solid-router";

import { signupSchema } from "@utils/schemas/auth.schema.ts";

export const Route = createFileRoute("/signup")({
	component: Signup,
	head: () => ({
		meta: [
			{
				title: "Signup - Timelink",
			},
			{
				name: "description",
				content: "Create a new account on Timelink.",
			},
		],
	}),
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<p className="mt-1 text-red-600 text-sm">
					{field.state.meta.errors.map((err) => err.message).join(",")}
				</p>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}

function Signup() {
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
		validators: {
			onChange: signupSchema,
		},
	});

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

		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

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

			alert(
				"Verification email sent! Please check your inbox before logging in.",
			);
			navigate({ to: "/login" });
		} catch (err: any) {
			setError(err.message || "Signup failed.");
		}
	};

	return (
		<form
			className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
				Sign Up
			</h1>

			<input
				type="text"
				placeholder="Full Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
			/>
			<form.Field name="email">
				{(field) => (
					<div>
						<label className="block mb-1" htmlFor={field.name}>
							Email
						</label>
						<input
							className="p-2 w-full"
							id={field.name}
							name={field.name}
							onChange={(e) => field.handleChange(e.target.value)}
							type="email"
							value={field.state.value}
						/>
						<FieldInfo field={field} />
					</div>
				)}
			</form.Field>

			<form.Field name="password">
				{(field) => (
					<div>
						<label className="block mb-1" htmlFor={field.name}>
							Password
						</label>
						<input
							className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
							id={field.name}
							name={field.name}
							onChange={(e) => field.handleChange(e.target.value)}
							type="password"
							value={field.state.value}
						/>
						<FieldInfo field={field} />
					</div>
				)}
			</form.Field>

			<button
				className="cursor-pointer p-4 w-full"
				onClick={form.handleSubmit}
				type="submit"
			>
				Sign up
			</button>
			<p>
				Already have an account? <Link to="/login">Log in</Link>
			</p>
		</form>
	);
}
