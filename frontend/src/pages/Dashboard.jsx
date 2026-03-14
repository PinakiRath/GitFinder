import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get('/api/history');
                if (res.data.success) {
                    setHistory(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 font-mono">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 p-6 border border-[#00FF41] rounded bg-[#0D1117] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF41]"></div>
                <h1 className="text-3xl font-bold text-white mb-2">SYSTEM_DASHBOARD</h1>
                <p className="text-[#8B949E]">WELCOME_BACK: <span className="text-[#00E5FF]">{user?.name}</span></p>
                <div className="mt-4 flex gap-4 text-sm">
                    <span className="bg-[#00FF41]/10 text-[#00FF41] px-2 py-1 rounded">PLAN: {user?.plan?.toUpperCase()}</span>
                    <span className="bg-[#FF5F57]/10 text-[#FF5F57] px-2 py-1 rounded">USAGE: {user?.dailyUsage?.count || 0} / {user?.plan === 'pro' ? '∞' : '10'}</span>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl text-[#00FF41] mb-6 flex items-center gap-2">
                    <span className="animate-pulse w-3 h-3 bg-[#00FF41] inline-block rounded-full"></span>
                    LOGGED_SEARCH_HISTORY
                </h2>

                {loading ? (
                    <div className="text-center text-[#8B949E] py-10">LOADING_DATA...</div>
                ) : history.length === 0 ? (
                    <div className="text-center border border-[#30363D] p-10 rounded text-[#8B949E]">
                        NO_HISTORY_FOUND. <Link to="/search" className="text-[#00FF41] hover:underline">INITIATE_SEARCH</Link>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {history.map((item, i) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                transition={{ delay: i * 0.05 }}
                                key={item._id} 
                                className="border border-[#30363D] hover:border-[#00FF41] bg-[#0A0E14] p-4 rounded transition-all group cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white font-bold group-hover:text-[#00FF41] transition-colors">@{item.searchedUsername}</span>
                                    <span className="text-xs text-[#8B949E]">{new Date(item.searchDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Link to={`/analytics/${item.searchedUsername}`} className="flex-1 text-center text-xs border border-[#30363D] hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] py-1 rounded transition-colors text-[#8B949E]">
                                        ANALYZE
                                    </Link>
                                    <Link onClick={() => { localStorage.setItem('last_search', item.searchedUsername) }} to="/search" className="flex-1 text-center text-xs border border-[#30363D] hover:bg-[#00FF41]/10 hover:text-[#00FF41] py-1 rounded transition-colors text-[#8B949E]">
                                        VIEW_PROFILE
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Dashboard;
