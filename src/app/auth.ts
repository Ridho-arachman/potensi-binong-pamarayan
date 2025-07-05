import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/password";
import prisma from "@/lib/prisma";

async function getUserFromDb(email: string, plainPassword: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const isMatch = await comparePassword(plainPassword, user.password);
  if (!isMatch) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const email = String(credentials.email);
        const password = String(credentials.password);
        user = await getUserFromDb(email, password);
        if (!user) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
});
