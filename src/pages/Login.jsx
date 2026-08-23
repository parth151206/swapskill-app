import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Infinity as InfinityIcon, ArrowRight, Globe, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[560px] lg:px-20 xl:px-24 border-r border-[#E5E5E5] bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          <div className="mb-10">
            <Link to="/" className="flex items-center gap-2 mb-8 inline-flex">
              <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center shadow-sm">
                <InfinityIcon className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-xl font-bold text-[#0A0A0A] tracking-tight">SwapSkill</span>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-[#0A0A0A]">Welcome back</h2>
            <p className="mt-2 text-sm text-[#737373]">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-[#10B981] hover:text-[#059669] transition-colors">
                Join the network
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">Work Email</label>
                <div className="mt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-[#0A0A0A]">Password</label>
                  <a href="#" className="text-sm font-semibold text-[#737373] hover:text-[#0A0A0A] transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 border border-[#E5E5E5] rounded-lg text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A0A] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? 'Signing in...' : 'Sign in to account'}
                  {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Right Column - Image/Testimonial */}
      <div className="hidden lg:block relative w-0 flex-1 bg-[#0A0A0A]">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80"
          alt="Team collaborating"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-16 xl:p-24">
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-[#10B981] fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl xl:text-3xl font-medium text-white mb-6 leading-tight">
            "SwapSkill fundamentally changed how our engineering team levels up. We traded our AWS expertise for advanced Figma training with another startup, saving thousands in consultancy fees."
          </blockquote>
          <div className="flex items-center gap-4">
            <img src="https://i.pravatar.cc/150?img=68" alt="Alex Rivera" className="w-12 h-12 rounded-full border-2 border-white/20 grayscale" />
            <div>
              <div className="text-white font-bold">Alex Rivera</div>
              <div className="text-[#A3A3A3] text-sm">CTO, DataTech Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
