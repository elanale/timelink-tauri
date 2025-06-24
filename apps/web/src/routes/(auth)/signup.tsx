import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@timelink/ui/context/AuthContext.tsx";
import { auth, db } from "@timelink/utils/firebase";

import { type AnyFieldApi, useForm } from "@tanstack/solid-form";
import { Link, createFileRoute, useNavigate } from "@tanstack/solid-router";

import { signupSchema } from "@timelink/utils/schemas/auth.schema.ts";

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
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<SignupInput>({
		defaultValues: { name: "", email: "", password: "" },
		onSubmit: async ({ value }) => {
			setError(null);
			try {
				const cred = await createUserWithEmailAndPassword(
					auth,
					value.email,
					value.password,
				);
				await updateProfile(cred.user, { displayName: value.name });
				await setDoc(doc(db, "users", cred.user.uid), {
					name: value.name,
					email: value.email,
					joinedAt: serverTimestamp(),
					role: "user",
					emailVerified: cred.user.emailVerified,
				});
				await sendEmailVerification(cred.user);
				navigate({ to: "/login" });
			} catch (err: any) {
				setError(err.message || "Signup failed.");
			}
		},
		validators: { onSubmit: signupSchema },
	});

	useEffect(() => {
		if (!loading && user) {
			navigate({ to: "/dashboard" });
		}
	}, [user, loading, navigate]);

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

			<form.Field name="name">
				{(field) => (
					<div>
						<label className="block mb-1" htmlFor={field.name}>
							Full Name
						</label>
						<input
							className="p-2 w-full"
							id={field.name}
							name={field.name}
							onChange={(e) => field.handleChange(e.target.value)}
							type="text"
							value={field.state.value}
						/>
						<FieldInfo field={field} />
					</div>
				)}
			</form.Field>

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
