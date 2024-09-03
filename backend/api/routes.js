import express from 'express';
import TestRouter from './Test/TestRouter.js';

const router = express.Router();

// Use TestRouter with the /test base path
router.use('/api', TestRouter);

export default router;
