import User from '../../models/User.js'

// Create User
export const createUserData = async (req, res) => {
    try {
        const { name, email, gtID } = req.body
        const user = new User({ name, email, gtID });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get User
export const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User
export const updateUserData = async (req, res) => {
    try {
        const { name, email, gtID, dorm } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params._id,
            { name, email, gtID, dorm },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User
export const deleteUserData = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}