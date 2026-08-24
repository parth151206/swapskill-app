import React, { useState, useEffect } from 'react';
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
  const { signup, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
