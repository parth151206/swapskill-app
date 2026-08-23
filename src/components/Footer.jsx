import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, MessageCircle, Infinity as InfinityIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center shadow-sm">
                <InfinityIcon className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-[#0A0A0A]">SwapSkill</span>
            </Link>
            <p className="text-[#737373] text-sm leading-relaxed font-sans pr-4">
              Enterprise-grade knowledge exchange for forward-thinking organizations and professionals.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-[#0A0A0A] mb-4 tracking-wide uppercase">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/explore" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors font-medium">Enterprise Network</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors font-medium">Security</Link></li>
              <li><Link to="/pricing" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors font-medium">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-[#0A0A0A] mb-4 tracking-wide uppercase">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors font-medium">About Us</Link></li>
              <li><Link to="/journal" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors font-medium">Case Studies</Link></li>
              <li><Link to="/contact" className="text-sm text-[#737373] hover:text-[#10B981] transition-colors font-medium">Contact Sales</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-[#0A0A0A] mb-4 tracking-wide uppercase">Connect</h3>
            <div className="flex space-x-5">
              <a href="#" className="text-[#737373] hover:text-[#0A0A0A] transition-colors bg-[#FAFAFA] border border-[#E5E5E5] p-2 rounded-lg">
                <span className="sr-only">Twitter</span>
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#737373] hover:text-[#0A0A0A] transition-colors bg-[#FAFAFA] border border-[#E5E5E5] p-2 rounded-lg">
                <span className="sr-only">GitHub</span>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#737373] hover:text-[#0A0A0A] transition-colors bg-[#FAFAFA] border border-[#E5E5E5] p-2 rounded-lg">
                <span className="sr-only">LinkedIn</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#E5E5E5] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#737373] font-medium font-sans">
            &copy; {new Date().getFullYear()} SwapSkill Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
