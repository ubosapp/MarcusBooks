
import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { BrainCircuit, Loader2, Sparkles, BookOpen } from 'lucide-react';

const AiBookFinder: React.FC = () => {
  const [age, setAge] = useState<string>('5');
  const [interests, setInterests] = useState<string>('');
  const [recommendation, setRecommendation] = useState<{ title: string; reason: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendation = async () => {
    if (!interests.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // Always initialize with process.env.API_KEY directly in the constructor
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Recommend a type of MarcusBooks book (coloring, word search, or activity) for a child of ${age} years old who likes: ${interests}. Keep the tone friendly and encouraging.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'The recommended book type or title.',
              },
              reason: {
                type: Type.STRING,
                description: 'Why this book is a good fit for the child.',
              }
            },
            required: ['title', 'reason'],
            propertyOrdering: ['title', 'reason']
          }
        }
      });
      
      const text = response.text;
      if (text) {
        const data = JSON.parse(text.trim());
        setRecommendation(data);
      }
    } catch (err) {
      console.error("AI Error:", err);
      setError("Failed to get recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="finder" className="py-20 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 blur-[100px] -z-0"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-3xl shadow-2xl">
            <BrainCircuit size={48} className="text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold font-kids mb-4">Help Me Choose with AI!</h2>
        <p className="text-slate-400 text-lg mb-10">Don't know which book to get? Ask our magic assistant.</p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] text-left max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase">Child's Age</label>
            <input 
              type="range" min="3" max="12" step="1" 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
              className="w-full accent-pink-500"
            />
            <div className="text-center mt-2 font-kids text-xl text-pink-400">{age} years old</div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase">Interests (e.g., dinosaurs, space, puppies...)</label>
            <input 
              type="text"
              placeholder="What does your child love?"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none text-white"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>

          <button 
            onClick={getRecommendation}
            disabled={loading || !interests}
            className="w-full bg-pink-500 py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            Get Magic Recommendation
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          {recommendation && (
            <div className="mt-8 p-6 bg-white rounded-2xl text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-pink-600 font-bold mb-2">
                <BookOpen size={20} />
                We recommend:
              </div>
              <h4 className="text-2xl font-kids font-bold mb-2">{recommendation.title}</h4>
              <p className="text-slate-600 italic">"{recommendation.reason}"</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AiBookFinder;
