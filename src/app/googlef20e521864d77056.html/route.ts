import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: googlef20e521864d77056.html', {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
