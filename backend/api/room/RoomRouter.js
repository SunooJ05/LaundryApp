// RoomRouter.js
import express from 'express';
import { getRooms, addRoom, deleteRoom } from './RoomHandler.js'; 

const router = express.Router();

// Route to get all available rooms
router.get('/getRooms', getRooms);

// Route to add a new room
router.post('/addRoom', addRoom);

// Route to delete a room
router.delete('/deleteRoom/:roomName', deleteRoom);

export default router;
