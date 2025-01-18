import { types } from 'cassandra-driver';
import client from '../lib/astradb';
import { UserInput, UserResponse } from '../types/user.types';
import axios from 'axios';

import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

interface GeoDetails {
  longitude: number;
  latitude: number;
}

export class UserModel {
  private static async getGeoDetails(state: string, city: string): Promise<GeoDetails> {
    try {
      const userId = process.env.ASTROLOGY_API_USER_ID;
      const apiKey = process.env.ASTROLOGY_API_KEY;
      const auth = Buffer.from(`${userId}:${apiKey}`).toString('base64');

      const response = await axios.post(
        'https://json.astrologyapi.com/v1/geo_details',
        {
          place: `${city}`,
          maxRows: 1,
        },
        {
          headers: {
            authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
            'Accept-Language': 'en',
          },
        }
      );
      
      return {
        longitude: response.data.geonames[0].longitude,
        latitude: response.data.geonames[0].latitude,
      };
    } catch (error) {
      // Default to center of India coordinates if API fails
      return {
        longitude: 78.9629,
        latitude: 20.5937,
      };
    }
  }

  static async createUser(userData: UserInput & { hashedPassword: string }): Promise<UserResponse> {
    // Get geo details based on state and city
    const { longitude, latitude } = await this.getGeoDetails(userData.state, userData.city);
  
    const query = `
      INSERT INTO users (
        email, name, password, dob, time, gender, state, city, 
        longitude, latitude, timezone, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const createdAt = new Date();

    const params = [
      userData.email,
      userData.name,
      userData.hashedPassword,
      types.LocalDate.fromString(userData.dob),
      types.LocalTime.fromString(userData.time),
      userData.gender,
      userData.state,
      userData.city,
      longitude,
      latitude,
      5.5, // Hardcoded timezone for IST
      createdAt
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
      longitude : longitude || 78.9629,
      latitude : latitude || 20.5937,
      timezone: 5.5,
      created_at: createdAt
    };
  }

  static async findByEmail(email: string): Promise<(UserResponse & { password: string }) | null> {
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
      longitude: user.longitude,
      latitude: user.latitude,
      timezone: user.timezone || 5.5,
      created_at: user.created_at
    };
  }
}