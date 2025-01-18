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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const cassandra_driver_1 = require("cassandra-driver");
const astradb_1 = __importDefault(require("../lib/astradb"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Load environment variables from .env
class UserModel {
    static getGeoDetails(state, city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = process.env.ASTROLOGY_API_USER_ID;
                const apiKey = process.env.ASTROLOGY_API_KEY;
                const auth = Buffer.from(`${userId}:${apiKey}`).toString('base64');
                const response = yield axios_1.default.post('https://json.astrologyapi.com/v1/geo_details', {
                    place: `${city}`,
                    maxRows: 1,
                }, {
                    headers: {
                        authorization: `Basic ${auth}`,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'en',
                    },
                });
                return {
                    longitude: response.data.geonames[0].longitude,
                    latitude: response.data.geonames[0].latitude,
                };
            }
            catch (error) {
                // Default to center of India coordinates if API fails
                return {
                    longitude: 78.9629,
                    latitude: 20.5937,
                };
            }
        });
    }
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get geo details based on state and city
            const { longitude, latitude } = yield this.getGeoDetails(userData.state, userData.city);
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
                cassandra_driver_1.types.LocalDate.fromString(userData.dob),
                cassandra_driver_1.types.LocalTime.fromString(userData.time),
                userData.gender,
                userData.state,
                userData.city,
                longitude,
                latitude,
                5.5, // Hardcoded timezone for IST
                createdAt
            ];
            yield astradb_1.default.execute(query, params, { prepare: true });
            return {
                email: userData.email,
                name: userData.name,
                dob: userData.dob,
                time: userData.time,
                gender: userData.gender,
                state: userData.state,
                city: userData.city,
                longitude: longitude || 78.9629,
                latitude: latitude || 20.5937,
                timezone: 5.5,
                created_at: createdAt
            };
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE email = ?';
            const result = yield astradb_1.default.execute(query, [email], { prepare: true });
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
        });
    }
}
exports.UserModel = UserModel;
