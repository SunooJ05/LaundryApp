import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import LaundryRoom from '../components/LaundryRoom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from '../api/axios'; 

const AdminView = () => {
    const [rooms, setRooms] = useState([]); // Holds available rooms
    const [selectedRoom, setSelectedRoom] = useState(''); // Holds the current room selection
    const [machines, setMachines] = useState([]);
    const [newRoomName, setNewRoomName] = useState(''); // Holds the new room name input


    // Fetch the available rooms when the component mounts
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('/api/room/getRooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);

    // Fetch machines for the selected room
    useEffect(() => {
        if (selectedRoom) {
            const fetchMachines = async () => {
                try {
                    const response = await axios.get(`/api/machine/getByRoom/${selectedRoom}`);
                    setMachines(response.data);
                } catch (error) {
                    console.error('Error fetching machines:', error);
                }
            };
            fetchMachines();
        }
    }, [selectedRoom]);

    // Handle room selection
    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    // Handle new room creation
    const handleCreateRoom = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/room/addRoom', { roomName: newRoomName });
            setRooms((prevRooms) => [...prevRooms, response.data]); // Add new room to the room list
            setNewRoomName(''); // Clear the input after creation
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <Layout>
            <DndProvider backend={HTML5Backend}>
                <h1>Admin View - Laundry Room Layout</h1>

                {/* Room selector dropdown */}
                <label>
                    Select Room:
                    <select value={selectedRoom} onChange={handleRoomChange}>
                        <option value="">-- Select a Room --</option>
                        {rooms.map((room, index) => (
                            // Map room.roomName because each room object contains roomName field
                            <option key={index} value={room.roomName}>
                                {room.roomName}
                            </option>
                        ))}
                    </select>
                </label>

                 {/* Form to create a new laundry room */}
                 <form onSubmit={handleCreateRoom}>
                    <label>
                        Create New Room:
                        <input
                            type="text"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            placeholder="Enter room name"
                            required
                        />
                    </label>
                    <button type="submit">Add Room</button>
                </form>

                {/* Display laundry room layout if a room is selected */}
                {selectedRoom && (
                    <>
                        <p>Managing machines in: {selectedRoom}</p>
                        <LaundryRoom machines={machines} moveMachine={() => {}} />
                    </>
                )}
            </DndProvider>
        </Layout>
    );
};

export default AdminView;
