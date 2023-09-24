import SgidClient from '@opengovsg/sgid-client';
import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';

export interface SgidProfile extends Record<string, any> {}

export default function SgidProvider<TProfile extends SgidProfile>(
  options: OAuthUserConfig<TProfile> & {
    clientPrivateKey: string;
    scopes: string[];
  }
): OAuthConfig<TProfile> {
  const client = new SgidClient({
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    privateKey: options.clientPrivateKey,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/sgid`,
  });

  return {
    id: 'sgid',
    name: 'Sgid',
    type: 'oauth',
    wellKnown: 'https://api.id.gov.sg/v2/.well-known/openid-configuration',
    authorization: {
      params: { scope: options.scopes.join(' ') },
    },
    idToken: true,
    checks: ['pkce', 'state'],
    profile: async (profile, token) => {
      const userInfo = await client.userinfo({
        accessToken: token.access_token!,
        sub: token.id_token!,
      });
      return {
        id: userInfo.sub,
        name: userInfo.data['myinfo.name'],
      };
    },
    token: {
      request: async ctx => {
        const { accessToken, sub } = await client.callback({
          code: ctx.params.code!,
          codeVerifier: ctx.checks.code_verifier!,
        });
        return {
          tokens: {
            access_token: accessToken,
            id_token: sub,
          },
        };
      },
    },
    userinfo: {
      request: async ctx => {
        const userInfo = await client.userinfo({
          accessToken: ctx.tokens.access_token!,
          sub: ctx.tokens.id_token!,
        });
        return {
          name: userInfo.data['myinfo.name'],
        };
      },
    },
    options,
  };
}
