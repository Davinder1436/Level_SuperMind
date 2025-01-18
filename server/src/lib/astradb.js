"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// src/lib/astradb.ts
const cassandra_driver_1 = require("cassandra-driver");
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Load environment variables from .env
const client = new cassandra_driver_1.Client({
    cloud: {
        secureConnectBundle: process.env.ASTRA_DB_SECURE_BUNDLE_PATH,
    },
    credentials: {
        username: process.env.ASTRA_DB_CLIENT_ID,
        password: process.env.ASTRA_DB_CLIENT_SECRET,
    },
    keyspace: process.env.ASTRA_DB_KEYSPACE,
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected to Astra DB");
        // Create user table if not exists
        yield client.execute(`
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
    }
    catch (error) {
        console.error("Error connecting to Astra DB:", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
exports.default = client;
