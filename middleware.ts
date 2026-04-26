import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if it's an API route
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const acceptHeader = request.headers.get('accept') || '';
    const secFetchDest = request.headers.get('sec-fetch-dest');

    // Prevent direct browser access to API routes.
    // When a user types the URL in the browser, it requests HTML (sec-fetch-dest: document).
    // API calls via fetch/XHR do not.
    if (secFetchDest === 'document' || acceptHeader.includes('text/html')) {
      return new NextResponse('STOP IT!!, Enough of debugging. Go and Enjoy the Stories.' + '\n' + 'Enjoy Life my friend. ITS TOO SHORT TO DEBUG - Saikat ', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}
