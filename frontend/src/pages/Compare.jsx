import { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Compare = () => {
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleCompare = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await axios.post('/api/compare', { username1: user1, username2: user2 });
            if (res.data.success) {
                setResult(res.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Compare failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 font-mono">
            <h1 className="text-3xl text-white mb-8 border-b border-[#30363D] pb-4">
                DEVELOPER <span className="text-[#00E5FF]">COMPARISON_TOOL</span>
            </h1>

            <form onSubmit={handleCompare} className="flex flex-col md:flex-row gap-4 mb-10 items-end">
                <div className="flex-1 w-full">
                    <label className="text-[#8B949E] text-xs mb-1 block">TARGET_1</label>
                    <input type="text" placeholder="GitHub Username 1" value={user1} onChange={(e) => setUser1(e.target.value)} required className="w-full bg-[#0D1117] border border-[#30363D] p-3 text-[#00FF41] outline-none focus:border-[#00FF41] rounded" />
                </div>
                <div className="text-[#30363D] font-bold text-xl pb-3 hidden md:block">VS</div>
                <div className="flex-1 w-full">
                    <label className="text-[#8B949E] text-xs mb-1 block">TARGET_2</label>
                    <input type="text" placeholder="GitHub Username 2" value={user2} onChange={(e) => setUser2(e.target.value)} required className="w-full bg-[#0D1117] border border-[#30363D] p-3 text-[#00E5FF] outline-none focus:border-[#00E5FF] rounded" />
                </div>
                <button disabled={loading} type="submit" className="w-full md:w-auto h-12 px-6 bg-[#30363D] hover:bg-[#00FF41]/20 border border-[#30363D] hover:border-[#00FF41] text-white transition-all rounded">
                    {loading ? 'ANALYZING...' : 'EXECUTE_COMPARE'}
                </button>
            </form>

            {error && <div className="text-red-500 mb-8 border border-red-500 p-4 rounded bg-red-900/10">&gt; ERROR: {error}</div>}

            {result && (
                <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Decorative VS indicator */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A0E14] border border-[#30363D] rounded-full items-center justify-center text-[#8B949E] font-bold z-10">VS</div>

                    {[result.user1, result.user2].map((userData, i) => {
                        const isWinnerInFollowers = userData.followers > result[i===0?'user2':'user1'].followers;
                        const isWinnerInStars = userData.totalStars > result[i===0?'user2':'user1'].totalStars;
                        const colorClass = i === 0 ? 'text-[#00FF41]' : 'text-[#00E5FF]';
                        const borderClass = i === 0 ? 'border-[#00FF41]' : 'border-[#00E5FF]';
                        
                        return (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} key={i} className={`border ${borderClass} bg-[#0D1117] p-6 rounded relative overflow-hidden`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={userData.avatar_url} className={`w-16 h-16 rounded-full border-2 ${borderClass}`} alt="" />
                                    <h2 className={`text-2xl font-bold ${colorClass}`}>{userData.username}</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-[#30363D] pb-2">
                                        <span className="text-[#8B949E]">PUBLIC_REPOS</span>
                                        <span className="text-white font-bold">{userData.repoCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-[#30363D] pb-2">
                                        <span className="text-[#8B949E]">FOLLOWERS</span>
                                        <div className="flex items-center gap-2">
                                            {isWinnerInFollowers && <span className="text-yellow-500 text-xs">👑 WINS</span>}
                                            <span className={`font-bold ${isWinnerInFollowers ? 'text-white' : 'text-[#8B949E]'}`}>{userData.followers}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-[#30363D] pb-2">
                                        <span className="text-[#8B949E]">TOTAL_STARS</span>
                                        <div className="flex items-center gap-2">
                                            {isWinnerInStars && <span className="text-yellow-500 text-xs">👑 WINS</span>}
                                            <span className={`font-bold ${isWinnerInStars ? 'text-white' : 'text-[#8B949E]'}`}>{userData.totalStars}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-[#8B949E] text-xs mb-2">TOP_LANGUAGES</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.topLanguages.map((lang, idx) => (
                                            <span key={idx} className="bg-[#30363D] text-[10px] px-2 py-1 rounded">
                                                {lang.language} ({lang.count})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Compare;
