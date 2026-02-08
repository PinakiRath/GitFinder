import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  githubUsername: {
    type: String,
    trim: true
  },
  searchHistory: [{
    username: {
      type: String,
      required: true
    },
    searchedAt: {
      type: Date,
      default: Date.now
    },
    result: {
      type: Object
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now;
  next();
});

export default mongoose.model('User', userSchema);