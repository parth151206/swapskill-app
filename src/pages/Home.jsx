import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Repeat, CheckCircle, Shield, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#0A0A0A] selection:bg-[#10B981] selection:text-white">
      
      {/* 1. Hero Section - Enterprise Monochrome Style */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
        {/* Subtle grid background for tech feel */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-5xl mx-auto z-10">
          
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[#0A0A0A] text-sm font-semibold mb-8 border border-[#E5E5E5] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#10B981] mr-2"></span>
            SwapSkill Enterprise 2.0 Now Available
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A0A0A] mb-6 leading-[1.1] tracking-tight">
            The Professional Network for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#525252]">
              Skill Exchange.
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-[#737373] max-w-3xl mx-auto font-normal leading-relaxed">
            Empower your career through reciprocal learning. Connect with industry leaders, exchange expertise, and accelerate professional growth on a secure, purpose-built platform.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-[#0A0A0A] text-white font-semibold rounded-lg hover:bg-[#262626] hover:shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] transition-all flex items-center justify-center"
            >
              Get Started
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3.5 bg-white text-[#0A0A0A] font-semibold rounded-lg border border-[#E5E5E5] hover:bg-[#FAFAFA] transition-all flex items-center justify-center group"
            >
              Explore Network <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Hero Visual - Dashboard Mockup Style */}
        <div className="mt-20 w-full max-w-6xl mx-auto px-4 z-10">
          <div className="rounded-xl overflow-hidden border border-[#E5E5E5] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-white p-2">
            <div className="rounded-lg overflow-hidden border border-[#E5E5E5] bg-[#FAFAFA] relative">
              <div className="h-12 bg-white border-b border-[#E5E5E5] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]"></div>
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]"></div>
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" 
                alt="Dashboard Data"
                className="w-full h-[400px] object-cover opacity-90 grayscale contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent flex items-end justify-center pb-12">
                <div className="bg-white border border-[#E5E5E5] shadow-lg rounded-lg p-6 flex items-center gap-6">
                  <div className="flex -space-x-4">
                    <img className="w-12 h-12 rounded-full border-2 border-white grayscale" src="https://i.pravatar.cc/150?img=11" alt="User" />
                    <img className="w-12 h-12 rounded-full border-2 border-white grayscale" src="https://i.pravatar.cc/150?img=32" alt="User" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0A0A0A]">Match Secured</div>
                    <div className="text-xs text-[#737373]">System Architecture ⇄ Product Strategy</div>
                  </div>
                  <div className="pl-4 border-l border-[#E5E5E5]">
                    <CheckCircle className="w-6 h-6 text-[#10B981]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Prop - Corporate Grid */}
      <section className="py-24 bg-white border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">Built for Professionals</h2>
            <p className="text-lg text-[#737373]">Our platform is designed to facilitate high-value knowledge transfer with enterprise-grade reliability.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Verified Network', 
                desc: 'Every member is professionally verified to ensure high-quality interactions and authentic expertise.',
                icon: <Shield className="w-6 h-6" /> 
              },
              { 
                title: 'Smart Matching Engine', 
                desc: 'Our proprietary algorithm analyzes over 50 data points to pair you with the ideal counterpart.',
                icon: <Zap className="w-6 h-6" /> 
              },
              { 
                title: 'Structured Exchanges', 
                desc: 'Built-in messaging, scheduling, and agenda tools to maximize the value of your time.',
                icon: <Repeat className="w-6 h-6" /> 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FAFAFA] rounded-xl p-8 border border-[#E5E5E5] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E5E5] text-[#10B981] flex items-center justify-center mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{item.title}</h3>
                <p className="text-[#737373] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Metrics - Data Driven */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#262626]">
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10k+</div>
              <div className="text-sm font-semibold text-[#737373] uppercase tracking-wider">Verified Users</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-sm font-semibold text-[#737373] uppercase tracking-wider">Industries</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">25k+</div>
              <div className="text-sm font-semibold text-[#737373] uppercase tracking-wider">Swaps Completed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">99%</div>
              <div className="text-sm font-semibold text-[#737373] uppercase tracking-wider">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Corporate CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6">Elevate your team's capabilities.</h2>
          <p className="text-lg text-[#737373] mb-10 max-w-2xl mx-auto">
            Join the thousands of professionals who are already leveraging SwapSkill to stay ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-colors"
            >
              Join the Network
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3.5 bg-white text-[#0A0A0A] font-semibold rounded-lg border border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors"
            >
              Browse Skills
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
