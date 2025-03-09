"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatPrismaErrors } from "../error-utils";

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

    return { success: false, message: "Invalid email or password" };
  }
}

type SignUpInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function signUpWithCredentials(
  _prevState: unknown,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const {
    success,
    data: user,
    error,
  } = signUpFormSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!success) {
    const fieldErrors = error.errors.reduce(
      (acc: Partial<SignUpInput>, error) => {
        const field = error.path[0] as keyof SignUpInput;
        acc[field] = error.message;

        return acc;
      },
      {}
    );
    return { success, fieldErrors, message: "Invalid form data" };
  }

  const plainPassword = user.password;

  try {
    user.password = hashSync(plainPassword, 10);
  } catch {
    return {
      success: false,
      fieldErrors: null,
      message: "Error hashing password",
    };
  }
  try {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    const message = formatPrismaErrors(error) || "Error creating user";
    return { success: false, fieldErrors: null, message };
  }

  try {
    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success, message: "Sign in successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      fieldErrors: null,
      message: "User not registered",
    };
  }
}

export async function signOutUser() {
  await signOut();
  return;
}
