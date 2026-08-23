import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Placeholder Pages for Phase 1 testing until we build them
const Explore = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Explore Skills</h1></div>;
const HowItWorks = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">How It Works</h1></div>;
const About = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">About Us</h1></div>;
const Login = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Login</h1></div>;
const Register = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Register</h1></div>;

// Authenticated Mock Routes
const Dashboard = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Dashboard</h1></div>;
const Matches = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">My Matches</h1></div>;
const Requests = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Requests</h1></div>;
const Profile = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Profile</h1></div>;
const Notifications = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">Notifications</h1></div>;

const NotFound = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-3xl font-bold">404 - Skill Not Found</h1></div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
