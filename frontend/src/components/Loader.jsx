import { motion } from 'framer-motion';

const Loader = () => (
    <div className="flex flex-col items-center gap-4 py-8">
        {/* Neon dots */}
        <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                        background: '#00FF41',
                        boxShadow: '0 0 12px #00FF41, 0 0 24px #00FF4166'
                    }}
                />
            ))}
        </div>
        <p className="font-mono text-sm" style={{ color: '#8B949E' }}>
            <span style={{ color: '#00FF41' }}>$</span> fetching user data
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            >_</motion.span>
        </p>
    </div>
);

export default Loader;
