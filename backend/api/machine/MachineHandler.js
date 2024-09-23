import Machine from '../../models/Machine.js';

// Create a new machine
// ADMIN AUTH TODO
import LaundryRoom from '../../models/LaundryRoom.js'; 

export const createMachine = async (req, res) => {
    try {
        const { type, status, locationX, locationY, room } = req.body;  
        if (!type || !room) {
            return res.status(400).json({ message: 'Type and room are required' });
        }

        // Create the machine
        const machine = new Machine({ type, status, locationX, locationY, room });
        await machine.save();

        // Add the machine to the laundry room's machines array
        const updatedRoom = await LaundryRoom.findOneAndUpdate(
            { roomName: room }, 
            { $push: { machines: machine._id } }, // Add the machine's ObjectId to the room's machines array
            { new: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(201).json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Update machine position
// ADMIN AUTH TODO
export const updateMachinePosition = async (req, res) => {
    const machineID = req.params.machineID;
    const { locationX, locationY } = req.body;
    try {
        const machine = await Machine.findOneAndUpdate(
            { machineID: machineID }, 
            { locationX, locationY }, 
            { new: true }
        );
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Delete a machine
// ADMIN AUTH TODO
export const deleteMachine = async (req, res) => {
    try {
        const machine = await Machine.findOneAndDelete({ machineID: req.params.machineID });
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all machines
export const getAllMachines = async (req, res) => {
    try {
        const machines = await Machine.find();
        res.json(machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific machine by ID
export const getMachineById = async (req, res) => {
    try {
        const machine = await Machine.findOne({ machineID: req.params.machineID });
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a machine
export const updateMachine = async (req, res) => {
    try {
        const { machineID, type, status, expectedEndTime, userID, locationX, locationY } = req.body;
        const machine = await Machine.findOneAndUpdate(
            { machineID: req.params.machineID },  // Search by machineID
            { machineID, type, status, expectedEndTime, userID, locationX, locationY },
            { new: true, runValidators: true }
        );
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get machines by room
export const getMachinesByRoom = async (req, res) => {
    try {
        const { roomName } = req.params;
        console.log(req.params.roomName);
        const machines = await Machine.find({ room: roomName });
        if (!machines.length) {
            return res.status(404).json({ message: 'No machines found for this room' });
        }
        res.status(200).json(machines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching machines by room', error });
    }
};




