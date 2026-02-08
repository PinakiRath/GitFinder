import mongoose from 'mongoose';

const githubUserSchema = new mongoose.Schema({
  githubId: {
    type: Number,
    required: true,
    unique: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: null
  },
  avatar_url: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  company: {
    type: String,
    default: null
  },
  blog: {
    type: String,
    default: null
  },
  twitter_username: {
    type: String,
    default: null
  },
  public_repos: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  public_gists: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  },
  total_stars: {
    type: Number,
    default: 0
  },
  total_forks: {
    type: Number,
    default: 0
  },
  searchCount: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient searching
githubUserSchema.index({ login: 1 });
githubUserSchema.index({ searchCount: -1 }); // For trending users

export default mongoose.model('GitHubUser', githubUserSchema);