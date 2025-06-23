import * as z from "zod";

const formValidation = {
    nameMax: 50,
    subject: { min: 5, max: 100 },
    message: { min: 30, max: 1000 },
};

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export const signupSchema = z.object({
});