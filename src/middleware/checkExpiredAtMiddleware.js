import { UrlSchema } from '../models/UrlModel.js';

async function cleanupExpiredUrls(req, res, next) {
    try {
        const now = new Date();
        await UrlSchema.deleteMany({ expiredAt: { $lt: now } });
        console.log('Cleaned up expired URLs.');
        next();
    } catch (error) {
        console.error('Error cleaning up expired URLs:', error);
        next(error);
    }
}

export { cleanupExpiredUrls };