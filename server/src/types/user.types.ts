export interface UserInput {
    name: string;
    email: string;
    password?: string;
    dob: string; // Format: YYYY-MM-DD
    time: string; // Format: HH:mm:ss
    gender: 'male' | 'female' | 'other';
    state: string;
    city: string;
  }
  
  export interface UserResponse {
    email: string;
    name: string;
    dob: string;
    time: string;
    gender: string;
    state: string;
    city: string;
    created_at: Date;
  }