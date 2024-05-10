"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import {
  addSignup,
  removeSignup,
  updateSignup,
  selectSignups,
} from "@slices/users";
import { Signup } from "@/redux/interfaces/users";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import withoutAuth from "@/app/withoutAuth";

function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();
  const signups = useSelector((state: RootState) => selectSignups(state));
  const router = useRouter();
  const [signUpUser, setSignUpUser] = useState<Signup>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleAddSignup = (newSignup: Signup) => {
    console.log("newSignup", newSignup);
    dispatch(addSignup({ ...newSignup, id: uuidv4() }));
    router.push("/sign-in");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  id="first-name"
                  placeholder="First Name"
                  required
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="last-name"
                  placeholder="Last Name"
                  required
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setSignUpUser({ ...signUpUser, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setSignUpUser({ ...signUpUser, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleAddSignup(signUpUser)}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
export default withoutAuth(SignUpForm);
