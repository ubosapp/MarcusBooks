import React, { useEffect } from 'react';
import { ArrowLeft, Download, CheckCircle2 } from 'lucide-react';
import { Book } from '../types';
import { View } from '../App';

interface SolutionsPageProps {
  books: Book[];
  bookId: string;
  onNavigate: (view: View, params?: string | null) => void;
}

const SolutionsPage: React.FC<SolutionsPageProps> = ({ books, bookId, onNavigate }) => {
  const book = books.find(b => 
    b.id === bookId || 
    b.solutionsUrl?.endsWith(bookId || '')
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-400">Book not found or no solutions available.</h2>
        <button 
          onClick={() => onNavigate('home')} 
          className="text-pink-500 font-bold mt-4 inline-block cursor-pointer border-none bg-transparent"
        >
          Back home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <button 
        onClick={() => onNavigate('home')} 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-pink-500 font-bold mb-8 transition-colors cursor-pointer border-none bg-transparent"
      >
        <ArrowLeft size={20} /> Back to Books
      </button>
      
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-pink-50">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3">
            <img 
              src={book.coverImageUrl} 
              alt={`${book.title} solutions guide`} 
              className="w-full rounded-2xl shadow-lg border-4 border-white"
            />
          </div>
          <div className="w-full md:w-2/3">
            <div className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-bold inline-block mb-4">
              RESERVED SOLUTIONS AREA
            </div>
            <h1 className="text-4xl font-kids font-bold text-slate-900 mb-4">
              Solutions: <br />
              <span className="text-pink-500">{book.title}</span>
            </h1>
            <p className="text-slate-600 text-lg mb-8">
              Great job! If you're here, it means you've finished the puzzles or want to check your progress.
              Below you'll find all the completed grids to help you out.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Puzzle Pages 1-20</h5>
                    <p className="text-xs text-slate-400">PDF • 2.4 MB</p>
                  </div>
                </div>
                <button type="button" className="text-pink-500 border-none bg-transparent cursor-pointer" aria-label="Download PDF"><Download size={24} /></button>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">Full Answer Key</h5>
                    <p className="text-xs text-slate-400">PDF • 10.5 MB</p>
                  </div>
                </div>
                <button type="button" className="text-pink-500 border-none bg-transparent cursor-pointer" aria-label="Download PDF"><Download size={24} /></button>
              </div>
            </div>

            <div className="mt-12 p-6 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-200">
              <h4 className="font-bold text-pink-700 mb-2">Still have questions?</h4>
              <p className="text-pink-600/80 text-sm">
                If you can't find a specific solution or find an error in the book, contact us at marcusbooks@support.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;