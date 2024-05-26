import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { APP_DOMAIN, AUTH0_AUDIENCE } from '@/config/env';

export const GET = handleAuth({
  callback: handleCallback((_req) => ({
    authorizationParams: {
      redirect_uri: APP_DOMAIN,
      audience: AUTH0_AUDIENCE,
      scope: 'read:current_user update:current_user_metadata',
    },
  })),
});
