import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { CredentialsSignUpForm } from "./credentials-sign-up-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to your account",
};

type Props = {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
};
const SignUpPage = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4 text-center flex-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
