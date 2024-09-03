import Router from 'express';
import { testHandler } from './TestHandler.js';

const router = Router();

// Define a test route
router.get('/test', testHandler);

export default router;
