import express from 'express';
import TestRouter from './Test/TestRouter.js';
import UserRouter from './user/UserRouter.js';
import MachineRouter from './machine/MachineRouter.js'
import RoomRouter from './room/RoomRouter.js'

const router = express.Router();

// Use TestRouter with the /test base path
router.use('/api', TestRouter);
router.use('/api/user', UserRouter);
router.use('/api/machine', MachineRouter);
router.use('/api/room', RoomRouter);

export default router;
