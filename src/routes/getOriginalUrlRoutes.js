import express from 'express';
import { redirectToOriginalUrl } from '../controllers/UrlController.js';

const router = express.Router();

router.get('/:shortUrl', redirectToOriginalUrl);

export default router;