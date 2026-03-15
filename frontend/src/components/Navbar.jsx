import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (location.pathname === '/') return null; // Don't show on landing

    return (
        <nav className="border-b border-[#30363D] bg-[#0A0E14] font-mono z-50 relative sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 text-white font-bold text-xl hover:text-[#00FF41] transition-colors">
                            Git<span className="text-[#00FF41]">Finder</span>_
                        </Link>
                        {user && (
                            <div className="hidden md:block ml-10">
                                <div className="flex items-baseline space-x-4">
                                    <Link to="/dashboard" className="text-[#8B949E] hover:text-white px-3 py-2 rounded-md text-sm font-medium">DASHBOARD</Link>
                                    <Link to="/search" className="text-[#8B949E] hover:text-white px-3 py-2 rounded-md text-sm font-medium">SEARCH</Link>
                                    <Link to="/compare" className="text-[#8B949E] hover:text-white px-3 py-2 rounded-md text-sm font-medium">COMPARE</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-[#00FF41] text-sm animate-pulse hidden sm:inline-block">AUTHORIZED: {user.name}</span>
                                <button onClick={handleLogout} className="text-[#8B949E] hover:text-red-500 text-sm font-bold transition-colors">
                                    [LOGOUT]
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-[#8B949E] hover:text-white text-sm">LOGIN</Link>
                                <Link to="/signup" className="text-[#00FF41] border border-[#00FF41] px-3 py-1 rounded text-sm hover:bg-[#00FF41]/10 transition-colors">SIGNUP</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
