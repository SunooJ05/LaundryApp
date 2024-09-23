// RoomRouter.js
import express from 'express';
import { getRooms } from './RoomHandler.js'; // Import the room handler

const router = express.Router();

// Route to get the list of available rooms
router.get('/rooms', getRooms);



export default router;
