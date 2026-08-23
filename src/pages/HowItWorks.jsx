import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, MessageSquare, Repeat, CheckCircle, Shield, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'Build Your Expertise Profile',
      description: 'Create a professional profile detailing the specific skills you can teach, and the exact skills you want to learn. Our network caters to advanced, specialized knowledge across tech, design, and product.',
      icon: UserPlus,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '02',
      title: 'Find Your Perfect Match',
      description: 'Our matching engine pairs you with professionals who have complementary needs. If you need AWS help and can teach Figma, we find the AWS expert who desperately needs Figma training.',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '03',
      title: 'Exchange Knowledge, Not Money',
      description: 'Connect via our secure messaging platform and share resources. You spend one hour teaching your expertise, and one hour learning theirs. A pure barter system with zero subscription fees or hourly rates.',
      icon: Repeat,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A]">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-[#E5E5E5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-6">
            How the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] to-[#737373]">Barter Economy</span> Works
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#737373] max-w-3xl mx-auto mb-10 leading-relaxed">
            SwapSkill operates on a strict knowledge-for-knowledge basis. Access elite mentorship and training without spending a dime. Your expertise is your currency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent rounded-lg text-base font-bold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-all">
              Join the Network
            </Link>
            <Link to="/explore" className="inline-flex justify-center items-center px-8 py-3.5 border border-[#E5E5E5] rounded-lg text-base font-bold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-all">
              Browse Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-extrabold text-[#E5E5E5]">{step.id}</span>
                  <div className="w-12 h-1 bg-[#10B981]"></div>
                </div>
                <h2 className="text-3xl font-bold text-[#0A0A0A]">{step.title}</h2>
                <p className="text-lg text-[#737373] leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-3 pt-4">
                  {[1, 2, 3].map((_, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10B981]" />
                      <span className="text-[#0A0A0A] font-medium">Enterprise-grade feature standard</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Content */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-[#E5E5E5] bg-white group">
                  <div className="aspect-w-16 aspect-h-10 lg:aspect-h-12 w-full h-[300px] lg:h-[400px]">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent"></div>
                  
                  {/* Floating Icon Card */}
                  <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg border border-[#E5E5E5] flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-[#FAFAFA] p-3 rounded-lg">
                      <step.icon className="w-6 h-6 text-[#0A0A0A]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#737373] uppercase tracking-wide">Phase {step.id}</div>
                      <div className="text-sm font-bold text-[#0A0A0A]">System Activated</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Trust / Value Prop Section */}
      <section className="bg-white border-t border-[#E5E5E5] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-16">Why forward-thinking professionals use SwapSkill</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-white rounded-xl border border-[#E5E5E5] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield className="w-7 h-7 text-[#0A0A0A]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Verified Network</h3>
              <p className="text-[#737373] leading-relaxed text-sm">
                Every member is verified through work emails and LinkedIn. You only swap with real professionals currently working in the industry.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-white rounded-xl border border-[#E5E5E5] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Zap className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Hyper-Targeted</h3>
              <p className="text-[#737373] leading-relaxed text-sm">
                No broad courses. You learn exactly what you need to solve your current roadblock directly from an expert who has solved it before.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-white rounded-xl border border-[#E5E5E5] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MessageSquare className="w-7 h-7 text-[#0A0A0A]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Integrated Tooling</h3>
              <p className="text-[#737373] leading-relaxed text-sm">
                Schedule, chat, and share resources directly within the platform. All the tools you need for a seamless knowledge transfer.
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HowItWorks;
