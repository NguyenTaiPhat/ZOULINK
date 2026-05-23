import rateLimit from 'express-rate-limit';
import { Response, Request, NextFunction } from 'express';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP. Please try again in a minute.',
});

export const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many link creations. Please wait a minute and try again.',
});

export function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
  return apiLimiter(req, res, next);
}
