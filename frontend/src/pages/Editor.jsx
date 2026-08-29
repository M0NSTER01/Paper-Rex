import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ExternalLink, Settings, Briefcase, GraduationCap, User, Trophy, LayoutTemplate } from 'lucide-react';

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
  const [theme, setTheme] = useState('Developer');
  const [completeness] = useState(85);
  const navigate = useNavigate();

  const handlePublish = () => {
    // In a real app, save to DB then navigate to portfolio
    navigate('/portfolio/jane-doe');
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--color-surface)] overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 flex-shrink-0 border-b border-[var(--color-surface-dim)] bg-white px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="font-bold font-geist text-xl">Editor</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Completeness</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completeness}%` }}></div>
            </div>
            <span className="text-sm font-semibold">{completeness}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-gray-200 rounded-md p-1">
            <LayoutTemplate className="w-4 h-4 text-gray-500 ml-1" />
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="text-sm border-none bg-transparent focus:ring-0 outline-none pr-2"
            >
              <option value="Developer">Developer</option>
              <option value="Corporate">Corporate</option>
              <option value="Creative">Creative</option>
            </select>
          </div>
          <button 
            onClick={handlePublish}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[var(--color-secondary)] transition"
          >
            <ExternalLink className="w-4 h-4" /> Publish
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Form */}
        <div className="w-1/2 flex flex-col border-r border-[var(--color-surface-dim)] bg-white overflow-y-auto">
          <div className="p-6 space-y-8">
            
            {/* Intro Section */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-semibold font-geist">
                <User className="w-5 h-5" /> <h3>Professional Intro</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                  <input type="text" value={data.intro.name} onChange={(e) => setData({...data, intro: {...data.intro, name: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title</label>
                  <input type="text" value={data.intro.title} onChange={(e) => setData({...data, intro: {...data.intro, title: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Summary</label>
                  <textarea rows="3" value={data.intro.summary} onChange={(e) => setData({...data, intro: {...data.intro, summary: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)] font-semibold font-geist">
                <Briefcase className="w-5 h-5" /> <h3>Experience</h3>
              </div>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="border border-gray-200 rounded-md p-4 relative group">
                    <input type="text" value={exp.role} className="font-semibold text-sm w-full outline-none mb-1" readOnly/>
                    <div className="flex gap-2 text-xs text-gray-500 mb-2">
                      <input type="text" value={exp.company} className="outline-none" readOnly/> • 
                      <input type="text" value={exp.years} className="outline-none" readOnly/>
                    </div>
                    <textarea rows="2" value={exp.desc} className="w-full text-sm outline-none text-gray-600 resize-none" readOnly></textarea>
                  </div>
                ))}
                <button className="text-sm font-semibold text-[var(--color-primary)]">+ Add Experience</button>
              </div>
            </section>

          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="w-1/2 bg-gray-100 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white min-h-[800px] shadow-xl rounded-sm p-12 transition-all duration-300">
            {/* Preview content based on theme */}
            <div className={`${theme === 'Creative' ? 'text-center' : 'text-left'}`}>
              <h1 className={`font-bold mb-1 ${theme === 'Corporate' ? 'text-4xl text-blue-900' : 'text-5xl text-gray-900 font-geist'}`}>
                {data.intro.name}
              </h1>
              <p className="text-xl text-gray-500 mb-6">{data.intro.title}</p>
              <p className="text-gray-700 leading-relaxed mb-8">{data.intro.summary}</p>

              <hr className="mb-8" />

              <h3 className="text-xl font-bold mb-4 font-geist text-gray-900">Experience</h3>
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <h4 className="font-semibold text-lg">{exp.role}</h4>
                    <p className="text-gray-500 text-sm mb-2">{exp.company} | {exp.years}</p>
                    <p className="text-gray-700">{exp.desc}</p>
                  </div>
                ))}
              </div>
              
              <hr className="my-8" />

              <h3 className="text-xl font-bold mb-4 font-geist text-gray-900">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
