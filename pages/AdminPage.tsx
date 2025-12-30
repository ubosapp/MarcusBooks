import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search, Lock, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { Book, BookCategory } from '../types';
import { View } from '../App';

interface AdminPageProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  onNavigate: (view: View, params?: string | null) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ books, setBooks, onNavigate }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'matteo12melissa26') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    if (editingBook.id) {
      setBooks(prev => prev.map(b => b.id === editingBook.id ? (editingBook as Book) : b));
    } else {
      const newBook = {
        ...editingBook,
        id: Date.now().toString(),
      } as Book;
      setBooks(prev => [...prev, newBook]);
    }
    setEditingBook(null);
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-pink-50 w-full max-w-md text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-pink-500">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-kids font-bold text-slate-800 mb-2">Admin Area</h1>
          <p className="text-slate-500 mb-8">Enter the password to manage MarcusBooks</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Password"
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-pink-500 outline-none transition-all text-center font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg shadow-pink-100 cursor-pointer border-none"
            >
              Login
            </button>
          </form>
          <button 
            type="button"
            onClick={() => onNavigate('home')} 
            className="inline-block mt-6 text-slate-400 hover:text-pink-500 text-sm font-bold cursor-pointer border-none bg-transparent"
          >
            Back to site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-2xl text-green-600">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-kids font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm italic">Book catalog management</p>
          </div>
        </div>
        
        <button 
          onClick={() => setEditingBook({ category: BookCategory.COLORING, price: '$', pages: 0 })}
          className="flex items-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-xl shadow-pink-100 cursor-pointer border-none"
        >
          <Plus size={20} /> Add Book
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-8 flex items-center gap-4">
        <Search className="text-slate-400" size={24} />
        <input 
          type="text" 
          placeholder="Search by title or category..." 
          className="w-full outline-none text-slate-700 bg-transparent border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Book</th>
                <th className="px-6 py-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={book.coverImageUrl} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="" />
                      <div>
                        <div className="font-bold text-slate-800">{book.title}</div>
                        <div className="text-xs text-slate-400 line-clamp-1">{book.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{book.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-pink-500">{book.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingBook(book)}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer border-none bg-transparent"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingBook && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 md:p-12 relative">
            <button 
              onClick={() => setEditingBook(null)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-kids font-bold text-slate-800 mb-8">
              {editingBook.id ? 'Edit Book' : 'Add New Book'}
            </h2>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-600 mb-2">Title</label>
                <input 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.title || ''}
                  onChange={e => setEditingBook({...editingBook, title: e.target.value})}
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-600 mb-2">Subtitle</label>
                <input 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.subtitle || ''}
                  onChange={e => setEditingBook({...editingBook, subtitle: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Category</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.category}
                  onChange={e => setEditingBook({...editingBook, category: e.target.value as BookCategory})}
                >
                  {Object.values(BookCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Price (e.g. $9.99)</label>
                <input 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.price || ''}
                  onChange={e => setEditingBook({...editingBook, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Age Range</label>
                <input 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.ageRange || ''}
                  onChange={e => setEditingBook({...editingBook, ageRange: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Pages</label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.pages || ''}
                  onChange={e => setEditingBook({...editingBook, pages: parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-600 mb-2">Cover Image URL</label>
                <div className="flex gap-2">
                  <div className="bg-slate-100 p-3 rounded-xl flex items-center justify-center text-slate-400">
                    <ImageIcon size={20} />
                  </div>
                  <input 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-pink-500"
                    value={editingBook.coverImageUrl || ''}
                    placeholder="https://images..."
                    onChange={e => setEditingBook({...editingBook, coverImageUrl: e.target.value})}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-600 mb-2">Amazon URL</label>
                <input 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.amazonUrl || ''}
                  placeholder="https://amazon.com/..."
                  onChange={e => setEditingBook({...editingBook, amazonUrl: e.target.value})}
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-bold text-slate-600 mb-2">Solutions URL (optional)</label>
                <input 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-pink-500"
                  value={editingBook.solutionsUrl || ''}
                  placeholder="solutions/book-title"
                  onChange={e => setEditingBook({...editingBook, solutionsUrl: e.target.value})}
                />
              </div>

              <div className="col-span-full mt-6 flex gap-4">
                <button 
                  type="submit"
                  className="flex-grow bg-green-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all cursor-pointer border-none"
                >
                  <Save size={20} /> Save Book
                </button>
                <button 
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-8 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all cursor-pointer border-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;