import { verifyAccessToken } from '../utils/jwt.utils.js';
import { ApiError } from '../utils/ApiError.js';

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            throw new ApiError(401, 'Access token is required');
        }

        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export const secureRoute = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};