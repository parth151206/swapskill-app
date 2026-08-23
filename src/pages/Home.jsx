import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, Repeat } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-primary-50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Learn Something New.</span>{' '}
                <span className="block text-primary-600">Teach What You Know.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                SwapSkill connects people who want to exchange knowledge and skills through meaningful skill-sharing. No money, just mutual growth.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Find Your Skill Match
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Explore Skills
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                {/* Mock UI for Hero Visual */}
                <div className="bg-white p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sarah M.</p>
                        <p className="text-xs text-gray-500">Can teach: Graphic Design</p>
                      </div>
                    </div>
                    <Repeat className="text-primary-500 h-6 w-6" />
                    <div className="flex items-center space-x-3 text-right">
                      <div>
                        <p className="text-sm font-medium text-gray-900">David K.</p>
                        <p className="text-xs text-gray-500">Can teach: JavaScript</p>
                      </div>
                      <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=12" alt="" />
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center font-medium border border-green-100">
                    Perfect Skill Match! 98% Compatibility
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Process</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How SwapSkill Works
            </p>
          </div>
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Create Profile', desc: 'Sign up and tell us about yourself.' },
                { step: '02', title: 'Add Skills', desc: 'List what you can teach and want to learn.' },
                { step: '03', title: 'Find Match', desc: 'Connect with perfect skill partners.' },
                { step: '04', title: 'Start Swap', desc: 'Chat, exchange knowledge, and grow.' }
              ].map((item) => (
                <div key={item.step} className="relative text-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Skills */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Popular Skills to Swap</h2>
              <p className="mt-2 text-gray-500">Discover what our community is learning today.</p>
            </div>
            <Link to="/explore" className="hidden sm:inline-flex text-primary-600 font-medium hover:text-primary-700">
              View all skills &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['JavaScript', 'React', 'Python', 'Graphic Design', 'UI/UX', 'Photography'].map((skill) => (
              <div key={skill} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary-500 hover:shadow-md transition-all cursor-pointer">
                <span className="font-medium text-gray-900">{skill}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/explore" className="text-primary-600 font-medium hover:text-primary-700">
              View all skills &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Matches (Mock Data) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Featured Community Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img className="h-12 w-12 rounded-full" src={`https://i.pravatar.cc/150?img=${i * 10}`} alt="" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">User {i}</h3>
                      <div className="flex items-center text-sm text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-gray-600">4.{9 - i} (1{i} swaps)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Teaches</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">Frontend Dev</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Wants to learn</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md">Spanish</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <button className="w-full text-center text-sm font-medium text-primary-600 hover:text-primary-700">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistics */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-white">10k+</div>
              <div className="mt-2 text-sm font-medium text-primary-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white">500+</div>
              <div className="mt-2 text-sm font-medium text-primary-100">Skills Available</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white">25k+</div>
              <div className="mt-2 text-sm font-medium text-primary-100">Successful Swaps</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white">4.9/5</div>
              <div className="mt-2 text-sm font-medium text-primary-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Ready to share your knowledge?</h2>
          <p className="mt-4 text-lg text-gray-500">Join the SwapSkill community today and start learning for free.</p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-md transition-all"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
