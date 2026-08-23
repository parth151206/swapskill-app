import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Infinity as InfinityIcon, ArrowRight, Globe, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    title: '', // Add professional title for the Firestore doc
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await signup(formData.email, formData.password, fullName, formData.title || 'New Member');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    'Access to 10,000+ verified professionals',
    'AI-powered skill matching algorithm',
    'Secure messaging and resource sharing',
    'Zero subscription or hidden fees',
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center shadow-md">
            <InfinityIcon className="w-6 h-6 text-[#10B981]" />
          </div>
        </Link>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0A0A0A]">
          Join the network
        </h2>
        <p className="mt-2 text-sm text-[#737373]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#10B981] hover:text-[#059669] transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[800px]">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-[#E5E5E5] flex flex-col md:flex-row gap-12">
          
          {/* Left Side - Benefits (Desktop Only) */}
          <div className="hidden md:flex md:w-1/2 flex-col justify-center border-r border-[#E5E5E5] pr-10">
            <h3 className="text-xl font-bold text-[#0A0A0A] mb-6">The future of professional development.</h3>
            <ul className="space-y-5">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <p className="ml-3 text-sm font-medium text-[#737373]">
                    {benefit}
                  </p>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 bg-[#FAFAFA] border border-[#E5E5E5] p-4 rounded-lg">
              <p className="text-xs text-[#737373] italic">
                "We operate on a strict barter system. Your expertise is your currency. No credit card required."
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm bg-[#FAFAFA] focus:bg-white"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm bg-[#FAFAFA] focus:bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Professional Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm bg-[#FAFAFA] focus:bg-white"
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Work Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm bg-[#FAFAFA] focus:bg-white"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0A0A0A] mb-1.5">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm bg-[#FAFAFA] focus:bg-white"
                  placeholder="Create a strong password"
                />
              </div>
              
              <div className="flex items-center mt-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-[#E5E5E5] text-[#10B981] focus:ring-[#10B981] cursor-pointer"
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-[#737373]">
                  I agree to the <a href="#" className="font-bold text-[#0A0A0A] hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-[#0A0A0A] hover:underline">Privacy Policy</a>.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E5E5]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-[#737373] font-bold uppercase tracking-wider text-[10px]">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 inline-flex justify-center items-center py-2.5 border border-[#E5E5E5] rounded-lg shadow-sm bg-white text-sm font-bold text-[#737373] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors">
                  <span className="sr-only">Sign up with Google</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                <button className="flex-1 inline-flex justify-center items-center py-2.5 border border-[#E5E5E5] rounded-lg shadow-sm bg-white text-sm font-bold text-[#737373] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors">
                  <span className="sr-only">Sign up with Tech ID</span>
                  <Globe className="w-5 h-5" />
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
