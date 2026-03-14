import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import axios from 'axios';

const ProfileSearch = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    const lastSearch = localStorage.getItem('last_search');
    if (lastSearch) {
        searchUser(lastSearch);
        localStorage.removeItem('last_search');
    }
  }, []);

  const searchUser = async (username) => {
    if (!username.trim()) { setError('username required'); return; }
    setLoading(true); setError(''); setUser(null); setRepos([]); setSearched(true);
    try {
      const userRes = await axios.get('/api/github/profile/' + username.trim());
      setUser(userRes.data);
      const reposRes = await axios.get('/api/github/users/' + (userRes.data.login || username.trim()) + '/repos');
      setRepos(reposRes.data);

      await axios.post('/api/history', { username: username.trim() });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => { setUser(null); setRepos([]); setError(''); setSearched(false); };

  /* ── Neon / Cyan computed styles for logo hover ── */
  const logoColor = logoHover ? '#00E5FF' : '#00FF41';
  const logoGlow = logoHover
    ? '0 0 5px #00E5FF, 0 0 14px #00E5FF, 0 0 32px #00E5FF88'
    : '0 0 5px #00FF41, 0 0 14px #00FF41, 0 0 32px #00FF4166';
  const exeColor = logoHover ? '#00FF41' : '#00E5FF';
  const exeGlow = logoHover
    ? '0 0 6px #00FF4188'
    : '0 0 6px #00E5FF88';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* ════ Header ════ */}
      <motion.header
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center mb-8 w-full"
      >
        <div className="inline-flex items-center justify-center mb-5">
          <motion.div
            animate={{ filter: ['drop-shadow(0 0 8px #00FF41)', 'drop-shadow(0 0 20px #00FF41)', 'drop-shadow(0 0 8px #00FF41)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="p-4 rounded-2xl border relative"
            style={{ background: '#0D1117', borderColor: '#00FF4144', boxShadow: '0 0 24px #00FF4122' }}
          >
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(circle, #00FF4112 0%, transparent 70%)' }} />
            <svg height="44" viewBox="0 0 16 16" width="44" style={{ fill: '#00FF41', filter: 'drop-shadow(0 0 6px #00FF41)' }}>
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
          </motion.div>
        </div>

        <h1
          className="font-mono font-bold text-5xl md:text-6xl tracking-tight mb-3 cursor-default select-none"
          style={{ color: '#E6EDF3' }}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
        >
          <span style={{ color: '#E6EDF3' }}>Git</span>
          <span style={{ color: logoColor, textShadow: logoGlow, transition: 'color 0.3s ease, text-shadow 0.3s ease' }}>Finder</span>
          <motion.span
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl md:text-2xl align-super ml-0.5"
            style={{ color: exeColor, textShadow: exeGlow, transition: 'color 0.3s ease, text-shadow 0.3s ease' }}
          >
            .exe
          </motion.span>
        </h1>
        <p className="font-mono text-base md:text-lg" style={{ color: '#8B949E' }}>
          <span style={{ color: '#00FF41' }}>&gt;</span> discover github profiles
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }} style={{ color: '#00FF41' }}>_</motion.span>
        </p>
      </motion.header>

      {/* ════ Search Panel ════ */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }} className="w-full max-w-2xl mx-auto mb-6">
        <SearchBar onSearch={searchUser} onClear={clearSearch} loading={loading} />
      </motion.div>

      {/* ════ Dynamic Results ════ */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-14">
              <Loader />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto mt-6">
              <div className="rounded-xl border p-5 font-mono bg-[#0D1117] border-[#FF5F5766] shadow-[0_0_24px_#FF5F5718]">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363D]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_6px_#FF5F5799]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E88]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C84055]" />
                  <span className="ml-2 text-xs text-[#8B949E]">error.log</span>
                </div>
                <p className="text-sm text-[#FF5F57]">
                  <span className="text-[#8B949E]">$ </span>
                  ⚠ {error.toLowerCase().includes('not found') ? 'user not found on github' : error}
                </p>
                <p className="text-xs mt-2 text-[#8B949E]">check the username and try again_</p>
              </div>
            </motion.div>
          )}

          {user && !loading && (
            <motion.div key="user" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full">
              <UserCard user={user} repos={repos} />
            </motion.div>
          )}

          {!loading && !error && !user && !searched && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-14 gap-4">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="p-4 rounded-xl border bg-[#0D1117] border-[#30363D]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#30363D]">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M8 13h.01M12 13h.01M16 13h.01M6 13h.01M18 13h.01M8 17h8" />
                </svg>
              </motion.div>
              <p className="font-mono text-sm text-[#8B949E]">
                <span className="text-[#00FF41]">&gt;</span> awaiting input
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }} className="text-[#00FF41]">_</motion.span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ════ Footer ════ */}
      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 pb-2 font-mono text-xs text-center text-[#30363D]">
        <span className="text-[#00FF4144]">&lt;/&gt;</span> built with React + Tailwind + Framer Motion <span className="text-[#00E5FF44]">&lt;/&gt;</span>
      </motion.footer>

    </div>
  );
};

export default ProfileSearch;
