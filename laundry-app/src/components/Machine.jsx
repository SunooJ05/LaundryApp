import React from 'react';
import { useDrag } from 'react-dnd';

const Machine = ({ machine }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'MACHINE',
    item: { id: machine.machineID },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: '100px',
        height: '100px',
        backgroundColor: machine.type === 'washer' ? 'blue' : 'orange',
      }}
    >
      {machine.type} - {machine.machineID}
    </div>
  );
};

export default Machine;
