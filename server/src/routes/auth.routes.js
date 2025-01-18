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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const password_utils_1 = require("../utils/password.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = require("../models/user.model");
const router = (0, express_1.Router)();
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { email, password } = _a, userData = __rest(_a, ["email", "password"]);
        // Validate input
        if (!email || !password || !userData.name || !userData.dob ||
            !userData.time || !userData.gender || !userData.state || !userData.city) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // Check if user exists
        const existingUser = yield user_model_1.UserModel.findByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = yield (0, password_utils_1.hashPassword)(password);
        // Create user
        const user = yield user_model_1.UserModel.createUser(Object.assign(Object.assign({}, userData), { email,
            hashedPassword }));
        const token = (0, jwt_utils_1.generateToken)(email);
        res.status(201).json({ user, token });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const signinHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const user = yield user_model_1.UserModel.findByEmail(email);
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const isValidPassword = yield (0, password_utils_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = (0, jwt_utils_1.generateToken)(email);
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        res.json({
            user: userWithoutPassword,
            token
        });
    }
    catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/signup', signupHandler);
router.post('/signin', signinHandler);
exports.default = router;
