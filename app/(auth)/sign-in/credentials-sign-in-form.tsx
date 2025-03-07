"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user-actions";
import { SignInDefaultValues } from "@/lib/constants/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" variant="default">
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
};

const CredentialsSignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <form className="space-y-6" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
      </div>
      <div>
        <SignInButton />
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

export default CredentialsSignInForm;
