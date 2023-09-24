import NextAuth, { NextAuthOptions } from 'next-auth';
import SgidProvider from 'pages/api/providers/sgid.provider';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    SgidProvider({
      clientId: process.env.SGID_CLIENT_ID,
      clientSecret: process.env.SGID_CLIENT_SECRET,
      clientPrivateKey: process.env.SGID_PRIVATE_KEY,
      scopes: ['openid', 'myinfo.name'],
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async jwt({ token }: { token: any }) {
      token.userRole = 'admin';
      return token;
    },
  },
};

export default NextAuth(authOptions);
