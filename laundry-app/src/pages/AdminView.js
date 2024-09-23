import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import styles from '../styles/main.module.css';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

const Machine = ({ id, type, x, y, moveMachine }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'machine',
        item: { id, x, y },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const style = {
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={drag} style={style} className={styles.machine}>
            {type === 'washer' ? '🧺 Washer' : '🔥 Dryer'}
        </div>
    );
};

const LaundryRoom = ({ machines, moveMachine }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'machine',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const newX = Math.round(item.x + delta.x);
            const newY = Math.round(item.y + delta.y);
            moveMachine(item.id, newX, newY);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className={styles.laundryRoom}>
            {machines.map((machine) => (
                <Machine
                    key={machine.machineID}
                    id={machine.machineID}
                    type={machine.type}
                    x={machine.locationX}
                    y={machine.locationY}
                    moveMachine={moveMachine}
                />
            ))}
        </div>
    );
};

const AdminView = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        // Fetch all machines for a specific room (you can make this dynamic by passing room as a prop)
        const fetchMachines = async () => {
            const response = await axios.get('/api/machines/Room1');
            setMachines(response.data);
        };
        fetchMachines();
    }, []);

    const moveMachine = async (id, x, y) => {
        // Update machine location on the backend
        setMachines((prevMachines) =>
            prevMachines.map((machine) =>
                machine.machineID === id
                    ? { ...machine, locationX: x, locationY: y }
                    : machine
            )
        );

        try {
            await axios.put(`/api/machines/${id}`, { locationX: x, locationY: y });
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
