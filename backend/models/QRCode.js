import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
    machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
    qrCode: { type: String, required: true, unique: true },
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);
export default QRCode;