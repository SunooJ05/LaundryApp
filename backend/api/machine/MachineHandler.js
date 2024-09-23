import Machine from '../../models/Machine.js';

// Create a new machine
// ADMIN AUTH TODO
export const createMachine = async (req, res) => {
    try {
        const {type, status} = req.body;
        const machine = new Machine({ type, status });
        await machine.save();
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



