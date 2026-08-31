import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, ExternalLink, Loader2, AlertCircle, Search } from 'lucide-react';

export default function CourseRecommendations({ gaps, portfolioId }) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState('');

  if (!gaps || gaps.length === 0) return null;

  const handleFetchCourses = async () => {
    if (!portfolioId) {
      setError("Please save your resume first before finding courses.");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      // Using localhost to avoid DevTunnels CORS issues
      const API_BASE = 'http://localhost:5000';
      
      const res = await axios.post(`${API_BASE}/api/recommend-courses`, 
        { gaps, portfolio_id: portfolioId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error('Course recommendation failed:', err);
      setError("Couldn't find courses right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getImportanceColor = (importance) => {
    switch(importance?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold font-geist text-lg mb-3">
        <BookOpen className="w-5 h-5" /> <h3>Recommended Courses</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Ready to address your skill gaps? We can search the web for the top-rated courses to help you level up your career.
      </p>

      {!recommendations && !loading && (
        <button
          onClick={handleFetchCourses}
          className="w-full py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-sm font-semibold hover:bg-indigo-100 transition flex items-center justify-center gap-2 mb-4"
        >
          <Search className="w-4 h-4" /> Find courses for these gaps
        </button>
      )}

      {loading && (
        <div className="w-full py-8 flex flex-col items-center justify-center bg-gray-50 rounded-md border border-gray-200 mb-4">
          <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin mb-3" />
          <p className="text-sm font-semibold text-gray-600 animate-pulse">Finding the best verified courses...</p>
          <p className="text-xs text-gray-400 mt-1">This takes a few seconds as we search and synthesize the web.</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 flex items-start gap-2 mb-4">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {recommendations && (
        <div className="space-y-6">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800 text-sm">{rec.skill}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-medium uppercase tracking-wider ${getImportanceColor(rec.importance)}`}>
                  {rec.importance} Priority
                </span>
              </div>
              
              {(!rec.courses || rec.courses.length === 0) ? (
                <div className="p-3 bg-gray-50 text-gray-500 border border-gray-200 rounded-md text-xs italic">
                  No verified courses found for this skill at the moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {rec.courses.map((course, cIdx) => (
                    <a 
                      key={cIdx} 
                      href={course.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 border border-gray-200 rounded-md bg-white hover:border-[var(--color-primary)] hover:shadow-sm transition group"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-semibold text-sm text-[var(--color-primary)] group-hover:underline">
                          {course.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] shrink-0 ml-2" />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {course.why_relevant}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
