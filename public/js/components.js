const { useState, useEffect } = React;
const { motion, AnimatePresence } = Motion;

const Loader = () => (
    <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-3 h-3 bg-neon rounded-sm glow-neon"
                />
            ))}
        </div>
        <p className="text-neon font-mono text-sm glow-text">
            <span className="text-textSecondary">$</span> fetching user data<span className="cursor"></span>
        </p>
    </div>
);

const StatCard = ({ icon, label, value, delay = 0 }) => {
    const formatValue = (val) => {
        if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
        if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
        return val;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="terminal-card rounded-lg p-5 text-center cursor-pointer group transition-all duration-300"
        >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="text-2xl md:text-3xl font-bold text-neon font-mono glow-text mb-1">
                {formatValue(value)}
            </div>
            <div className="text-textSecondary text-sm font-mono">{label}</div>
        </motion.div>
    );
};

const getLanguageColor = (language) => {
    const colors = {
        JavaScript: 'bg-yellow-400', TypeScript: 'bg-blue-400', Python: 'bg-green-400',
        Java: 'bg-orange-400', 'C++': 'bg-pink-400', C: 'bg-gray-400', Go: 'bg-cyan',
        Rust: 'bg-orange-500', Ruby: 'bg-red-400', PHP: 'bg-indigo-400', Swift: 'bg-orange-400',
        Kotlin: 'bg-purple-400', Vue: 'bg-green-400', CSS: 'bg-purple-400', HTML: 'bg-orange-400',
    };
    return colors[language] || 'bg-neon';
};

const UserCard = ({ user, repos }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="terminal-card rounded-xl p-6 md:p-8 mb-6 relative overflow-hidden"
            >
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-textSecondary font-mono text-sm">user@gitfinder: ~/{user.login}</span>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-neon rounded-full blur-xl opacity-20 animate-pulse" />
                        <div className="relative p-1 rounded-full bg-gradient-to-r from-neon to-cyan">
                            <img
                                src={user.avatar_url}
                                alt={user.name || user.login}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-midnight"
                            />
                        </div>
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="font-mono text-textSecondary text-sm mb-1">
                            <span className="text-neon">$</span> whoami
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-textPrimary mb-1">
                            {user.name || user.login}
                        </h2>
                        
                        <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan hover:text-neon transition-colors inline-flex items-center gap-1 font-mono"
                        >
                            @{user.login} <span className="text-xs">↗</span>
                        </a>

                        {user.bio && (
                            <p className="text-textSecondary mt-3 max-w-lg leading-relaxed">
                                <span className="text-neon font-mono">// </span>{user.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-textSecondary text-sm font-mono">
                            {user.location && (
                                <span className="flex items-center gap-1">
                                    <span className="text-cyan">📍</span> {user.location}
                                </span>
                            )}
                            {user.company && (
                                <span className="flex items-center gap-1">
                                    <span className="text-cyan">🏢</span> {user.company}
                                </span>
                            )}
                            {user.blog && (
                                <a
                                    href={user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-neon transition-colors"
                                >
                                    <span className="text-cyan">🔗</span> website
                                </a>
                            )}
                            {user.twitter_username && (
                                <a
                                    href={'https://twitter.com/' + user.twitter_username}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-neon transition-colors"
                                >
                                    <span className="text-cyan">🐦</span> @{user.twitter_username}
                                </a>
                            )}
                            <span className="flex items-center gap-1">
                                <span className="text-cyan">📅</span> joined_{formatDate(user.created_at)}
                            </span>
                        </div>

                        <motion.a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block mt-6 px-6 py-3 bg-neon text-midnight font-bold font-mono rounded-lg 
                                       hover:bg-cyan transition-all duration-300 glow-neon"
                        >
                            ./view_profile.sh
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard icon="📁" label="repos" value={user.public_repos} delay={0.3} />
                <StatCard icon="👥" label="followers" value={user.followers} delay={0.4} />
                <StatCard icon="👤" label="following" value={user.following} delay={0.5} />
                <StatCard icon="📝" label="gists" value={user.public_gists} delay={0.6} />
            </div>

            {repos.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <h3 className="text-lg font-mono text-textPrimary mb-4 flex items-center gap-2">
                        <span className="text-neon">$</span> ls -la ./repos
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {repos.map((repo, index) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="terminal-card rounded-lg p-5 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-cyan font-mono font-semibold group-hover:text-neon transition-colors truncate pr-2">
                                        <span className="text-textSecondary">./</span>{repo.name}
                                    </h4>
                                    <span className="text-textSecondary group-hover:text-neon text-sm">↗</span>
                                </div>
                                
                                {repo.description && (
                                    <p className="text-textSecondary text-sm mb-3 line-clamp-2">
                                        <span className="text-neon"># </span>{repo.description}
                                    </p>
                                )}
                                
                                <div className="flex items-center gap-4 text-sm text-textSecondary font-mono">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span className={"w-2 h-2 rounded-full " + getLanguageColor(repo.language)} />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="text-yellow-400">★ {repo.stargazers_count}</span>
                                    <span className="text-cyan">⑂ {repo.forks_count}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

const SearchBar = ({ onSearch, onClear, loading }) => {
    const [username, setUsername] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) onSearch(username);
    };

    const suggestions = ['torvalds', 'gaearon', 'sindresorhus', 'yyx990803'];

    return (
        <form onSubmit={handleSubmit} className="relative">
            <motion.div
                animate={{
                    boxShadow: isFocused
                        ? '0 0 0 2px #00FF41, 0 0 20px rgba(0, 255, 65, 0.2)'
                        : '0 0 0 1px #30363D'
                }}
                className="relative terminal-card rounded-xl overflow-hidden transition-all duration-300"
            >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-midnight/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-textSecondary font-mono text-xs">search@gitfinder</span>
                </div>

                <div className="flex items-center p-2">
                    <div className="pl-3 text-neon font-mono text-lg glow-text">$</div>
                    
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="git search --user"
                        className="flex-1 bg-transparent text-textPrimary placeholder-textSecondary px-3 py-4 text-lg font-mono focus:outline-none"
                        disabled={loading}
                    />
                    
                    {username && (
                        <motion.button
                            type="button"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => { setUsername(''); onClear(); }}
                            className="p-2 mr-2 text-textSecondary hover:text-neon transition-colors font-mono"
                        >
                            [x]
                        </motion.button>
                    )}
                    
                    <motion.button
                        type="submit"
                        disabled={loading || !username.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="m-2 px-6 py-3 bg-neon text-midnight font-bold font-mono rounded-lg 
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   hover:bg-cyan transition-all duration-300 glow-neon min-w-[120px] flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-midnight/30 border-t-midnight rounded-full spin" />
                        ) : (
                            './run.sh'
                        )}
                    </motion.button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 mt-4 justify-center"
            >
                <span className="text-textSecondary text-sm font-mono">try:</span>
                {suggestions.map((name, index) => (
                    <motion.button
                        key={name}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        onClick={() => { setUsername(name); onSearch(name); }}
                        className="px-3 py-1 text-sm text-cyan hover:text-neon font-mono border border-border 
                                   rounded hover:border-neon transition-all duration-300 hover:glow-neon"
                    >
                        @{name}
                    </motion.button>
                ))}
            </motion.div>
        </form>
    );
};

function App() {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const searchUser = async (username) => {
        if (!username.trim()) {
            setError('Error: username required');
            return;
        }

        setLoading(true);
        setError('');
        setUser(null);
        setRepos([]);
        setSearched(true);

        try {
            const userRes = await fetch('/api/users/' + username);
            const userData = await userRes.json();
            
            if (!userRes.ok) {
                throw new Error(userData.error || 'Failed to fetch user');
            }
            
            setUser(userData);

            const reposRes = await fetch('/api/users/' + username + '/repos');
            if (reposRes.ok) {
                const reposData = await reposRes.json();
                setRepos(reposData);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Error: ' + (err.message || 'Something went wrong'));
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setUser(null);
        setRepos([]);
        setError('');
        setSearched(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neon rounded-full opacity-30"
                        style={{
                            left: (i * 7) + '%',
                            top: '100%',
                        }}
                        animate={{
                            y: [-20, -1000],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                <motion.header
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center mb-6"
                    >
                        <div className="p-5 terminal-card rounded-2xl border-2 border-neon/30 relative group">
                            <motion.svg 
                                height="64" 
                                viewBox="0 0 16 16" 
                                width="64" 
                                className="fill-neon group-hover:fill-cyan transition-colors duration-500"
                                animate={{ 
                                    filter: [
                                        'drop-shadow(0 0 8px #00FF41)', 
                                        'drop-shadow(0 0 15px #00FF41)', 
                                        'drop-shadow(0 0 8px #00FF41)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                            </motion.svg>
                        </div>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tighter"
                    >
                        <span className="text-textPrimary">Git</span>
                        <span className="text-neon glow-text">Finder</span>
                        <span className="text-textSecondary opacity-50 text-2xl">.exe</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-textSecondary text-lg md:text-xl max-w-md mx-auto font-mono"
                    >
                        <span className="text-neon">&gt;</span> discover github profiles_
                    </motion.p>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <SearchBar onSearch={searchUser} onClear={clearSearch} loading={loading} />
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                            <Loader />
                        </motion.div>
                    )}

                    {error && !loading && (
                        <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
                            <div className="terminal-card rounded-xl p-6 text-center border-red-500/50">
                                <div className="text-5xl mb-4">⚠️</div>
                                <p className="text-red-400 font-mono">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {user && !loading && (
                        <motion.div key="user" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <UserCard user={user} repos={repos} />
                        </motion.div>
                    )}

                    {!loading && !error && !user && !searched && (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                            <motion.div 
                                animate={{ opacity: [0.5, 1, 0.5] }} 
                                transition={{ duration: 2, repeat: Infinity }} 
                                className="text-6xl mb-4"
                            >
                                ⌨️
                            </motion.div>
                            <p className="text-textSecondary text-lg font-mono">
                                <span className="text-neon">&gt;</span> awaiting input<span className="cursor"></span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16 text-textSecondary text-sm font-mono"
                >
                    <p className="flex items-center justify-center gap-2">
                        <span className="text-neon">&lt;/&gt;</span> 
                        built with React + Tailwind + Framer Motion
                        <span className="text-neon">&lt;/&gt;</span>
                    </p>
                </motion.footer>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);