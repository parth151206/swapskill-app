import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Mock authentication state for Phase 1
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = isLoggedIn
    ? [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'Matches', path: '/matches' },
        { name: 'Requests', path: '/requests' },
        { name: 'Dashboard', path: '/dashboard' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight flex items-center gap-2">
              <span className="bg-primary-600 text-white p-1 rounded-lg">⇄</span>
              SwapSkill
            </Link>
            <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'border-primary-600 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Temp Toggle for Phase 1 Testing */}
            <div className="mr-4 text-xs">
              <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors border border-gray-200 text-gray-600">
                Mock: {isLoggedIn ? 'Log Out' : 'Log In'}
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-5">
                <Link to="/notifications" className="text-gray-400 hover:text-primary-600 relative p-1 rounded-full focus:outline-none transition-colors">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute top-0 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
                </Link>
                
                <div className="flex items-center space-x-3 border-l pl-5 border-gray-200">
                  <Link to="/profile" className="flex items-center space-x-2 focus:outline-none group">
                    <img
                      className="h-9 w-9 rounded-full object-cover border-2 border-transparent group-hover:border-primary-500 transition-all"
                      src="https://i.pravatar.cc/150?img=33"
                      alt="User Avatar"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">Alex Doe</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-all"
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
                      src="https://i.pravatar.cc/150?img=33"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-800">Alex Doe</div>
                    <div className="text-sm font-medium text-gray-500">alex@swapskill.com</div>
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
                    onClick={() => setIsOpen(false)}
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
