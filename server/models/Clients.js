import mongoose from 'mongoose';

const ClientsSchema = new mongoose.Schema(
  {
    name: { type: String },
    id: {
      type: Number,
    },
    nickname: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.model('Clients', ClientsSchema);
