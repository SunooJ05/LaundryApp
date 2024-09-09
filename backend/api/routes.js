import express from 'express';
import TestRouter from './Test/TestRouter.js';
import UserRouter from './user/UserRouter.js';
import MachineRouter from './machine/MachineRouter.js'

const router = express.Router();

// Use TestRouter with the /test base path
router.use('/api', TestRouter);
router.use('/api/user', UserRouter);
router.use('/api/machine', MachineRouter);

export default router;
