// components/LaundryRoom.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Machine from './Machine'; // Import Machine component
import styles from '../styles/main.module.css';

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

export default LaundryRoom;
