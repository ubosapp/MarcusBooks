
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-bold text-sm mb-6 animate-bounce">
            <Sparkles size={16} />
            <span>Discover the Magic of Color</span>
          </div>
          <h1 id="hero-title" className="text-5xl sm:text-7xl font-bold font-kids text-slate-900 leading-tight mb-6">
            Books that Ignite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500">
              Children's Imagination
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            From coloring adventures to brain-teasing word search challenges. 
            MarcusBooks offers a world of creativity and learning for every age group.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('coloring')}
              className="w-full sm:w-auto px-8 py-4 bg-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-pink-200 hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Explore Books <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('finder')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors"
            >
              AI Book Finder
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-50 -z-10"></div>
    </section>
  );
};

export default Hero;
