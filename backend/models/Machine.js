import mongoose from 'mongoose';
import autoIncrement from '../util/autoIncrement.js';

const machineSchema = new mongoose.Schema({
    machineID: { type: Number, unique: true },
    type: { type: String, enum: ['washer', 'dryer'], required: true },
    status: { type: String, enum: ['available', 'in-use', 'out-of-order'], required: true, default: 'available' },
    locationX: { type: Number, require: true, default: 0},
    locationY: { type: Number, require: true, default: 0},
    expectedEndTime: { type: Date, default: null }, // The time when the machine is expected to finish
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    room: {type: String, require: true, unique: true},
});

machineSchema.virtual('remainingTime').get(function () {
    if (!this.expectedEndTime) return null;
    const now = new Date();
    const diff = this.expectedEndTime - now; // difference in milliseconds
    return diff > 0 ? Math.floor(diff / 1000 / 60) : 0; // return remaining time in minutes
});

machineSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.machineID = await autoIncrement('machineID');
    }
    next();
});

const Machine = mongoose.model('Machine', machineSchema);
export default Machine;

