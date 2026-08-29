import { useState } from 'react';
import { Download, MessageCircle, UserPlus, Eye } from 'lucide-react';

const MOCK_DATA = {
  name: 'Jane Doe',
  title: 'Senior Frontend Engineer',
  summary: 'Passionate frontend engineer with 5+ years of experience building scalable web applications using React and Tailwind CSS.',
  experience: [
    { id: 1, role: 'Senior Frontend Engineer', company: 'TechCorp', years: '2021 - Present', desc: 'Led the migration to Next.js. Improved performance by 40%.' },
    { id: 2, role: 'Web Developer', company: 'WebSolutions', years: '2018 - 2021', desc: 'Developed responsive client websites. Collaborated closely with design team.' },
  ],
  education: [
    { id: 1, degree: 'B.S. Computer Science', school: 'State University', years: '2014 - 2018' }
  ],
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Jest', 'Webpack']
};

export default function Portfolio() {
  const [lens, setLens] = useState('Standard');
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-inter pb-20 relative">
      {/* Recruiter Lens Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
          <Eye className="w-5 h-5 text-[var(--color-primary)]" />
          Recruiter Lens:
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {['Standard', 'HR View', 'Eng Manager View', '30-Sec TL;DR'].map(view => (
            <button 
              key={view}
              onClick={() => setLens(view)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${lens === view ? 'bg-white shadow-sm text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {view}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] transition">
            <UserPlus className="w-4 h-4" /> Save Contact
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 sm:p-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-geist mb-2 tracking-tight">{MOCK_DATA.name}</h1>
          <h2 className="text-xl sm:text-2xl text-[var(--color-primary)] font-medium mb-6">{MOCK_DATA.title}</h2>
          
          <p className={`text-gray-600 leading-relaxed text-lg mb-10 ${lens === '30-Sec TL;DR' ? 'font-bold text-gray-900' : ''}`}>
            {lens === 'HR View' ? "Dedicated team player with excellent communication skills. " + MOCK_DATA.summary : MOCK_DATA.summary}
          </p>

          {lens !== '30-Sec TL;DR' && (
            <>
              <div className="grid md:grid-cols-[1fr_250px] gap-12">
                
                {/* Left Column */}
                <div>
                  <h3 className="text-2xl font-bold font-geist mb-6 border-b border-gray-100 pb-2">Experience</h3>
                  <div className="space-y-8">
                    {MOCK_DATA.experience.map(exp => (
                      <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[var(--color-primary)] before:rounded-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                          <h4 className="text-lg font-bold">{exp.role}</h4>
                          <span className="text-sm font-semibold text-[var(--color-secondary)]">{exp.years}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-2">{exp.company}</p>
                        <p className={`text-gray-700 leading-relaxed ${lens === 'Eng Manager View' ? 'font-mono text-sm' : ''}`}>
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold font-geist mt-12 mb-6 border-b border-gray-100 pb-2">Education</h3>
                  <div className="space-y-6">
                    {MOCK_DATA.education.map(edu => (
                      <div key={edu.id}>
                        <h4 className="text-lg font-bold">{edu.degree}</h4>
                        <p className="text-sm font-medium text-gray-500">{edu.school} • {edu.years}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-2xl font-bold font-geist mb-6 border-b border-gray-100 pb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_DATA.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md border border-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}

          {lens === '30-Sec TL;DR' && (
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-lg font-bold mb-2">The Bottom Line</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                <li>5+ years specialized in Frontend Engineering (React).</li>
                <li>Proven track record of migrating legacy systems (Next.js) resulting in 40% perf bumps.</li>
                <li>Ready for a Senior IC role immediately.</li>
              </ul>
            </div>
          )}

        </div>
      </main>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {chatOpen && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-80 h-96 mb-4 flex flex-col overflow-hidden">
            <div className="bg-[var(--color-primary)] text-white p-4 font-semibold font-geist flex justify-between items-center">
              <span>Ask My Portfolio</span>
              <button onClick={() => setChatOpen(false)} className="text-white hover:text-gray-200">&times;</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 text-sm">
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm inline-block border border-gray-100 text-gray-700">
                Hi! I'm an AI trained on Jane's resume. Ask me anything about her experience or skills!
              </div>
            </div>
            <div className="p-3 bg-white border-t border-gray-100">
              <input type="text" placeholder="e.g. Does she know TypeScript?" className="w-full bg-gray-100 border-transparent rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
            </div>
          </div>
        )}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[var(--color-primary)] text-white p-4 rounded-full shadow-xl hover:bg-[var(--color-secondary)] transition hover:-translate-y-1"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
