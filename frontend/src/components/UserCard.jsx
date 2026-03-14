import { motion } from 'framer-motion';
import { formatDate, getLanguageColor } from '../utils/helpers';

/* ── helpers ── */
const fmt = (v) => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
    if (v >= 1_000) return (v / 1_000).toFixed(1) + 'K';
    return v;
};

/* ── Single stat card (emoji version to match reference) ── */
const StatCard = ({ emoji, label, value, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ y: -4, transition: { duration: 0.18 } }}
        className="rounded-xl p-5 text-center border cursor-default select-none transition-all duration-300"
        style={{ background: '#161B22', borderColor: '#30363D' }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#00FF4155';
            e.currentTarget.style.boxShadow = '0 0 18px #00FF4112';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#30363D';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        <div className="text-3xl mb-2">{emoji}</div>
        <div className="font-mono font-bold text-2xl mb-1"
            style={{ color: '#00FF41', textShadow: '0 0 10px #00FF4166' }}>
            {fmt(value)}
        </div>
        <div className="font-mono text-xs uppercase tracking-widest" style={{ color: '#8B949E' }}>{label}</div>
    </motion.div>
);

/* ── Main component ── */
const UserCard = ({ user, repos }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full mx-auto">

        {/* ════ Profile terminal window ════ */}
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-2xl mb-5 overflow-hidden border relative"
            style={{
                background: 'linear-gradient(180deg, #1C2128 0%, #161B22 100%)',
                borderColor: '#30363D',
                boxShadow: '0 0 0 1px #00FF4118, 0 8px 40px rgba(0,0,0,0.6)'
            }}
        >
            {/* Top neon accent line */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent 5%, #00FF41 40%, #00E5FF 60%, transparent 95%)' }} />

            {/* ── Title bar ── */}
            <div className="flex items-center gap-2 px-5 py-3 border-b"
                style={{ background: '#0D1117', borderColor: '#30363D' }}>
                {/* Traffic lights */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57', boxShadow: '0 0 5px #FF5F5788' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E', boxShadow: '0 0 5px #FEBC2E88' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28C840', boxShadow: '0 0 5px #28C84088' }} />
                </div>
                <span className="font-mono text-xs ml-3" style={{ color: '#8B949E' }}>
                    user@gitfinder: ~/{user.login}
                </span>
            </div>

            {/* ── Body ── */}
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-7 md:gap-10">

                    {/* Avatar */}
                    <motion.div
                        initial={{ scale: 0.75, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                        className="shrink-0 relative"
                    >
                        {/* Outer glow */}
                        <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
                            style={{ background: '#00FF41' }} />
                        {/* Neon gradient ring */}
                        <div className="relative p-[3px] rounded-full"
                            style={{ background: 'linear-gradient(135deg, #00FF41, #00E5FF)' }}>
                            <div className="rounded-full p-0.5" style={{ background: '#0D1117' }}>
                                <img
                                    src={user.avatar_url}
                                    alt={user.name || user.login}
                                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left min-w-0">

                        {/* $ whoami prompt */}
                        <div className="font-mono text-sm mb-1" style={{ color: '#8B949E' }}>
                            <span style={{ color: '#00FF41' }}>$</span> whoami
                        </div>

                        {/* Display name */}
                        <h2 className="font-mono font-bold text-3xl md:text-4xl mb-1" style={{ color: '#E6EDF3' }}>
                            {user.name || user.login}
                        </h2>

                        {/* @username link */}
                        <a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-sm mb-4 hover:underline transition-colors"
                            style={{ color: '#00E5FF', textShadow: '0 0 6px #00E5FF55' }}
                        >
                            @{user.login}
                            <span className="text-xs opacity-70">↗</span>
                        </a>

                        {/* // bio */}
                        <p className="font-mono text-sm italic leading-relaxed mb-4 max-w-lg mx-auto md:mx-0"
                            style={{ color: '#8B949E' }}>
                            <span style={{ color: '#00FF41' }}>// </span>
                            {user.bio || 'No bio available for this user.'}
                        </p>

                        {/* Meta chips */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 font-mono text-sm"
                            style={{ color: '#8B949E' }}>
                            {user.location && (
                                <span className="flex items-center gap-1.5">
                                    <span style={{ color: '#00E5FF' }}>📍</span>{user.location}
                                </span>
                            )}
                            {user.company && (
                                <span className="flex items-center gap-1.5">
                                    <span style={{ color: '#00E5FF' }}>🏢</span>{user.company}
                                </span>
                            )}
                            {user.blog && (
                                <a
                                    href={user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 transition-colors hover:text-[#00FF41]"
                                    style={{ color: '#8B949E' }}
                                >
                                    <span style={{ color: '#00E5FF' }}>🔗</span>website
                                </a>
                            )}
                            {user.twitter_username && (
                                <a
                                    href={'https://twitter.com/' + user.twitter_username}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 transition-colors hover:text-[#00FF41]"
                                    style={{ color: '#8B949E' }}
                                >
                                    <span style={{ color: '#00E5FF' }}>🐦</span>@{user.twitter_username}
                                </a>
                            )}
                            <span className="flex items-center gap-1.5">
                                <span style={{ color: '#00E5FF' }}>📅</span>
                                joined_{formatDate(user.created_at)}
                            </span>
                        </div>

                        {/* ./view_profile.sh button */}
                        <motion.a
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-block mt-6 px-6 py-3 rounded-xl neon-btn font-mono text-sm font-bold"
                        >
                            ./view_profile.sh
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* ════ Stats row ════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard emoji="📁" label="repos" value={user.public_repos} delay={0.2} />
            <StatCard emoji="👥" label="followers" value={user.followers} delay={0.3} />
            <StatCard emoji="👤" label="following" value={user.following} delay={0.4} />
            <StatCard emoji="📝" label="gists" value={user.public_gists} delay={0.5} />
        </div>

        {/* ════ Repos section ════ */}
        {repos.length > 0 && (
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {/* Section header */}
                <div className="flex items-center gap-2 mb-5">
                    <span className="font-mono text-base font-semibold" style={{ color: '#E6EDF3' }}>
                        <span style={{ color: '#00FF41' }}>$</span> ls -la ./repositories
                    </span>
                    <span className="ml-auto font-mono text-xs px-3 py-1 rounded-full border"
                        style={{ color: '#00FF41', borderColor: '#00FF4144', background: '#00FF4108' }}>
                        {repos.length} repos
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.map((repo, i) => (
                        <motion.a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 + i * 0.07 }}
                            whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.16 } }}
                            className="block rounded-xl p-5 border transition-all duration-200 group"
                            style={{ background: '#161B22', borderColor: '#30363D' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#00FF4155';
                                e.currentTarget.style.boxShadow = '0 0 20px #00FF4110';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#30363D';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Name row */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-mono font-semibold text-sm truncate transition-colors"
                                    style={{ color: '#00E5FF' }}>
                                    <span style={{ color: '#8B949E' }}>./</span>
                                    <span className="group-hover:text-[#00FF41] transition-colors">{repo.name}</span>
                                </h4>
                                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                    style={{ color: '#8B949E' }}>↗</span>
                            </div>

                            {/* Description */}
                            {repo.description ? (
                                <p className="font-mono text-xs leading-relaxed mb-3 line-clamp-2 min-h-[32px]"
                                    style={{ color: '#8B949E' }}>
                                    <span style={{ color: '#00FF41' }}># </span>{repo.description}
                                </p>
                            ) : (
                                <p className="font-mono text-xs mb-3 min-h-[32px] italic"
                                    style={{ color: '#30363D' }}># no description</p>
                            )}

                            {/* Footer */}
                            <div className="flex items-center gap-4 font-mono text-xs" style={{ color: '#8B949E' }}>
                                {repo.language && (
                                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded border"
                                        style={{ borderColor: '#30363D', background: '#0D1117' }}>
                                        <span className={'w-2 h-2 rounded-full shrink-0 ' + getLanguageColor(repo.language)} />
                                        {repo.language}
                                    </span>
                                )}
                                <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                                    ★ {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors">
                                    ⑂ {repo.forks_count}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        )}
    </motion.div>
);

export default UserCard;
