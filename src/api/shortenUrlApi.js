import express from 'express';
import { createShortUrl } from '../controllers/UrlController.js';

const router = express.Router();

router.post('/', createShortUrl);

export default router;
