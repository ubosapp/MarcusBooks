import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import AdminPage from './pages/AdminPage';
import { BOOKS_DATA } from './constants';
import { Book } from './types';

export type View = 'home' | 'admin' | 'solutions';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [viewParams, setViewParams] = useState<string | null>(null);

  // Load books from localStorage or use default data
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('marcusbooks_db');
    return saved ? JSON.parse(saved) : BOOKS_DATA;
  });

  // Save books whenever they change
  useEffect(() => {
    localStorage.setItem('marcusbooks_db', JSON.stringify(books));
  }, [books]);

  const navigateTo = (view: View, params: string | null = null) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={navigateTo} />
      <main className="flex-grow animate-page-fade" key={currentView + (viewParams || '')}>
        {currentView === 'home' && (
          <HomePage books={books} onNavigate={navigateTo} />
        )}
        {currentView === 'admin' && (
          <AdminPage books={books} setBooks={setBooks} onNavigate={navigateTo} />
        )}
        {currentView === 'solutions' && (
          <SolutionsPage books={books} bookId={viewParams || ''} onNavigate={navigateTo} />
        )}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;