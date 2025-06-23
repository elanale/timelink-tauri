import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "@ui/context/AuthContext.tsx";
import { auth } from "@utils/services/firebase.ts";

import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { loginSchema } from "@utils/schemas/auth.schema.ts";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      {
        title: "Login - Timelink",
      },
      {
        name: "description",
        content: "Log in to your Timelink account.",
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

function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    validators: {
      onChange: loginSchema,
    },
  });




  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const verifyAndNavigate = async () => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          navigate({ to: "/dashboard" });
        } else {
          setError("Please verify your email before logging in.");
          await signOut(auth);
        }
      }
    };

    if (!loading && user) {
      verifyAndNavigate();
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      await userCred.user.reload();
      if (!userCred.user.emailVerified) {
        await signOut(auth);
        return setError("Please verify your email before logging in.");
      }

      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Login failed.");
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
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Log In</h1>

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
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              type="password"
              value={field.state.value}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <button className="w-full" onClick={form.handleSubmit} type="submit">
        Log in
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
}
