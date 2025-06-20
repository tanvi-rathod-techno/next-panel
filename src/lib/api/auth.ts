// src/lib/api/auth.ts

import type { LoginPayload, LoginResponse } from "@/types/auth";


export async function loginUser({
  username,
  password,
}: LoginPayload): Promise<LoginResponse> {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // So browser sends and receives cookies
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return res.json();
}


export async function logoutUser(): Promise<void> {
  const res = await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include', // send cookie with request
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  // Clear localStorage if you're storing user data
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}
