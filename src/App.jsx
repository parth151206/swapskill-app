import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Placeholder Pages for Phase 1 - Page 1 Testing
const Home = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold text-gray-900">CampusVoice Home</h1><p className="mt-4 text-gray-600">Find the Right College Through Real Student Experiences.</p></div>;
const Explore = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Explore Colleges</h1></div>;
const About = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">About Us</h1></div>;
const Contact = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Contact</h1></div>;
const Login = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Login</h1></div>;
const Register = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Register</h1></div>;
const Dashboard = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Dashboard</h1></div>;
const Profile = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Profile</h1></div>;
const MyReviews = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">My Reviews</h1></div>;
const Notifications = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Notifications</h1></div>;
const AdminPanel = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1></div>;
const NotFound = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/notifications" element={<Notifications />} />
            
            <Route path="/admin" element={<AdminPanel />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Basic Footer Placeholder */}
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CampusVoice. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
