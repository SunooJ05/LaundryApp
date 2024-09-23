// components/AdminView.js
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import LaundryRoom from '../components/LaundryRoom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from '../api/axios';

const AdminView = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        // Fetch all machines for a specific room (you can make this dynamic by passing room as a prop)
        const fetchMachines = async () => {
            const response = await axios.get('/api/machine/getAll');
            setMachines(response.data);
        };
        fetchMachines();
    }, []);

    const moveMachine = async (id, x, y) => {
        // Update machine position locally
        setMachines((prevMachines) =>
            prevMachines.map((machine) =>
                machine.machineID === id
                    ? { ...machine, locationX: x, locationY: y }
                    : machine
            )
        );

        // Save updated position to the backend
        try {
            await axios.put(`/api/machine/updatePosition/${id}`, { locationX: x, locationY: y });
        } catch (error) {
            console.error('Error updating machine position:', error);
        }
    };

    return (
        <Layout>
            <DndProvider backend={HTML5Backend}>
                <h1>Admin View - Laundry Room Layout</h1>
                <p>Drag and drop the machines to arrange them in the room.</p>
                <LaundryRoom machines={machines} moveMachine={moveMachine} />
            </DndProvider>
        </Layout>
    );
};

export default AdminView;
