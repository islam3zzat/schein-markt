import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { z } from "zod";
import { compareSync } from "bcrypt-ts-edge";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type Credentials = z.infer<typeof credentialsSchema>;
function isCredentials(
  maybeCredentials: unknown
): maybeCredentials is Credentials {
  const result = credentialsSchema.safeParse(maybeCredentials);
  if (!result.success) {
    return false;
  }

  return true;
}
export const config: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
    signOut: "/signout",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!isCredentials(credentials)) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isMatch = compareSync(credentials.password, user.password);

        if (isMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
