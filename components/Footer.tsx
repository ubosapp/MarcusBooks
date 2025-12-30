import React from 'react';
import { BookOpen, Mail, Lock } from 'lucide-react';
import { View } from '../App';

interface FooterProps {
  onNavigate: (view: View, params?: string | null) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleScrollTo = (id: string) => {
    onNavigate('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-pink-500 p-2 rounded-xl text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-2xl font-bold font-kids tracking-tight text-white">
                Marcus<span className="text-pink-500">Books</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-70">
              The world of creativity and fun for children. Books designed with love to stimulate learning through play.
            </p>
            <div className="flex gap-4">
              <a 
                href="mailto:info@marcusbooks.click" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
                title="Send us an email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><button type="button" onClick={() => handleScrollTo('coloring')} className="hover:text-pink-500 transition-colors cursor-pointer border-none bg-transparent text-slate-300 p-0">Coloring Books</button></li>
              <li><button type="button" onClick={() => handleScrollTo('wordsearch')} className="hover:text-pink-500 transition-colors cursor-pointer border-none bg-transparent text-slate-300 p-0">Word Search</button></li>
              <li><button type="button" onClick={() => handleScrollTo('finder')} className="hover:text-pink-500 transition-colors cursor-pointer border-none bg-transparent text-slate-300 p-0">AI Finder</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><button type="button" className="hover:text-pink-500 transition-colors cursor-pointer border-none bg-transparent text-slate-300 p-0">Contact Us</button></li>
              <li className="pt-2 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => onNavigate('admin')} 
                  className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition-colors cursor-pointer text-sm font-medium border-none bg-transparent p-0"
                >
                  <Lock size={14} /> Admin Area
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
          <p>© 2024 MarcusBooks. All rights reserved.</p>
          <div className="flex gap-6">
            <button type="button" className="hover:underline cursor-pointer border-none bg-transparent text-slate-500 p-0">Privacy Policy</button>
            <button type="button" className="hover:underline cursor-pointer border-none bg-transparent text-slate-500 p-0">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;