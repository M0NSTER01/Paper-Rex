import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft } from 'lucide-react';

import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import DataDrivenTemplate from '../components/templates/DataDrivenTemplate';
import CleanAcademicTemplate from '../components/templates/CleanAcademicTemplate';
import MidnightDeveloperTemplate from '../components/templates/MidnightDeveloperTemplate';
import NeonCreativeTemplate from '../components/templates/NeonCreativeTemplate';

const MOCK_DATA = {
  intro: {
    name: 'Jane Doe',
    title: 'Senior Frontend Engineer',
    summary: 'Passionate frontend engineer with 5+ years of experience building scalable web applications using React and Tailwind CSS.',
  },
  experience: [
    { id: 1, role: 'Senior Frontend Engineer', company: 'TechCorp', years: '2021 - Present', desc: 'Led the migration to Next.js.' },
    { id: 2, role: 'Web Developer', company: 'WebSolutions', years: '2018 - 2021', desc: 'Developed responsive client websites.' },
  ],
  education: [
    { id: 1, degree: 'B.S. Computer Science', school: 'State University', years: '2014 - 2018' }
  ],
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js']
};

export default function Portfolio() {
  const { id } = useParams();
  const [theme, setTheme] = useState('Minimalist');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id && id !== 'demo') {
      fetchPortfolio(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchPortfolio = async (portfolioId) => {
    try {
      // It is now a public route
      const res = await axios.get(`http://localhost:5000/api/portfolios/${portfolioId}`);
      if (res.data.theme) {
        setTheme(res.data.theme);
      }
    } catch (err) {
      console.error(err);
      setError('Portfolio not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--color-surface)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[var(--color-surface)] text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - {error}</h1>
        <p className="text-gray-500 mb-8">The portfolio you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition">
          Return Home
        </Link>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (theme) {
      case 'Modern': return <ModernTemplate data={MOCK_DATA} />;
      case 'Data Driven': return <DataDrivenTemplate data={MOCK_DATA} />;
      case 'Clean Academic': return <CleanAcademicTemplate data={MOCK_DATA} />;
      case 'Midnight Developer': return <MidnightDeveloperTemplate data={MOCK_DATA} />;
      case 'Neon Creative': return <NeonCreativeTemplate data={MOCK_DATA} />;
      case 'Minimalist':
      default: return <MinimalistTemplate data={MOCK_DATA} />;
    }
  };

  return (
    <div className="h-screen w-full relative">
      {/* Optional Return to Editor button - only visible if we have a token (user is likely the owner) */}
      {localStorage.getItem('token') && (
        <Link 
          to={`/editor?id=${id}`}
          className="fixed top-4 left-4 z-[9999] bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50 transition text-sm font-semibold opacity-50 hover:opacity-100"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Editor
        </Link>
      )}
      
      {/* Full Screen Template Render */}
      {renderTemplate()}
    </div>
  );
}
