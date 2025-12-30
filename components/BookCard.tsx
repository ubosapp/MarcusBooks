import React from 'react';
import { ExternalLink, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { Book } from '../types';
import { View } from '../App';

interface BookCardProps {
  book: Book;
  onNavigate: (view: View, params?: string | null) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onNavigate }) => {
  const handleGoToSolutions = () => {
    // Get the solution ID from URL or fallback to book id
    const solId = book.solutionsUrl ? book.solutionsUrl.split('/').pop() : book.id;
    onNavigate('solutions', solId);
  };

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-pink-50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={book.coverImageUrl} 
          alt={`${book.title} - ${book.category} for kids`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-sm text-pink-600 shadow-sm">
          {book.price}
        </div>
        {(book.solutionsUrl || book.category === 'Word Search') && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md flex items-center gap-1">
              <CheckCircle size={10} /> Solutions Included
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
          <BookOpen size={14} /> {book.category}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-pink-500 transition-colors">{book.title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{book.subtitle}</p>
        
        <div className="flex items-center justify-between mb-6 mt-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Clock size={14} className="text-orange-400" /> {book.ageRange}
          </div>
          <div className="text-xs font-semibold text-slate-500">
            {book.pages} pages
          </div>
        </div>

        <div className={`grid ${(book.solutionsUrl || book.category === 'Word Search') ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
          <a 
            href={book.amazonUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-pink-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-pink-600 transition-colors shadow-sm"
          >
            Buy Now <ExternalLink size={14} />
          </a>
          {(book.solutionsUrl || book.category === 'Word Search') && (
            <button 
              type="button"
              onClick={handleGoToSolutions}
              className="flex items-center justify-center bg-slate-100 text-slate-700 py-3 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer border-none"
            >
              Solutions
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookCard;