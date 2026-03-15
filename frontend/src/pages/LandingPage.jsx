import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center justify-center mb-6">
                    <div className="p-4 rounded-2xl border border-green-500/30 bg-black/50 shadow-[0_0_24px_rgba(0,255,65,0.2)]">
                        <svg height="60" viewBox="0 0 16 16" width="60" className="fill-[#00FF41] drop-shadow-[0_0_6px_#00FF41]">
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-mono font-bold text-white mb-6">
                    Git<span className="text-[#00FF41] drop-shadow-[0_0_10px_#00FF41]">Finder</span> Pro
                </h1>
                <p className="text-[#8B949E] text-lg md:text-xl font-mono max-w-2xl mx-auto mb-12">
                    <span className="text-[#00FF41]">&gt;</span> Elevate your developer analytics. Track stats, compare profiles, and get AI-powered repository insights.
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }} className="text-[#00FF41]">_</motion.span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/signup" className="px-8 py-3 bg-[#00FF41] text-black font-bold font-mono rounded overflow-hidden relative group hover:shadow-[0_0_20px_#00FF41] transition-all w-full sm:w-auto">
                        <span className="relative z-10">INITIALIZE PRO</span>
                    </Link>
                    <Link to="/login" className="px-8 py-3 border border-[#00FF41] text-[#00FF41] font-bold font-mono rounded hover:bg-[#00FF41]/10 transition-all w-full sm:w-auto">
                        SYSTEM LOGIN
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
