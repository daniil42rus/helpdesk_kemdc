import mongoose from 'mongoose';

const AdministratorsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
    },
    organization: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.model('Administrators', AdministratorsSchema);
