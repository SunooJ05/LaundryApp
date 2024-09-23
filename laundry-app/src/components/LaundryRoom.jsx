import React from 'react';
import { useDrop } from 'react-dnd';
import Machine from './Machine';

const LaundryRoom = ({ machines, moveMachine }) => {
  const [, dropRef] = useDrop({
    accept: 'MACHINE',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      moveMachine(item.id, delta);
    },
  });

  return (
    <div
      ref={dropRef}
      style={{
        width: '500px',
        height: '500px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {machines.map((machine) => (
        <div
          key={machine.machineID}
          style={{
            position: 'absolute',
            left: `${machine.locationX}px`,
            top: `${machine.locationY}px`,
          }}
        >
          <Machine machine={machine} />
        </div>
      ))}
    </div>
  );
};

export default LaundryRoom;
