import { types } from 'cassandra-driver';
import client from '../lib/astradb';
import { UserInput, UserResponse } from '../types/user.types';

export class UserModel {
  static async createUser(userData: UserInput & { hashedPassword: string }): Promise<UserResponse> {
    const query = `
      INSERT INTO users (
        email, name, password, dob, time, gender, state, city, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const createdAt = new Date(); // Current timestamp

    const params = [
      userData.email,
      userData.name,
      userData.hashedPassword,
      types.LocalDate.fromString(userData.dob),
      types.LocalTime.fromString(userData.time),
      userData.gender,
      userData.state,
      userData.city,
      createdAt // Use a valid JavaScript Date object
    ];

    await client.execute(query, params, { prepare: true });

    return {
      email: userData.email,
      name: userData.name,
      dob: userData.dob,
      time: userData.time,
      gender: userData.gender,
      state: userData.state,
      city: userData.city,
      created_at: createdAt // Return the same timestamp
    };
  }

  static async findByEmail(email: string): Promise<UserResponse & { password: string } | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const result = await client.execute(query, [email], { prepare: true });

    if (result.rowLength === 0) {
      return null;
    }

    const user = result.first();
    return {
      email: user.email,
      name: user.name,
      password: user.password,
      dob: user.dob.toString(),
      time: user.time.toString(),
      gender: user.gender,
      state: user.state,
      city: user.city,
      created_at: user.created_at // Cassandra should return this as a valid timestamp
    };
  }
}
