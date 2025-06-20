// app/api/logout/route.ts
import { NextResponse } from 'next/server';


export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the cookie by setting it to empty and expiring it
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // Expire immediately
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
