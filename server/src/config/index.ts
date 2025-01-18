import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  astrologyApi: {
    userId: process.env.ASTROLOGY_API_USER_ID,
    apiKey: process.env.ASTROLOGY_API_KEY,
    language: process.env.ASTROLOGY_API_LANGUAGE || 'en',
  }
};