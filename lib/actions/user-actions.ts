"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";

export async function signInWithCredentials(
  _prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { success, data: user } = signInFormSchema.safeParse({
    email,
    password,
  });

  if (!success) {
    return { success, message: "Invalid email or password" };
  }

  try {
    await signIn("credentials", user);
    return { success, message: "Sign in successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function signOutUser() {
  await signOut();
  return { success: true, message: "Sign out successful" };
}
