import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired(async function middileware(
  _req: NextRequest,
) {
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)'],
};
