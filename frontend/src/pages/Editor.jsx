import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Save, ExternalLink, Settings, Briefcase, GraduationCap, User, Trophy, LayoutTemplate, Loader2, Monitor, Tablet, Smartphone } from 'lucide-react';
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

export default function Editor() {
  const [data, setData] = useState(MOCK_DATA);
  const [theme, setTheme] = useState('Minimalist');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [completeness] = useState(85);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get('id');

  useEffect(() => {
    if (portfolioId) {
      fetchPortfolio(portfolioId);
    } else {
      setLoading(false);
    }
  }, [portfolioId]);

  const fetchPortfolio = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/portfolios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.theme) {
        setTheme(res.data.theme);
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = async (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    if (portfolioId) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/portfolios/${portfolioId}`, 
          { theme: newTheme },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to update theme", err);
      }
    }
  };

  const handlePublish = () => {
    navigate(`/portfolio/${portfolioId || 'demo'}`);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-[var(--color-surface)]"><Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" /></div>;
  }

  const renderTemplate = () => {
    switch (theme) {
      case 'Modern': return <ModernTemplate data={data} />;
      case 'Data Driven': return <DataDrivenTemplate data={data} />;
      case 'Clean Academic': return <CleanAcademicTemplate data={data} />;
      case 'Midnight Developer': return <MidnightDeveloperTemplate data={data} />;
      case 'Neon Creative': return <NeonCreativeTemplate data={data} />;
      case 'Minimalist':
      default: return <MinimalistTemplate data={data} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--color-surface)] overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 flex-shrink-0 border-b border-[var(--color-surface-dim)] bg-white px-6 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="font-bold font-geist text-xl text-[var(--color-primary)]">Editor</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Completeness</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completeness}%` }}></div>
            </div>
            <span className="text-sm font-semibold">{completeness}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 shadow-inner">
            <button 
              onClick={() => setPreviewMode('desktop')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`}
              title="Desktop Preview"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPreviewMode('tablet')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'tablet' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`}
              title="Tablet Preview"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPreviewMode('phone')}
              className={`p-1.5 rounded-md transition-all ${previewMode === 'phone' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`}
              title="Mobile Preview"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-md p-1 bg-gray-50">
            <LayoutTemplate className="w-4 h-4 text-gray-500 ml-1" />
            <select 
              value={theme} 
              onChange={handleThemeChange}
              className="text-sm border-none bg-transparent focus:ring-0 outline-none pr-2 font-semibold text-gray-700 cursor-pointer"
            >
              <option value="Minimalist">Minimalist</option>
              <option value="Modern">Modern</option>
              <option value="Data Driven">Data Driven</option>
              <option value="Clean Academic">Clean Academic</option>
              <option value="Midnight Developer">Midnight Developer</option>
              <option value="Neon Creative">Neon Creative</option>
            </select>
          </div>
          <button 
            onClick={handlePublish}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[var(--color-secondary)] transition shadow-sm"
          >
            <ExternalLink className="w-4 h-4" /> View Live
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Form */}
        <div className="w-[400px] flex-shrink-0 flex flex-col border-r border-[var(--color-surface-dim)] bg-white overflow-y-auto z-20 shadow-sm relative">
          <div className="p-6 space-y-8 w-full">
            
            {/* Intro Section */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-semibold font-geist text-lg border-b border-gray-100 pb-2">
                <User className="w-5 h-5" /> <h3>Professional Intro</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                  <input type="text" value={data.intro.name} onChange={(e) => setData({...data, intro: {...data.intro, name: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title</label>
                  <input type="text" value={data.intro.title} onChange={(e) => setData({...data, intro: {...data.intro, title: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Summary</label>
                  <textarea rows="4" value={data.intro.summary} onChange={(e) => setData({...data, intro: {...data.intro, summary: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] outline-none transition-colors"></textarea>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-semibold font-geist text-lg border-b border-gray-100 pb-2">
                <Briefcase className="w-5 h-5" /> <h3>Experience</h3>
              </div>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="border border-gray-200 rounded-md p-4 relative group bg-gray-50/50">
                    <input type="text" value={exp.role} className="font-semibold text-sm w-full outline-none mb-1 bg-transparent" readOnly/>
                    <div className="flex gap-2 text-xs text-gray-500 mb-3">
                      <input type="text" value={exp.company} className="outline-none bg-transparent" readOnly/> • 
                      <input type="text" value={exp.years} className="outline-none bg-transparent" readOnly/>
                    </div>
                    <textarea rows="2" value={exp.desc} className="w-full text-sm outline-none text-gray-600 resize-none bg-transparent" readOnly></textarea>
                  </div>
                ))}
                <button className="text-sm font-semibold text-[var(--color-primary)] bg-indigo-50 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors w-full">+ Add Experience</button>
              </div>
            </section>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-gray-200/60 p-4 md:p-8 overflow-y-auto custom-scrollbar relative overflow-x-hidden border-l border-[var(--color-surface-dim)] flex flex-col items-center">
          <div 
            className={`mx-auto h-full relative shadow-2xl rounded-lg overflow-hidden border border-gray-300 bg-white transition-all duration-300 ease-in-out ${
              previewMode === 'phone' ? 'w-[375px]' : 
              previewMode === 'tablet' ? 'w-[768px]' : 
              'w-full max-w-[1280px]'
            }`}
          >
            {renderTemplate()}
          </div>
        </div>

      </div>
    </div>
  );
}
