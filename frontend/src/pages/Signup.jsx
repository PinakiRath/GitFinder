import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate('/search');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-black/80 border border-[#00FF41] p-8 rounded shadow-[0_0_15px_#00FF4144] w-full max-w-md font-mono">
                <h2 className="text-2xl text-[#00FF41] mb-6 border-b border-[#00FF41] pb-2">&gt; NEW_USER_REGISTRATION</h2>
                {error && <p className="text-red-500 mb-4">&gt; ERROR: {error}</p>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-[#8B949E] text-sm block mb-1">USERNAME / HANDLE</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-transparent border border-[#30363D] focus:border-[#00FF41] outline-none text-[#00FF41] p-2 rounded" />
                    </div>
                    <div>
                        <label className="text-[#8B949E] text-sm block mb-1">EMAIL_ADDRESS</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent border border-[#30363D] focus:border-[#00FF41] outline-none text-[#00FF41] p-2 rounded" />
                    </div>
                    <div>
                        <label className="text-[#8B949E] text-sm block mb-1">PASSWORD (MIN 6)</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full bg-transparent border border-[#30363D] focus:border-[#00FF41] outline-none text-[#00FF41] p-2 rounded" />
                    </div>
                    <button type="submit" className="mt-4 bg-[#00FF41] text-black font-bold p-2 rounded hover:shadow-[0_0_15px_#00FF41] transition-all">
                        INITIALIZE_PROFILE
                    </button>
                    <p className="text-center text-[#8B949E] text-sm mt-4">
                        ALREADY_REGISTERED? <Link to="/login" className="text-[#00FF41] hover:underline">LOGIN_HERE</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
