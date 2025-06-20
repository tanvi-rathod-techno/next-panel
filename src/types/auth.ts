// src/types/auth.ts

export interface LoginPayload {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    accessToken: string;
  }
  