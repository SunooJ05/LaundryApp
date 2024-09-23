// RoomHandler.js
import LaundryRoom from '../../models/LaundryRoom.js'; // Import the LaundryRoom model

// Fetch all available rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await LaundryRoom.find().select('roomName'); // Fetch room names only
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rooms', error });
    }
};

// Add a new room
export const addRoom = async (req, res) => {
    try {
        const { roomName } = req.body;
        const existingRoom = await LaundryRoom.findOne({ roomName });
        if (existingRoom) {
            return res.status(400).json({ message: 'Room already exists' });
        }

        const newRoom = new LaundryRoom({ roomName });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: 'Error adding room', error });
    }
};

// Delete a room
export const deleteRoom = async (req, res) => {
    try {
        const { roomName } = req.params;
        const deletedRoom = await LaundryRoom.findOneAndDelete({ roomName });

        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room', error });
    }
};
