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
// src/routes/astro-details.routes.ts
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const getAstroDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body.userId; // Set by auth middleware
        // Fetch user data
        const user = yield user_model_1.UserModel.findByEmail(userEmail);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Parse date and time
        const [year, month, day] = user.dob.split('-').map(Number);
        const [hour, min] = user.time.split(':').map(Number);
        // Prepare data for astrology API
        const requestData = {
            day,
            month,
            year,
            hour,
            min,
            lat: Number(user.latitude) || 0,
            lon: Number(user.longitude) || 0,
            tzone: Number(user.timezone) || 5.5,
        };
        // Astrology API credentials
        const userId = process.env.ASTROLOGY_API_USER_ID;
        const apiKey = process.env.ASTROLOGY_API_KEY;
        const language = process.env.ASTROLOGY_API_LANGUAGE || 'en';
        if (!userId || !apiKey) {
            res.status(500).json({ message: 'API credentials not configured' });
            return;
        }
        // Create authorization header
        const auth = Buffer.from(`${userId}:${apiKey}`).toString('base64');
        // Make request to astrology API
        const response = yield (0, axios_1.default)({
            method: 'POST',
            url: 'https://json.astrologyapi.com/v1/astro_details',
            headers: {
                'authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
                'Accept-Language': language
            },
            data: requestData
        });
        // Return the API response
        res.json(response.data);
    }
    catch (error) {
        console.error('Astro details error:', error);
        res.status(500).json({ message: 'Failed to get astro details' });
    }
});
// Reuse the same authMiddleware from previous routes
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        // Your token verification logic here
        // Assuming it sets req.body.userId
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
router.get('/astro_details', authMiddleware, getAstroDetails);
exports.default = router;
