import * as z from "zod/v4";

const limits = {
	name: {
		min: 1,
		max: 64,
	},
	password: {
		min: 8,
		max: 32,
	},
};

export const userSchema = z.object({
	name: z.string().trim(),
	age: z.number().int().positive(),
	email: z.string().email().trim(),
	password: z.string(),
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(limits.password.min, "Password is required"),
});

export const signupSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(
			limits.name.max,
			`Name must be at most ${limits.name.max} characters long`,
		)
		.trim(),
	email: z
		.string()
		.email("Invalid email address")
		.min(1, "Email is required")
		.endsWith(".edu", "Email must end with .edu")
		.trim(),
	password: z
		.string()
		.min(
			limits.password.min,
			`Password must be at least ${limits.password.min} characters long`,
		)
		.max(
			limits.password.max,
			`Password must be at most ${limits.password.max} characters long`,
		),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
