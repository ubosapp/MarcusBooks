import React from 'react';
import { BookOpen, Menu, Settings } from 'lucide-react';
import { View } from '../App';

interface NavbarProps {
  onNavigate: (view: View, params?: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const handleNavClick = (id: string) => {
    onNavigate('home');
    // Allow time for home component to mount if we were elsewhere
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group cursor-pointer border-none bg-transparent p-0" 
            aria-label="MarcusBooks Home"
          >
            <div className="bg-pink-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
              <BookOpen size={28} />
            </div>
            <span className="text-2xl font-bold font-kids tracking-tight text-slate-800">
              Marcus<span className="text-pink-500">Books</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button 
              type="button"
              onClick={() => handleNavClick('coloring')}
              className="text-slate-600 hover:text-pink-500 font-medium transition-colors cursor-pointer border-none bg-transparent"
            >
              Coloring
            </button>
            <button 
              type="button"
              onClick={() => handleNavClick('wordsearch')}
              className="text-slate-600 hover:text-purple-500 font-medium transition-colors cursor-pointer border-none bg-transparent"
            >
              Word Search
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('admin')}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
              title="Admin Panel"
            >
              <Settings size={20} />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button 
              type="button"
              onClick={() => onNavigate('admin')} 
              className="text-slate-400 cursor-pointer border-none bg-transparent"
              title="Admin Panel"
            >
              <Settings size={22} />
            </button>
            <button type="button" className="text-slate-600 border-none bg-transparent" aria-label="Open Menu">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;