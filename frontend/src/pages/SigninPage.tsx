// Hooks
import { useForm } from "react-hook-form";

// Icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

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
import useAuthStore from "@/stores/authStore";
import type { SigninForm } from "@/types/authTypes";

export default function SigninPage() {
  const signin = useAuthStore((state) => state.signin);
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SigninForm>();

  const onSubmit = async (data: SigninForm) => {
    await signin(data);
    reset();
  };
  console.log(user);

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" className="cursor-pointer">
              Sign up
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
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
              <div className="flex justify-between items-center m-0">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  className="cursor-pointer p-0"
                >
                  Forgot your password
                </Button>
              </div>
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
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t border-gray-100">
          <Button type="button" variant="outline" className="w-full">
            <FaGoogle /> Login with Google
          </Button>
          <Button type="button" variant="outline" className="w-full">
            <FaGithub /> Login with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
