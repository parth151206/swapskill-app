import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Code, Building, ShieldCheck } from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Sarah Jenkins', role: 'Founder & CEO', image: 'https://i.pravatar.cc/150?img=47' },
    { name: 'Marcus Chen', role: 'Head of Product', image: 'https://i.pravatar.cc/150?img=11' },
    { name: 'Elena Rodriguez', role: 'Lead Engineer', image: 'https://i.pravatar.cc/150?img=32' },
    { name: 'David Kim', role: 'Community Director', image: 'https://i.pravatar.cc/150?img=60' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0A0A0A]">
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#0A0A0A] mb-8 leading-tight">
            Democratizing access to <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] to-[#737373]">elite professional knowledge.</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#737373] max-w-3xl mx-auto mb-10 leading-relaxed">
            We believe that the best way to learn is directly from the people building the future. SwapSkill replaces expensive consultants with a direct, peer-to-peer barter economy.
          </p>
        </div>
      </section>

      {/* Mission / Values Section */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Our Mission</h2>
              <p className="text-lg text-[#737373] leading-relaxed">
                The traditional models of professional development are broken. Corporate training is too broad, and specialized consultants are prohibitively expensive for startups and individuals.
              </p>
              <p className="text-lg text-[#737373] leading-relaxed mt-4">
                SwapSkill was founded in 2024 to create a hyper-efficient market for knowledge. By utilizing a pure time-barter system, we unlock the latent teaching potential in every senior professional while providing them with the advanced training they need to level up.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#E5E5E5]">
              <div>
                <div className="text-4xl font-extrabold text-[#0A0A0A] mb-2">10k+</div>
                <div className="text-sm font-bold text-[#737373] uppercase tracking-wide">Active Members</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#0A0A0A] mb-2">50k+</div>
                <div className="text-sm font-bold text-[#737373] uppercase tracking-wide">Hours Exchanged</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#FAFAFA] p-8 rounded-2xl border border-[#E5E5E5]">
              <Globe className="w-8 h-8 text-[#0A0A0A] mb-4" />
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Global Network</h3>
              <p className="text-sm text-[#737373]">Connect with experts across 40+ countries and time zones.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] shadow-lg transform sm:translate-y-8">
              <ShieldCheck className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Zero Capital</h3>
              <p className="text-sm text-[#737373]">No credit cards. Your expertise is the only currency accepted.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] shadow-lg">
              <Code className="w-8 h-8 text-[#0A0A0A] mb-4" />
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Tech Focused</h3>
              <p className="text-sm text-[#737373]">Specialized exclusively for Engineering, Design, and Product.</p>
            </div>
            <div className="bg-[#FAFAFA] p-8 rounded-2xl border border-[#E5E5E5] transform sm:translate-y-8">
              <Building className="w-8 h-8 text-[#0A0A0A] mb-4" />
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Enterprise Ready</h3>
              <p className="text-sm text-[#737373]">Verified corporate emails ensure high-quality interactions.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#FAFAFA] py-20 lg:py-32 border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Leadership Team</h2>
            <p className="text-lg text-[#737373] max-w-2xl mx-auto">
              Built by a team of former FAANG engineers and product leaders who experienced the pain of finding specialized mentorship firsthand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border border-[#E5E5E5] bg-white">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A]">{member.name}</h3>
                <p className="text-sm font-medium text-[#737373] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to join the barter economy?</h2>
          <p className="text-lg text-[#A3A3A3] mb-10 max-w-2xl mx-auto">
            Stop paying thousands for courses and consultants. Start trading your knowledge with verified professionals today.
          </p>
          <Link to="/register" className="inline-flex justify-center items-center px-8 py-4 border border-transparent rounded-lg text-base font-bold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-all group">
            Create Account
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
