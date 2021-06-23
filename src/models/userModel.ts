import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have a username'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'User must have a password']
  }
});

export const User = mongoose.model('User', userSchema);
