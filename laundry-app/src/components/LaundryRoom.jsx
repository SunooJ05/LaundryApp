import React from 'react';
import { useDrop } from 'react-dnd';
import styles from '../styles/main.module.css';
import Machine from './Machine'; // Ensure correct path

const LaundryRoom = ({ machines, updateMachinePosition, onMouseMove }) => {
    const [, drop] = useDrop(() => ({
        accept: 'machine',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const newX = Math.round(item.x + delta.x);
            const newY = Math.round(item.y + delta.y);
            updateMachinePosition(item.id, newX, newY);
        },
    }));

    return (
        <div ref={drop} className={styles.laundryRoom} onMouseMove={onMouseMove}>
            {machines.map((machine) => (
                <Machine
                    key={machine.machineID}
                    id={machine.machineID}
                    type={machine.type}
                    x={machine.locationX}
                    y={machine.locationY}
                    updateMachinePosition={updateMachinePosition}
                />
            ))}
        </div>
    );
};

export default LaundryRoom;
