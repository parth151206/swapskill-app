import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Mock authentication state for Phase 1
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // For testing admin routes

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = isLoggedIn
    ? [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'My Reviews', path: '/my-reviews' },
        { name: 'Dashboard', path: '/dashboard' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Explore Colleges', path: '/explore' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">
                CampusVoice
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-red-600 hover:border-red-300 hover:text-red-700 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Temp Toggle for Phase 1 Testing */}
            <div className="mr-4 flex space-x-2 text-xs">
              <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="bg-gray-100 px-2 py-1 rounded">Toggle Auth</button>
              <button onClick={() => setIsAdmin(!isAdmin)} className="bg-gray-100 px-2 py-1 rounded">Toggle Admin</button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/notifications" className="text-gray-400 hover:text-gray-500 relative p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </Link>
                
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <Link to="/profile" className="flex items-center space-x-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <img
                        className="h-8 w-8 rounded-full object-cover border border-gray-200"
                        src="https://i.pravatar.cc/150?img=11"
                        alt="User Avatar"
                      />
                      <span className="text-sm font-medium text-gray-700 hidden lg:block">Student Name</span>
                    </Link>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
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

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                Admin Panel
              </Link>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src="https://i.pravatar.cc/150?img=11"
                      alt="User Avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Student Name</div>
                    <div className="text-sm font-medium text-gray-500">student@example.com</div>
                  </div>
                  <Link to="/notifications" onClick={() => setIsOpen(false)} className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 mb-3"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <div className="mt-6 px-4 flex justify-between text-xs text-gray-400">
              <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="underline">Toggle Auth (Dev)</button>
              <button onClick={() => setIsAdmin(!isAdmin)} className="underline">Toggle Admin (Dev)</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
