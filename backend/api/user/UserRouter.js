// api/user/UserRouter.js
import express from 'express';
import { createUserData, updateUserData, getUserData, deleteUserData} from './UserHandler.js';

const router = express.Router();

// Create user data
router.post('/createUser', createUserData);

// Update user data
router.put('/updateUser/:_id', updateUserData);

// Fetch user data
router.get('/getUser/:_id', getUserData);

// Delete user data
router.delete('/deleteUser/:_id', deleteUserData);

export default router;
