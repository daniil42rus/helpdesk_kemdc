import mongoose from 'mongoose';

const ApplicationsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
    application: {
      department: {
        type: String,
        required: true,
      },
      room: {
        type: String,
        required: true,
      },
      problems: {
        type: String,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      urgency: {
        type: String,
        required: true,
      },
      creation: {
        type: Date,
        default: Date.now,
      },
      closing: Date,
    },
    client: {
      name: String,
      id: {
        type: Number,
        required: true,
      },
      nickname: {
        type: String,
        required: true,
      },
    },
    administrator: {
      name: String,
      id: Number,
      nickname: String,
    },
  },
  { versionKey: false }
);

export default mongoose.model('Applications', ApplicationsSchema);
