import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Briefcase, Clock, X } from 'lucide-react';

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
    }, 800);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Explore Skill Partners</h1>
          <p className="mt-2 text-gray-600">Find people who can teach what you want to learn, and want to learn what you can teach.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-500" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filters Container */}
            <div className={`bg-white p-5 rounded-xl shadow-sm border border-gray-100 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {(searchTerm || selectedExperience !== 'All' || selectedAvailability !== 'All') && (
                  <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                    Clear all
                  </button>
                )}
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Partner Experience</h3>
                <div className="space-y-2">
                  {['All', 'Beginner', 'Intermediate', 'Expert'].map((exp) => (
                    <label key={exp} className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value={exp}
                        checked={selectedExperience === exp}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">{exp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  {['All', 'Weekdays', 'Evenings', 'Weekends', 'Flexible'].map((time) => (
                    <label key={time} className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value={time}
                        checked={selectedAvailability === time}
                        onChange={(e) => setSelectedAvailability(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-600">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6 shadow-sm rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, skill, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Results Status */}
            {!isLoading && (
              <p className="text-sm text-gray-500 mb-4">
                Showing {filteredUsers.length} skill partners
              </p>
            )}

            {/* State Handling */}
            {isLoading ? (
              // Skeleton Loader
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
                  <Search className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No matching partners found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or searching for a different skill.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              // User Cards
              <div className="space-y-6">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5 sm:p-6">
                      <div className="sm:flex sm:items-start sm:justify-between">
                        
                        {/* Profile Info */}
                        <div className="flex items-start gap-4 sm:gap-6">
                          <img src={user.avatar} alt={user.name} className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                              {/* Compatibility Badge (mock logic: green if >80, yellow >50, gray else) */}
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                user.compatibility > 80 ? 'bg-green-100 text-green-800' : 
                                user.compatibility > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.compatibility}% Match
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3 max-w-xl">{user.bio}</p>
                            
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {user.rating} ({user.reviews})</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user.location}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {user.experience}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {user.availability}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons (Desktop aligned right, Mobile stacked bottom) */}
                        <div className="mt-4 sm:mt-0 flex flex-col gap-2 min-w-[140px]">
                          <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors">
                            Request Swap
                          </button>
                          <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            View Profile
                          </button>
                        </div>
                      </div>

                      {/* Skills Sections */}
                      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Can Teach</p>
                          <div className="flex flex-wrap gap-2">
                            {user.teaches.map(skill => (
                              <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Wants to Learn</p>
                          <div className="flex flex-wrap gap-2">
                            {user.wants.map(skill => (
                              <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
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
    </div>
  );
};

export default Explore;
