import connectDB from './config/db.js';
import User from './models/User.js';
import GitHubUser from './models/GitHubUser.js';
import bcrypt from 'bcryptjs';

// Sample GitHub users data
const sampleGitHubUsers = [
  {
    githubId: 1024,
    login: 'octocat',
    name: 'The Octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    bio: 'I am a robot programmed to serve GitHub.',
    location: 'San Francisco, CA',
    company: '@github',
    blog: 'https://github.blog',
    twitter_username: 'github',
    public_repos: 8,
    followers: 8700,
    following: 9,
    public_gists: 2,
    created_at: new Date('2008-01-14'),
    updated_at: new Date(),
    total_stars: 25000,
    total_forks: 15000,
    searchCount: 100
  },
  {
    githubId: 1516,
    login: 'torvalds',
    name: 'Linus Torvalds',
    avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    bio: 'Creator of Linux Kernel and Git',
    location: 'Portland, OR',
    company: null,
    blog: 'https://linustorvalds.blogspot.com/',
    twitter_username: null,
    public_repos: 3,
    followers: 120000,
    following: 0,
    public_gists: 0,
    created_at: new Date('2008-05-10'),
    updated_at: new Date(),
    total_stars: 1500000,
    total_forks: 300000,
    searchCount: 85
  }
];

// Sample users data
const sampleUsers = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    githubUsername: 'octocat'
  },
  {
    username: 'developer',
    email: 'dev@example.com',
    password: 'password123',
    githubUsername: 'torvalds'
  }
];

const seedDB = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Clear existing data
    console.log('Removing existing data...');
    await User.deleteMany({});
    await GitHubUser.deleteMany({});

    // Insert sample GitHub users
    console.log('Inserting sample GitHub users...');
    await GitHubUser.insertMany(sampleGitHubUsers);

    // Insert sample users
    console.log('Inserting sample users...');
    for (const userData of sampleUsers) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      await User.create(userData);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();