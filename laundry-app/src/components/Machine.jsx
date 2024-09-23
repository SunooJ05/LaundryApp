// components/Machine.js
import React from 'react';
import { useDrag } from 'react-dnd';
import styles from '../styles/main.module.css';

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
            {type === 'washer' ? 'Washer' : 'Dryer'}
        </div>
    );
};

export default Machine;
