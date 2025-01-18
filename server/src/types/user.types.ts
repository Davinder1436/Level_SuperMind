// src/types/user.types.ts
export interface UserInput {
    email: string;
    name: string;
    password?: string;
    dob: string;
    time: string;
    gender: string;
    state: string;
    city: string;
    longitude?: number;
    latitude?: number;
    timezone?: number;
  }
  
  export interface UserResponse {
    email: string;
    name: string;
    dob: string;
    time: string;
    gender: string;
    state: string;
    city: string;
    longitude: number;
    latitude: number;
    timezone: number;
    created_at: Date;
  }