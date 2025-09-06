import rateLimit from 'express-rate-limit';
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS, AUTH_RATE_LIMIT_MAX_REQUESTS } from '../config';

// General rate limiter
export const generalLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // From environment variable
  max: RATE_LIMIT_MAX_REQUESTS, // From environment variable
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // From environment variable
  max: AUTH_RATE_LIMIT_MAX_REQUESTS, // From environment variable
  message: {
    error: 'Too many authentication attempts from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Password reset limiter
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset attempts per hour
  message: {
    error: 'Too many password reset attempts from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
