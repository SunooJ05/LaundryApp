import mongoose from 'mongoose';

const laundryRoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }],
});

const LaundryRoom = mongoose.model('LaundryRoom', laundryRoomSchema);
export default LaundryRoom;
