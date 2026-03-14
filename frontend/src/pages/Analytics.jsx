import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get(`/api/analytics/${username}`);
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching analytics (Rate limit?)');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [username]);

    const COLORS = ['#00FF41', '#00E5FF', '#FEBC2E', '#FF5F57', '#B620E0'];

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 font-mono">
            <Link to="/dashboard" className="text-[#8B949E] hover:text-[#00FF41] transition-colors flex items-center gap-2 mb-8">
                &lt; BACK_TO_DASHBOARD
            </Link>

            {loading ? (
                <div className="flex justify-center items-center h-48 text-[#00FF41] text-xl animate-pulse">
                    GENERATING_ANALYTICS...
                </div>
            ) : error ? (
                <div className="text-red-500 border border-red-500 p-4 bg-red-900/20 rounded">
                    &gt; ERROR: {error}
                </div>
            ) : data && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-8 border-b border-[#30363D] pb-4 flex justify-between items-end">
                        <h1 className="text-3xl font-bold text-white">
                            TARGET: <span className="text-[#00FF41]">{username}</span>
                        </h1>
                        <span className="text-[#00E5FF] text-xl">POPULARITY_SCORE: {data.popularityScore}</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'REPOSITORIES', value: data.totalRepositories },
                            { label: 'FOLLOWERS', value: data.followers },
                            { label: 'TOTAL_STARS', value: data.totalStars },
                            { label: 'TOTAL_FORKS', value: data.totalForks }
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-[#0D1117] border border-[#30363D] p-5 rounded relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF41]/20 group-hover:bg-[#00FF41] transition-colors" />
                                <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#00FF41] transition-colors">{stat.value}</div>
                                <div className="text-[#8B949E] text-xs uppercase">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid md:grid-cols-2 gap-8 h-[400px]">
                        <div className="bg-[#0D1117] border border-[#30363D] p-4 rounded flex flex-col">
                            <h3 className="text-[#8B949E] text-sm mb-4">LANGUAGE_DISTRIBUTION</h3>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={data.topLanguages} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="count" nameKey="language" stroke="none">
                                            {data.topLanguages.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #00FF41', color: '#fff', borderRadius: '4px' }}
                                            itemStyle={{ color: '#00FF41' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-[#0D1117] border border-[#30363D] p-4 rounded flex flex-col">
                            <h3 className="text-[#8B949E] text-sm mb-4">LANGUAGE_VOLUMES</h3>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.topLanguages}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                                        <XAxis dataKey="language" stroke="#8B949E" tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#8B949E" tick={{ fill: '#8B949E', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            cursor={{ fill: '#30363D' }}
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #00FF41', color: '#fff', borderRadius: '4px' }}
                                            itemStyle={{ color: '#00FF41' }}
                                        />
                                        <Bar dataKey="count" fill="#00FF41" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Analytics;
