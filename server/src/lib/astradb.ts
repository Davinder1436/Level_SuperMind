// src/lib/astradb.ts
import { Client } from "cassandra-driver";
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env


const client = new Client({
  cloud: {
    secureConnectBundle: process.env.ASTRA_DB_SECURE_BUNDLE_PATH as string,
  },
  credentials: {
    username: process.env.ASTRA_DB_CLIENT_ID as string,
    password: process.env.ASTRA_DB_CLIENT_SECRET as string,
  },
  keyspace: process.env.ASTRA_DB_KEYSPACE as string,
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to Astra DB");
    
    // Create user table if not exists
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        email text PRIMARY KEY,
        name text,
        password text,
        dob date,
        time time,
        gender text,
        state text,
        city text,
        created_at timestamp
      );
    `);
    
    console.log("User table initialized");
  } catch (error) {
    console.error("Error connecting to Astra DB:", error);
    process.exit(1);
  }
};

export default client;