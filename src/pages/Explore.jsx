import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Briefcase, Clock, X, CheckCircle, ArrowRight } from 'lucide-react';

// Mock Data
const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Frontend developer passionate about building accessible web apps.',
    location: 'San Francisco, CA',
    experience: 'Intermediate',
    availability: 'Evenings',
    teaches: ['React', 'JavaScript', 'Tailwind CSS'],
    wants: ['UI/UX Design', 'Figma'],
    rating: 4.8,
    reviews: 24,
    compatibility: 95,
  },
  {
    id: 'u2',
    name: 'David Kumar',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Product designer looking to level up my coding skills.',
    location: 'Remote',
    experience: 'Expert',
    availability: 'Weekends',
    teaches: ['Figma', 'UI/UX Design', 'Graphic Design'],
    wants: ['React', 'Next.js'],
    rating: 4.9,
    reviews: 41,
    compatibility: 88,
  },
  {
    id: 'u3',
    name: 'Elena Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Data scientist who loves teaching Python and stats.',
    location: 'New York, NY',
    experience: 'Expert',
    availability: 'Flexible',
    teaches: ['Python', 'Data Analysis', 'Machine Learning'],
    wants: ['Spanish', 'Public Speaking'],
    rating: 4.7,
    reviews: 18,
    compatibility: 45,
  },
  {
    id: 'u4',
    name: 'Marcus Johnson',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Native Spanish speaker looking to learn Python for my new job.',
    location: 'Chicago, IL',
    experience: 'Beginner',
    availability: 'Evenings',
    teaches: ['Spanish', 'Guitar'],
    wants: ['Python', 'SQL'],
    rating: 4.5,
    reviews: 12,
    compatibility: 60,
  },
  {
    id: 'u5',
    name: 'Jessica Lee',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Digital marketer who wants to learn frontend development.',
    location: 'Austin, TX',
    experience: 'Intermediate',
    availability: 'Weekends',
    teaches: ['Digital Marketing', 'SEO', 'Content Strategy'],
    wants: ['HTML', 'CSS', 'JavaScript'],
    rating: 4.6,
    reviews: 29,
    compatibility: 75,
  },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filtering Logic
  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.teaches.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.wants.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesExperience = selectedExperience === 'All' || user.experience === selectedExperience;
    const matchesAvailability = selectedAvailability === 'All' || user.availability === selectedAvailability;
    
    return matchesSearch && matchesExperience && matchesAvailability;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedExperience('All');
    setSelectedAvailability('All');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans">
      {/* Header Area */}
      <div className="bg-white border-b border-[#E5E5E5] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0A]">Network Directory</h1>
              <p className="mt-3 text-[#737373] text-lg max-w-2xl">
                Discover verified professionals ready to exchange knowledge. Match based on complimentary skillsets.
              </p>
            </div>
            <div className="text-sm font-semibold text-[#737373] bg-[#FAFAFA] border border-[#E5E5E5] px-4 py-2 rounded-lg flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              {filteredUsers.length} verified members active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar / Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden w-full flex items-center justify-center px-4 py-3 border border-[#E5E5E5] rounded-lg shadow-sm text-sm font-bold text-[#0A0A0A] bg-white mb-4 transition-colors hover:bg-[#FAFAFA]"
          >
            <Filter className="h-4 w-4 mr-2" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters Container */}
          <div className={`bg-white p-6 rounded-xl shadow-sm border border-[#E5E5E5] ${isFilterOpen ? 'block' : 'hidden lg:block'} sticky top-24`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold tracking-wide uppercase text-[#0A0A0A]">Filters</h2>
              {(searchTerm || selectedExperience !== 'All' || selectedAvailability !== 'All') && (
                <button onClick={clearFilters} className="text-xs font-semibold text-[#737373] hover:text-[#10B981] transition-colors">
                  Clear all
                </button>
              )}
            </div>

            {/* Experience Filter */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-[#737373] mb-4 uppercase tracking-wider">Experience Level</h3>
              <div className="space-y-3">
                {['All', 'Beginner', 'Intermediate', 'Expert'].map((exp) => (
                  <label key={exp} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4 mr-3">
                      <input
                        type="radio"
                        name="experience"
                        value={exp}
                        checked={selectedExperience === exp}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="peer appearance-none w-4 h-4 border border-[#E5E5E5] rounded-full checked:border-[#10B981] transition-colors cursor-pointer"
                      />
                      <div className="absolute w-2 h-2 rounded-full bg-[#10B981] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <span className={`text-sm transition-colors ${selectedExperience === exp ? 'text-[#0A0A0A] font-semibold' : 'text-[#737373] group-hover:text-[#0A0A0A]'}`}>
                      {exp}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h3 className="text-xs font-bold text-[#737373] mb-4 uppercase tracking-wider">Availability</h3>
              <div className="space-y-3">
                {['All', 'Weekdays', 'Evenings', 'Weekends', 'Flexible'].map((time) => (
                  <label key={time} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4 mr-3">
                      <input
                        type="radio"
                        name="availability"
                        value={time}
                        checked={selectedAvailability === time}
                        onChange={(e) => setSelectedAvailability(e.target.value)}
                        className="peer appearance-none w-4 h-4 border border-[#E5E5E5] rounded-full checked:border-[#10B981] transition-colors cursor-pointer"
                      />
                      <div className="absolute w-2 h-2 rounded-full bg-[#10B981] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <span className={`text-sm transition-colors ${selectedAvailability === time ? 'text-[#0A0A0A] font-semibold' : 'text-[#737373] group-hover:text-[#0A0A0A]'}`}>
                      {time}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-8 shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#737373]" />
            </div>
            <input
              type="text"
              placeholder="Search by name, skill, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-12 py-4 border border-[#E5E5E5] rounded-xl leading-5 bg-white text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] sm:text-sm transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-[#737373] hover:text-[#0A0A0A] transition-colors" />
              </button>
            )}
          </div>

          {/* State Handling */}
          {isLoading ? (
            // Skeleton Loader
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#E5E5E5]"></div>
                    <div className="flex-1 space-y-3 mt-2">
                      <div className="h-4 bg-[#E5E5E5] rounded w-1/4"></div>
                      <div className="h-3 bg-[#E5E5E5] rounded w-1/2"></div>
                      <div className="h-3 bg-[#E5E5E5] rounded w-3/4 mt-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-16 text-center">
              <div className="mx-auto h-12 w-12 text-[#E5E5E5] mb-4">
                <Search className="h-full w-full" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">No matching profiles found</h3>
              <p className="mt-2 text-sm text-[#737373] max-w-sm mx-auto">
                We couldn't find anyone matching your exact criteria. Try adjusting your filters or expanding your search.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center px-6 py-2 border border-[#E5E5E5] text-sm font-semibold rounded-lg text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            // User Cards
            <div className="space-y-5">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#D4D4D4] transition-all group">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                      
                      {/* Profile Info */}
                      <div className="flex items-start gap-5">
                        <div className="relative">
                          <img src={user.avatar} alt={user.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-[#E5E5E5] grayscale group-hover:grayscale-0 transition-all duration-500" />
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <CheckCircle className="w-5 h-5 text-[#10B981]" />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-[#0A0A0A]">{user.name}</h2>
                            {/* Compatibility Badge */}
                            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${
                              user.compatibility > 80 ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 
                              user.compatibility > 50 ? 'bg-[#FAFAFA] text-[#737373] border-[#E5E5E5]' : 'bg-[#FAFAFA] text-[#737373] border-[#E5E5E5]'
                            }`}>
                              {user.compatibility}% Match
                            </span>
                          </div>
                          
                          <p className="text-sm text-[#737373] mb-4 max-w-xl leading-relaxed">{user.bio}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#737373]">
                            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#0A0A0A] fill-current" /> <span className="text-[#0A0A0A]">{user.rating}</span> ({user.reviews})</span>
                            <span className="hidden sm:inline text-[#E5E5E5]">|</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {user.location}</span>
                            <span className="hidden sm:inline text-[#E5E5E5]">|</span>
                            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {user.experience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 min-w-[150px] shrink-0">
                        <button className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0A0A0A] hover:bg-[#262626] transition-colors">
                          Request Swap
                        </button>
                        <Link to="/profile" className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-sm font-semibold text-[#0A0A0A] bg-white hover:bg-[#FAFAFA] transition-colors group/btn">
                          View Profile <ArrowRight className="ml-1.5 w-3.5 h-3.5 text-[#737373] group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="mt-6 pt-5 border-t border-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                          <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wide">Expertise to Share</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {user.teaches.map(skill => (
                            <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#FAFAFA] text-[#0A0A0A] border border-[#E5E5E5]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]"></div>
                          <p className="text-xs font-bold text-[#737373] uppercase tracking-wide">Seeking to Learn</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {user.wants.map(skill => (
                            <span key={skill} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-[#737373] border border-[#E5E5E5] border-dashed">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
