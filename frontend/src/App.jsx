import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';
import MatrixBackground from './components/MatrixBackground';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProfileSearch from './pages/ProfileSearch';
import Analytics from './pages/Analytics';
import Compare from './pages/Compare';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div className="text-[#00FF41] font-mono h-screen flex items-center justify-center">CHECKING_AUTHORIZATION...</div>;
    return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div className="text-[#00FF41] font-mono h-screen flex items-center justify-center">CHECKING_SESSION...</div>;
    return user ? <Navigate to="/dashboard" /> : children;
};

const AppContent = () => {
    return (
        <div className="min-h-screen scanlines relative" style={{ background: '#0A0E14', fontFamily: "'Inter', system-ui, sans-serif" }}>
            <Navbar />
            
            {/* ── Canvas animated background (z-index 0, behind everything) ── */}
            <MatrixBackground />

            {/* ── Subtle ambient blobs on top of canvas, below UI ── */}
            <div className="fixed pointer-events-none" style={{
                zIndex: 1,
                top: '8%', left: '6%', width: '400px', height: '400px',
                background: 'radial-gradient(circle, #00FF410A 0%, transparent 65%)',
                filter: 'blur(70px)'
            }} />
            <div className="fixed pointer-events-none" style={{
                zIndex: 1,
                bottom: '8%', right: '6%', width: '350px', height: '350px',
                background: 'radial-gradient(circle, #00E5FF07 0%, transparent 65%)',
                filter: 'blur(70px)'
            }} />

            {/* ── Main Content Area ── */}
            <div className="relative z-10 min-h-[calc(100vh-64px)] w-full">
                <Routes>
                    <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/search" element={<PrivateRoute><ProfileSearch /></PrivateRoute>} />
                    <Route path="/analytics/:username" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                    <Route path="/compare" element={<PrivateRoute><Compare /></PrivateRoute>} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
