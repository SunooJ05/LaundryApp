import express from 'express'
import { createMachine, updateMachinePosition, deleteMachine, getAllMachines, getMachineById, updateMachine, getMachinesByRoom } from './MachineHandler.js'

const router = express.Router()

//Create Machine
router.post('/create', createMachine);

//Update Position in layout
router.put('/updatePosition/:machineID', updateMachinePosition);

//Delete machine
router.delete('/delete/:machineID', deleteMachine);

//Get all machines
router.get('/getAll', getAllMachines);

//Get machine by id
router.get('/getOne/:machineID', getMachineById);

//Update Machine
router.put('/updateMachine/:machineID', updateMachine);

// Get machines by room
router.get('/getByRoom/:roomName', getMachinesByRoom);

export default router;

