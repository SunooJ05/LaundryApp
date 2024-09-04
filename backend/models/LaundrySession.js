import mongoose from 'mongoose';

const laundrySessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
});

const LaundrySession = mongoose.model('LaundrySession', laundrySessionSchema);
export default LaundrySession;