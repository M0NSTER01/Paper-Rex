import React, { useState } from 'react';
import axios from 'axios';
import { Target, Loader2, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import CourseRecommendations from './CourseRecommendations';
import { useSearchParams } from 'react-router-dom';

export default function SkillGapAnalysis({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get('id');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Use standard relative path if you have a proxy or the base URL directly if available.
      // Based on Editor.jsx it uses http://localhost:5000 as base URL
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/analyze-skill-gaps`, 
        { data, jobDescription }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
    } catch (err) {
      console.error('Skill gap analysis failed:', err);
      setError('Couldn\'t analyze this resume, try again.');
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
    <div className="mt-6 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold font-geist text-lg">
          <Target className="w-5 h-5" /> <h3>Skill Gap Analysis</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">
            Analyze your resume against a target job description, or let AI infer your role and check market standards.
          </p>
          
          <textarea
            placeholder="Paste Target Job Description (Optional)..."
            rows="3"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:border-[var(--color-primary)] outline-none mb-3"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-2 bg-[var(--color-primary)] text-white rounded-md text-sm font-semibold hover:bg-[var(--color-secondary)] transition disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
            {loading ? 'Analyzing...' : 'Analyze Skill Gaps'}
          </button>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 flex items-start gap-2 mb-4">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6">
              {result.inferred_role && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-800 text-sm font-medium rounded-full border border-blue-100">
                  <Target className="w-4 h-4" />
                  Inferred Role: {result.inferred_role}
                </div>
              )}

              {/* Strengths */}
              {result.strengths && result.strengths.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Your Strengths
                  </h4>
                  <ul className="space-y-1.5">
                    {result.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-gray-600 pl-6 relative before:content-[''] before:absolute before:left-2 before:top-2 before:w-1.5 before:h-1.5 before:bg-green-400 before:rounded-full">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gaps */}
              {result.gaps && result.gaps.length > 0 ? (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" /> Missing Skills & Gaps
                  </h4>
                  <div className="space-y-3">
                    {result.gaps.map((gap, idx) => (
                      <div key={idx} className="p-3 border border-gray-200 rounded-md bg-gray-50/50">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-semibold text-sm text-gray-800">{gap.skill}</span>
                          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getImportanceColor(gap.importance)}`}>
                            {gap.importance ? gap.importance.charAt(0).toUpperCase() + gap.importance.slice(1) : 'Unknown'} Priority
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1.5"><strong>Why it's needed:</strong> {gap.reason}</p>
                        <p className="text-xs text-[var(--color-primary)] font-medium"><strong>How to address:</strong> {gap.how_to_address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm text-center">
                  No major skill gaps identified! Your resume looks well-aligned.
                </div>
              )}
              
              {/* Course Recommendations */}
              {result.gaps && result.gaps.length > 0 && (
                <CourseRecommendations gaps={result.gaps} portfolioId={portfolioId} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
