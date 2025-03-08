"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithCredentials } from "@/lib/actions/user-actions";
import { SignInDefaultValues } from "@/lib/constants/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" variant="default">
      {pending ? "Signing up..." : "Sign Up"}
    </Button>
  );
};

export const CredentialsSignUpForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [data, action] = useActionState(signUpWithCredentials, {
    success: false,
    message: "",
    fieldErrors: {},
  });

  return (
    <form className="space-y-6" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={SignInDefaultValues.name || ""}
          required
        />
        {/* error message */}
        <div className="text-destructive">{data?.fieldErrors?.email}</div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={SignInDefaultValues?.email || ""}
          required
        />
        {/* error message */}
        <div className="text-destructive">{data?.fieldErrors?.email}</div>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          defaultValue={SignInDefaultValues?.password || ""}
          required
        />
        {/* error message */}
        <div className="text-destructive">{data?.fieldErrors?.password}</div>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="password"
          defaultValue={SignInDefaultValues.password || ""}
          required
        />
        {/* error message */}
        <div className="text-destructive">
          {data?.fieldErrors?.confirmPassword}
        </div>
      </div>
      <div>
        <SignUpButton />
      </div>

      {data && !data.success ? (
        <div className="text-center text-destructive">{data.message}</div>
      ) : (
        <div />
      )}
      <div className="text-center text-muted-foreground">
        {"Don't have an account? "}
        <Link href="/sign-up" target="_self" className="underline">
          Sign up
        </Link>
      </div>
    </form>
  );
};
