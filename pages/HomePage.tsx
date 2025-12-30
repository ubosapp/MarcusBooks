import React from 'react';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import AiBookFinder from '../components/AiBookFinder';
import { CATEGORIES } from '../constants';
import { Book, BookCategory } from '../types';
import { Palette, Search } from 'lucide-react';
import { View } from '../App';

interface HomePageProps {
  books: Book[];
  onNavigate: (view: View, params?: string | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ books, onNavigate }) => {
  const coloringBooks = books.filter(b => b.category === BookCategory.COLORING);
  const wordSearchBooks = books.filter(b => b.category === BookCategory.WORD_SEARCH);

  return (
    <div className="pb-20">
      <Hero />

      {/* Categories Visual List */}
      <section className="max-w-7xl mx-auto px-4 py-12" aria-label="Book Categories">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.title} className={`${cat.color} p-8 rounded-[2.5rem] text-white flex flex-col items-start gap-4 shadow-xl hover:scale-[1.02] transition-transform cursor-pointer`}>
              <div className="text-5xl" aria-hidden="true">{cat.icon}</div>
              <div>
                <h3 className="text-3xl font-kids font-bold mb-1">{cat.title}</h3>
                <p className="opacity-90">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coloring Books Section */}
      <section id="coloring" className="max-w-7xl mx-auto px-4 py-24" aria-labelledby="coloring-heading">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 id="coloring-heading" className="text-4xl font-kids font-bold text-slate-900 mb-2 flex items-center gap-3">
              <Palette className="text-orange-400" size={36} /> Coloring Books
            </h2>
            <p className="text-slate-500">Spark creativity with designs tailored for small hands and big minds.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coloringBooks.length > 0 ? (
            coloringBooks.map(book => <BookCard key={book.id} book={book} onNavigate={onNavigate} />)
          ) : (
            <p className="col-span-full text-center text-slate-400 py-10">No coloring books available yet.</p>
          )}
        </div>
      </section>

      {/* Word Search Section */}
      <section id="wordsearch" className="bg-white/50 py-24" aria-labelledby="wordsearch-heading">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 id="wordsearch-heading" className="text-4xl font-kids font-bold text-slate-900 mb-2 flex items-center gap-3">
                <Search className="text-purple-500" size={36} /> Word Search & Puzzles
              </h2>
              <p className="text-slate-500">Train your brain and discover new words in a fun way.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wordSearchBooks.length > 0 ? (
              wordSearchBooks.map(book => <BookCard key={book.id} book={book} onNavigate={onNavigate} />)
            ) : (
              <p className="col-span-full text-center text-slate-400 py-10">No word search books available yet.</p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <AiBookFinder />
      </div>

      <section className="bg-pink-500 py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-xl font-bold font-kids mb-2">Amazon Delivery</h4>
            <p className="opacity-80">Rely on Amazon logistics for fast and secure shipping worldwide.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">💎</div>
            <h4 className="text-xl font-bold font-kids mb-2">High Quality</h4>
            <p className="opacity-80">Premium paper and original illustrations created especially for children.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🎁</div>
            <h4 className="text-xl font-bold font-kids mb-2">Perfect Gift</h4>
            <p className="opacity-80">Ideal for birthdays, holidays, or screen-free relaxation moments.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;