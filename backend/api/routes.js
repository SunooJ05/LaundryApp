import express from 'express';
import TestRouter from './Test/TestRouter.js';
import UserRouter from './user/UserRouter.js'

const router = express.Router();

// Use TestRouter with the /test base path
router.use('/api', TestRouter);
router.use('/api/user', UserRouter);

export default router;
