<div align="center">
  
# 🔍 GitFinder

**A Modern GitHub Profile Search Application with Terminal/Matrix Theme**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

<p>
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

*Discover GitHub profiles with a beautiful hacker-inspired terminal interface*

</div>

---

## ✨ Features

- 🔍 **User Search** - Search any GitHub user by username
- 👤 **Profile Display** - View avatar, name, bio, location, and company
- 📊 **Statistics** - See followers, following, public repos, and gists
- 📁 **Repositories** - Browse recent repositories with stars and forks
- 🎨 **Terminal Theme** - Beautiful matrix-inspired dark UI with neon accents
- ✨ **Animations** - Smooth Framer Motion transitions and effects
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Optimized API calls with GitHub token support

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| React | Frontend UI Library |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | HTTP Client |
| GitHub API | Data Source |

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- GitHub Personal Access Token (optional)

### Setup

```bash
# Clone the repository
git clone https://github.com/pinakirath/gitfinder.git

# Navigate to directory
cd gitfinder

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the server
npm start
Open in browser
text

http://localhost:3000
🔐 Environment Variables
Create a .env file in the root directory:

env

PORT=3000
GITHUB_TOKEN=your_github_token_here
Getting a GitHub Token
Go to GitHub Settings → Developer Settings → Personal Access Tokens
Click "Generate new token (classic)"
Select scopes: read:user
Generate and copy the token
Add it to your .env file
Note: Without a token: 60 requests/hour. With a token: 5,000 requests/hour.


🚀 Usage
Open http://localhost:3000
Enter a GitHub username in the search bar
Press Enter or click "./run.sh"
View the user's profile, stats, and repositories
Quick Search Suggestions
@torvalds - Linus Torvalds
@gaearon - Dan Abramov
@sindresorhus - Sindre Sorhus
@yyx990803 - Evan You


📡 API Endpoints
Method	Endpoint	Description
GET	/	Frontend application
GET	/api/users/:username	Fetch user profile
GET	/api/users/:username/repos	Fetch user repositories
GET	/api/rate-limit	Check API rate limit
Example
Bash

curl http://localhost:3000/api/users/torvalds
📁 Project Structure
text

gitfinder/
├── app.js              # Main server file
├── package.json        # Dependencies
├── .env                # Environment variables
├── .env.example        # Example env file
├── .gitignore          # Git ignore rules
├── README.md           # Documentation
└── LICENSE             # MIT License


🎨 Theme Colors
Element	Hex Code
Primary (Neon Green)	#00FF41
Secondary (Cyan)	#00E5FF
Background	#0A0E14
Card	#1C2128
Text Primary	#E6EDF3
Text Secondary	#8B949E
🤝 Contributing
Fork the repository
Create your branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Pinaki Rath

<div align="center">
⭐ Star this repo if you found it helpful!
Made with ❤️ and JavaScript

Push Commands
Bash

git init
git add .
git commit -m "Initial commit: GitFinder"
git branch -M main
git remote add origin https://github.com/pinakirath/gitfinder.git
git push -u origin main