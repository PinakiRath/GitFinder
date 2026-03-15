import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = ['github', 'openai', 'google', 'meta'];

const SearchBar = ({ onSearch, onClear, loading }) => {
    const [username, setUsername] = useState('');
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && !loading) onSearch(username.trim());
    };

    const handleClear = () => {
        setUsername('');
        onClear();
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <div className="w-full">
            {/* ── Terminal window card ── */}
            <motion.div
                animate={{
                    boxShadow: focused
                        ? '0 0 0 2px #00FF41, 0 0 24px rgba(0,255,65,0.18)'
                        : '0 0 0 1px #30363D, 0 4px 24px rgba(0,0,0,0.5)'
                }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-xl overflow-hidden"
                style={{ background: '#0D1117', border: '1px solid #30363D' }}
            >
                {/* Title bar */}
                <div
                    className="flex items-center gap-3 px-4 py-3 border-b"
                    style={{ background: '#161B22', borderColor: '#30363D' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57', boxShadow: '0 0 5px #FF5F5788' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E', boxShadow: '0 0 5px #FEBC2E88' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#28C840', boxShadow: '0 0 5px #28C84088' }} />
                    </div>
                    <span className="font-mono text-xs flex-1 text-center" style={{ color: '#8B949E' }}>
                        search@gitfinder
                    </span>
                </div>

                {/* Input row */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3.5">
                    {/* Prompt */}
                    <span className="font-mono text-lg shrink-0 select-none" style={{ color: '#00FF41' }}>$</span>
                    <span className="font-mono text-sm shrink-0 select-none" style={{ color: '#8B949E' }}>
                        git search --user
                    </span>

                    <input
                        ref={inputRef}
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        disabled={loading}
                        placeholder="type username..."
                        autoComplete="off"
                        spellCheck="false"
                        className="flex-1 bg-transparent font-mono text-base focus:outline-none disabled:opacity-50
                                   placeholder:opacity-25 min-w-0"
                        style={{ color: '#00FF41', caretColor: '#00FF41' }}
                    />

                    {/* Clear */}
                    <AnimatePresence>
                        {username && !loading && (
                            <motion.button
                                type="button"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                onClick={handleClear}
                                className="font-mono text-xs px-2 py-1 rounded border shrink-0 transition-colors"
                                style={{ color: '#8B949E', borderColor: '#30363D' }}
                                title="Clear"
                            >
                                [x]
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={loading || !username.trim()}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="neon-btn font-mono text-sm px-6 py-2.5 rounded-lg shrink-0
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   disabled:transform-none disabled:shadow-none"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="inline-block w-3.5 h-3.5 border-2 border-t-transparent rounded-full"
                                    style={{ borderColor: '#0A0E1488', borderTopColor: 'transparent' }}
                                />
                                running...
                            </span>
                        ) : './run.sh'}
                    </motion.button>
                </form>
            </motion.div>

            {/* ── Suggestion chips ── */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center flex-wrap gap-2 mt-4"
            >
                <span className="font-mono text-xs" style={{ color: '#8B949E' }}>try:</span>
                {SUGGESTIONS.map((term, i) => (
                    <motion.button
                        key={term}
                        type="button"
                        onClick={() => { setUsername(term); onSearch(term); }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + i * 0.07 }}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
                        style={{ color: '#00E5FF', borderColor: '#00E5FF33', background: '#00E5FF08' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = '#00FF41';
                            e.currentTarget.style.borderColor = '#00FF4166';
                            e.currentTarget.style.background = '#00FF4110';
                            e.currentTarget.style.boxShadow = '0 0 10px #00FF4122';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = '#00E5FF';
                            e.currentTarget.style.borderColor = '#00E5FF33';
                            e.currentTarget.style.background = '#00E5FF08';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        @{term}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
};

export default SearchBar;
