import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // You can set REVALIDATE_SECRET in your Cloudflare/Vercel environment variables
    // and send it from your admin dashboard to secure this endpoint.
    if (!process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Server missing REVALIDATE_SECRET' }, { status: 500 });
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 });
    }

    revalidatePath(path);
    
    return NextResponse.json({ 
      revalidated: true, 
      path, 
      message: `Successfully revalidated ${path}` 
    });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
