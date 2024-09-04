import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gtID: { type: Number, required: true, unique: true },
    dorm: { type: String, required: true },
    points: { type: Number, default: 0 },
    role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.model('User', userSchema);
export default User;
