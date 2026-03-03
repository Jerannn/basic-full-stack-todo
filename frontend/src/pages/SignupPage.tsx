// Hooks
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// stores
import useAuthStore from "@/stores/authStore";

// Icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

// types
import type { SignupForm } from "@/types/authTypes";

// Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    await signup(data);

    if (isSubmitSuccessful) {
      navigate("/dashboard");
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create new account below if you don't have
          </CardDescription>
          <CardAction>
            <Link
              to="/signin"
              className="text-sm font-medium pb-0.5 hover:border-b hover:border-black cursor-pointer"
            >
              Sign in
            </Link>
          </CardAction>
        </CardHeader>

        {error && (
          <p className="text-destructive text-sm mx-6 text-center bg-destructive/10 py-2 rounded-sm">
            {error}
          </p>
        )}

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                })}
                id="name"
                type="name"
                placeholder="Shou Tucker"
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {`${errors.name.message}` || "Error"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please enter a valid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {`${errors.email.message}` || "Error"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="password"
                type="password"
              />
              {errors.password && (
                <p className="text-destructive text-sm">
                  {`${errors.password.message}` || "Error"}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t border-gray-100">
          <Button type="button" variant="outline" className="w-full">
            <FaGoogle /> Sign up with Google
          </Button>
          <Button type="button" variant="outline" className="w-full">
            <FaGithub /> Sign up with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
