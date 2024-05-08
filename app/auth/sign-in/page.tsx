"use client";
import Image from "next/image";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  addSignup,
  removeSignup,
  updateSignup,
  selectSignups,
} from "@slices/users";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import withoutAuth from "@/app/withoutAuth";
function SignInPage() {
  const users = useSelector((state: RootState) => selectSignups(state));
  const [signInForm, setSignInForm] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const router = useRouter();
  const handleSignIn = async (newSignup: {
    email: string;
    password: string;
  }) => {
    const signInUser = users?.filter(
      (each) =>
        each.email === newSignup.email && each.password === newSignup.password
    );
    if (signInUser.length) {
      const oneDay = 24 * 60 * 60 * 1000;
      await setCookie("userId", signInUser[0].id, {
        maxAge: Date.now() - oneDay,
      });
      router.push("/");
    }
  };

  return (
    <div className="w-screen h-screen lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center h-screen ">
        <div className="mx-auto grid w-[50%] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setSignInForm({ ...signInForm, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                {/* <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                onChange={(e) =>
                  setSignInForm({ ...signInForm, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleSignIn(signInForm)}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <Image
          src="https://i.pinimg.com/736x/4a/90/33/4a903338c0e478248153bd8f3f6f6745.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.5]"
        />
      </div>
    </div>
  );
}
export default SignInPage;
