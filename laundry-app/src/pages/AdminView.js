import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import LaundryRoom from '../components/LaundryRoom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from '../api/axios'; 

const AdminView = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [machines, setMachines] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [newMachine, setNewMachine] = useState({
        type: 'washer',
        locationX: 0,
        locationY: 0,
        room: '',
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    useEffect(() => {
        if (selectedRoom) {
            const fetchMachines = async () => {
                try {
                    const response = await axios.get(`/api/machine/getByRoom/${encodeURIComponent(selectedRoom)}`);
                    setMachines(response.data);
                } catch (error) {
                    console.error('Error fetching machines:', error);
                }
            };
            fetchMachines();
        }
    }, [selectedRoom]);

    // Update machine position locally and on backend
    const updateMachinePosition = async (id, x, y) => {
        // Update the machine position in the local state
        setMachines((prevMachines) =>
            prevMachines.map((machine) =>
                machine.machineID === id
                    ? { ...machine, locationX: x, locationY: y }
                    : machine
            )
        );

        // Send updated position to backend
        try {
            await axios.put(`/api/machine/updatePosition/${id}`, { locationX: x, locationY: y });
        } catch (error) {
            console.error('Error updating machine position:', error);
        }
    };

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/room/addRoom', { roomName: newRoomName });
            setRooms((prevRooms) => [...prevRooms, response.data]);
            setNewRoomName('');
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const handleCreateMachine = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/machine/create', {
                ...newMachine,
                room: selectedRoom,
            });
            setMachines((prevMachines) => [...prevMachines, response.data]);
            setNewMachine({ type: 'washer', locationX: 0, locationY: 0, room: selectedRoom });
        } catch (error) {
            console.error('Error creating machine:', error);
        }
    };

    const handleDeleteMachine = async (machineID) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this machine?');
        if (!confirmDelete) return;
        try {
            await axios.delete(`/api/machine/delete/${machineID}`);
            setMachines((prevMachines) => prevMachines.filter((machine) => machine.machineID !== machineID));
        } catch (error) {
            console.error('Error deleting machine:', error);
        }
    };

    const handleMouseMove = (e) => {
        const layout = e.target.getBoundingClientRect();
        setMousePosition({
            x: Math.floor(e.clientX - layout.left),
            y: Math.floor(e.clientY - layout.top),
        });
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

                {/* Form to create a new machine */}
                <form onSubmit={handleCreateMachine}>
                    <h2>Create New Machine</h2>
                    <label>
                        Type:
                        <select
                            value={newMachine.type}
                            onChange={(e) => setNewMachine({ ...newMachine, type: e.target.value })}
                        >
                            <option value="washer">Washer</option>
                            <option value="dryer">Dryer</option>
                        </select>
                    </label>
                    <label>
                        Initial X Position:
                        <input
                            type="number"
                            value={newMachine.locationX}
                            onChange={(e) => setNewMachine({ ...newMachine, locationX: parseInt(e.target.value) })}
                            required
                        />
                    </label>
                    <label>
                        Initial Y Position:
                        <input
                            type="number"
                            value={newMachine.locationY}
                            onChange={(e) => setNewMachine({ ...newMachine, locationY: parseInt(e.target.value) })}
                            required
                        />
                    </label>
                    <button type="submit">Add Machine</button>
                </form>

                {/* Display laundry room layout and machine deletion */}
                {selectedRoom && (
                    <>
                        <p>Managing machines in: {selectedRoom}</p>
                        <LaundryRoom machines={machines} updateMachinePosition={updateMachinePosition} onMouseMove={handleMouseMove} />
                        <ul>
                            {machines.map((machine) => (
                                <li key={machine.machineID}>
                                    {machine.type} - {machine.machineID}
                                    <button onClick={() => handleDeleteMachine(machine.machineID)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Display mouse position over the layout */}
                <div>
                    <p>Mouse Position: X: {mousePosition.x}, Y: {mousePosition.y}</p>
                </div>
            </DndProvider>
        </Layout>
    );
};

export default AdminView;
