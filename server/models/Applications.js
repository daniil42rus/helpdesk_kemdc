import mongoose from 'mongoose';

const ApplicationsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      default: 0,
    },

    open: {
      type: Boolean,
      default: true,
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
      name: {
        type: String,
      },
      id: {
        type: Number,
      },
      nickname: {
        type: String,
      },
      phone: {
        type: String,
      },
      username: {
        type: String,
        // default: os.userInfo().username,
      },
    },
    administrator: {
      name: String,
      id: Number,
      nickname: String,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Applications', ApplicationsSchema);
