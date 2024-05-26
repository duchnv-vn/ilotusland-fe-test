import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { getUrl } from './utils/url';
import { APP_DOMAIN } from './config/env';

export default async function middileware(req: NextRequest) {
  const originalPathName = req.nextUrl.pathname;
  const isAuthApiRequest = originalPathName.includes('/api/auth/');

  if (isAuthApiRequest) return NextResponse.next();

  const session = await getSession();

  if (!session) {
    return NextResponse.redirect(getUrl(APP_DOMAIN, 'login'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)'],
};
