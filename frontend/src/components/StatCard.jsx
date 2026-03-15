import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="rounded-xl p-5 text-center border transition-all duration-300 group cursor-default"
            style={{
                background: '#0D1117',
                borderColor: '#30363D',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00FF4166';
                e.currentTarget.style.boxShadow = '0 0 16px #00FF4122';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#30363D';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Icon */}
            <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 border transition-colors"
                style={{ background: '#161B22', borderColor: '#30363D', color: '#8B949E' }}
            >
                {icon}
            </div>
            {/* Value */}
            <div className="font-mono font-bold text-2xl mb-1" style={{ color: '#00FF41', textShadow: '0 0 10px #00FF4166' }}>
                {value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}
            </div>
            {/* Label */}
            <div className="font-mono text-xs uppercase tracking-widest" style={{ color: '#8B949E' }}>
                {label}
            </div>
        </motion.div>
    );
};

export default StatCard;
