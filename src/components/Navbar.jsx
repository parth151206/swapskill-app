import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, Infinity as InfinityIcon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = isLoggedIn
    ? [
        { name: 'Discover', path: '/explore' },
        { name: 'Matches', path: '/matches' },
        { name: 'Requests', path: '/requests' },
        { name: 'Messages', path: '/messages' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Settings', path: '/settings' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Discover', path: '/explore' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 font-sans shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo area */}
            <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center shadow-sm">
                <InfinityIcon className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-[#0A0A0A]">SwapSkill</span>
            </Link>
            
            {/* Nav Links */}
            <div className="hidden lg:ml-12 lg:flex lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-[#10B981]'
                      : 'text-[#737373] hover:text-[#0A0A0A]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/notifications" className="text-[#737373] hover:text-[#0A0A0A] relative transition-colors">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-[#10B981]" />
                </Link>
                
                <div className="flex items-center pl-2 space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 focus:outline-none transition-colors">
                    <img
                      className="h-8 w-8 rounded-full border-2 border-white shadow-sm object-cover grayscale"
                      src={currentUser?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'U')}&background=0A0A0A&color=fff`}
                      alt="User Avatar"
                    />
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-[#737373] hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-[#737373] font-semibold hover:text-[#0A0A0A] text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-[#0A0A0A] text-white hover:bg-[#262626] hover:shadow-md px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white absolute w-full shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block pl-4 pr-4 py-3 border-l-4 text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-4 border-t border-gray-200">
            {isLoggedIn ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary-100"
                      src={currentUser?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'U')}&background=0A0A0A&color=fff`}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-800">{currentUser?.name || 'User'}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
                  </div>
                  <Link to="/notifications" onClick={() => setIsOpen(false)} className="ml-auto flex-shrink-0 bg-white p-2 rounded-full text-gray-400 hover:text-gray-500 relative">
                    <Bell className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
                  </Link>
                </div>
                <div className="mt-4 space-y-1 px-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3 px-4 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <div className="mt-6 px-4 flex justify-center text-sm text-gray-400 pb-2">
              <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="underline hover:text-gray-600">Toggle Mock Auth</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
