import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
    machineID: { type: Number, required: true, unique: true },
    type: { type: String, enum: ['washer', 'dryer'], required: true },
    status: { type: String, enum: ['available', 'in-use', 'out-of-order'], required: true },
    expectedEndTime: { type: Date, default: null }, // The time when the machine is expected to finish
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

machineSchema.virtual('remainingTime').get(function () {
    if (!this.expectedEndTime) return null;
    const now = new Date();
    const diff = this.expectedEndTime - now; // difference in milliseconds
    return diff > 0 ? Math.floor(diff / 1000 / 60) : 0; // return remaining time in minutes
});

const Machine = mongoose.model('Machine', machineSchema);
export default Machine;

