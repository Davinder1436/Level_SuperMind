"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const payload = (0, jwt_utils_1.verifyToken)(token);
    if (!payload) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.body.userId = payload.userId;
    next();
};
exports.authMiddleware = authMiddleware;
