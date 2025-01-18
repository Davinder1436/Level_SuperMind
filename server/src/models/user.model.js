"use strict";
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
class UserModel {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
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
                cassandra_driver_1.types.LocalDate.fromString(userData.dob),
                cassandra_driver_1.types.LocalTime.fromString(userData.time),
                userData.gender,
                userData.state,
                userData.city,
                createdAt // Use a valid JavaScript Date object
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
                created_at: createdAt // Return the same timestamp
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
                created_at: user.created_at // Cassandra should return this as a valid timestamp
            };
        });
    }
}
exports.UserModel = UserModel;
