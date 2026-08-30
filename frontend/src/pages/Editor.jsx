import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Save, ExternalLink, Settings, Briefcase, GraduationCap, User, Trophy, LayoutTemplate, Loader2, Monitor, Tablet, Smartphone, Code, Mail, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import DataDrivenTemplate from '../components/templates/DataDrivenTemplate';
import CleanAcademicTemplate from '../components/templates/CleanAcademicTemplate';
import MidnightDeveloperTemplate from '../components/templates/MidnightDeveloperTemplate';
import NeonCreativeTemplate from '../components/templates/NeonCreativeTemplate';

const DEFAULT_DATA = {
  intro: { name: '', title: '', summary: '' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  contact: { email: '', linkedin: '', github: '' },
  visible: {
    education: true,
    skills: true,
    experience: true,
    projects: true,
    certifications: true
  }
};

export default function Editor() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [theme, setTheme] = useState('Minimalist');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [completeness, setCompleteness] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
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

  useEffect(() => {
    // Calculate completeness
    let filled = 0;
    let total = 7;
    if (data.intro?.name) filled++;
    if (data.experience?.length) filled++;
    if (data.education?.length) filled++;
    if (data.skills?.length) filled++;
    if (data.projects?.length) filled++;
    if (data.certifications?.length) filled++;
    if (data.contact?.email) filled++;
    setCompleteness(Math.round((filled / total) * 100));
  }, [data]);

  const fetchPortfolio = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/portfolios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.theme) setTheme(res.data.theme);
      if (res.data.data) {
        // Merge with default to ensure visible object exists
        setData({ ...DEFAULT_DATA, ...res.data.data, visible: { ...DEFAULT_DATA.visible, ...(res.data.data.visible || {}) } });
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  
  const handlePhotoUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/upload-image', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setData(prev => ({
        ...prev,
        intro: { ...prev.intro, photoUrl: res.data.photoUrl }
      }));
    } catch (err) {
      console.error('Failed to upload photo', err);
      alert('Failed to upload profile photo');
    }
  };

  const handleSave = async () => {
    if (!portfolioId) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/portfolios/${portfolioId}`, 
        { theme, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to save", err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const toggleVisibility = (section) => {
    setData(prev => ({
      ...prev,
      visible: {
        ...prev.visible,
        [section]: !prev.visible[section]
      }
    }));
  };

  const handlePublish = () => {
    handleSave().then(() => {
      navigate(`/portfolio/${portfolioId || 'demo'}`);
    });
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

  const SectionHeader = ({ icon: Icon, title, sectionKey }) => (
    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
      <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold font-geist text-lg">
        <Icon className="w-5 h-5" /> <h3>{title}</h3>
      </div>
      {sectionKey && (
        <button 
          onClick={() => toggleVisibility(sectionKey)}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${data.visible[sectionKey] ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
        >
          {data.visible[sectionKey] ? <><Eye className="w-3 h-3"/> Visible</> : <><EyeOff className="w-3 h-3"/> Hidden</>}
        </button>
      )}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[var(--color-surface)] overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 flex-shrink-0 border-b border-[var(--color-surface-dim)] bg-white px-6 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="font-bold font-geist text-xl text-[var(--color-primary)]">Editor</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Completeness</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${completeness}%` }}></div>
            </div>
            <span className="text-sm font-semibold">{completeness}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 shadow-inner">
            <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`} title="Desktop Preview"><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setPreviewMode('tablet')} className={`p-1.5 rounded-md transition-all ${previewMode === 'tablet' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`} title="Tablet Preview"><Tablet className="w-4 h-4" /></button>
            <button onClick={() => setPreviewMode('phone')} className={`p-1.5 rounded-md transition-all ${previewMode === 'phone' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`} title="Mobile Preview"><Smartphone className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-md p-1 bg-gray-50">
            <LayoutTemplate className="w-4 h-4 text-gray-500 ml-1" />
            <select value={theme} onChange={handleThemeChange} className="text-sm border-none bg-transparent focus:ring-0 outline-none pr-2 font-semibold text-gray-700 cursor-pointer">
              <option value="Minimalist">Minimalist</option>
              <option value="Modern">Modern</option>
              <option value="Data Driven">Data Driven</option>
              <option value="Clean Academic">Clean Academic</option>
              <option value="Midnight Developer">Midnight Developer</option>
              <option value="Neon Creative">Neon Creative</option>
            </select>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-200 transition shadow-sm border border-gray-200">
            {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />} Save
          </button>
          <button onClick={handlePublish} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[var(--color-secondary)] transition shadow-sm">
            <ExternalLink className="w-4 h-4" /> Publish
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel - Form */}
        <div className="w-[450px] flex-shrink-0 flex flex-col border-r border-[var(--color-surface-dim)] bg-white overflow-y-auto z-20 shadow-sm relative">
          <div className="p-6 space-y-10 w-full pb-32">
            
            {/* Intro Section */}
            <section>
              <SectionHeader icon={User} title="Professional Intro" />
              <div className="space-y-4">

                <div className="flex items-center gap-4">
                  {data.intro?.photoUrl ? (
                    <div className="relative group w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                      <img src={data.intro.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                      <button onClick={() => setData({...data, intro: {...data.intro, photoUrl: ''}})} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <label className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-gray-400 transition">
                      <Plus className="w-6 h-6" />
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Profile Photo</label>
                    <p className="text-xs text-gray-400">Upload a professional headshot for your portfolio.</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                  <input type="text" value={data.intro?.name || ''} onChange={(e) => setData({...data, intro: {...data.intro, name: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title</label>
                  <input type="text" value={data.intro?.title || ''} onChange={(e) => setData({...data, intro: {...data.intro, title: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Summary</label>
                  <textarea rows="4" value={data.intro?.summary || ''} onChange={(e) => setData({...data, intro: {...data.intro, summary: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:border-[var(--color-primary)] outline-none"></textarea>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <SectionHeader icon={Briefcase} title="Experience" sectionKey="experience" />
              <div className="space-y-4">
                {(data.experience || []).map((exp, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md p-4 bg-gray-50 relative group">
                    <button onClick={() => {
                      const newExp = [...data.experience];
                      newExp.splice(idx, 1);
                      setData({...data, experience: newExp});
                    }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                    <input placeholder="Role" value={exp.role || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx].role = e.target.value; setData({...data, experience: arr}) }} className="font-semibold text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <input placeholder="Company" value={exp.company || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx].company = e.target.value; setData({...data, experience: arr}) }} className="text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <input placeholder="Years (e.g. 2020 - Present)" value={exp.years || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx].years = e.target.value; setData({...data, experience: arr}) }} className="text-xs text-gray-500 w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <textarea placeholder="Description" rows="2" value={exp.desc || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx].desc = e.target.value; setData({...data, experience: arr}) }} className="text-sm w-full outline-none bg-transparent resize-none border-b border-dashed border-gray-300 focus:border-[var(--color-primary)]"></textarea>
                  </div>
                ))}
                <button onClick={() => setData({...data, experience: [...(data.experience||[]), {id: Date.now(), role:'', company:'', years:'', desc:''}]})} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                  <Plus className="w-4 h-4"/> Add Experience
                </button>
              </div>
            </section>

            {/* Education Section */}
            <section>
              <SectionHeader icon={GraduationCap} title="Education" sectionKey="education" />
              <div className="space-y-4">
                {(data.education || []).map((edu, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md p-4 bg-gray-50 relative group">
                    <button onClick={() => {
                      const arr = [...data.education];
                      arr.splice(idx, 1);
                      setData({...data, education: arr});
                    }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                    <input placeholder="Degree" value={edu.degree || ''} onChange={(e) => { const arr = [...data.education]; arr[idx].degree = e.target.value; setData({...data, education: arr}) }} className="font-semibold text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <input placeholder="School/University" value={edu.school || ''} onChange={(e) => { const arr = [...data.education]; arr[idx].school = e.target.value; setData({...data, education: arr}) }} className="text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <input placeholder="Years" value={edu.years || ''} onChange={(e) => { const arr = [...data.education]; arr[idx].years = e.target.value; setData({...data, education: arr}) }} className="text-xs text-gray-500 w-full outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                  </div>
                ))}
                <button onClick={() => setData({...data, education: [...(data.education||[]), {id: Date.now(), degree:'', school:'', years:''}]})} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                  <Plus className="w-4 h-4"/> Add Education
                </button>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <SectionHeader icon={Code} title="Skills" sectionKey="skills" />
              <div className="space-y-4">
                <textarea 
                  placeholder="Comma separated skills (e.g. React, Node.js, Python)" 
                  rows="3" 
                  value={(data.skills || []).join(', ')} 
                  onChange={(e) => setData({...data, skills: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:border-[var(--color-primary)] outline-none"
                ></textarea>
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <SectionHeader icon={LayoutTemplate} title="Projects" sectionKey="projects" />
              <div className="space-y-4">
                {(data.projects || []).map((proj, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md p-4 bg-gray-50 relative group">
                    <button onClick={() => {
                      const arr = [...data.projects];
                      arr.splice(idx, 1);
                      setData({...data, projects: arr});
                    }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                    <input placeholder="Project Title" value={proj.title || ''} onChange={(e) => { const arr = [...data.projects]; arr[idx].title = e.target.value; setData({...data, projects: arr}) }} className="font-semibold text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <textarea placeholder="Description" rows="2" value={proj.desc || ''} onChange={(e) => { const arr = [...data.projects]; arr[idx].desc = e.target.value; setData({...data, projects: arr}) }} className="text-sm w-full outline-none mb-2 bg-transparent resize-none border-b border-dashed border-gray-300 focus:border-[var(--color-primary)]"></textarea>
                    <input placeholder="Technologies (comma separated)" value={(proj.tech || []).join(', ')} onChange={(e) => { const arr = [...data.projects]; arr[idx].tech = e.target.value.split(',').map(s=>s.trim()); setData({...data, projects: arr}) }} className="text-xs text-gray-500 w-full outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                  </div>
                ))}
                <button onClick={() => setData({...data, projects: [...(data.projects||[]), {id: Date.now(), title:'', desc:'', tech:[]}]})} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                  <Plus className="w-4 h-4"/> Add Project
                </button>
              </div>
            </section>

            {/* Certifications Section */}
            <section>
              <SectionHeader icon={Trophy} title="Certifications" sectionKey="certifications" />
              <div className="space-y-4">
                {(data.certifications || []).map((cert, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md p-4 bg-gray-50 relative group">
                    <button onClick={() => {
                      const arr = [...data.certifications];
                      arr.splice(idx, 1);
                      setData({...data, certifications: arr});
                    }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                    <input placeholder="Certification Title" value={cert.title || ''} onChange={(e) => { const arr = [...data.certifications]; arr[idx].title = e.target.value; setData({...data, certifications: arr}) }} className="font-semibold text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <input placeholder="Issuer" value={cert.issuer || ''} onChange={(e) => { const arr = [...data.certifications]; arr[idx].issuer = e.target.value; setData({...data, certifications: arr}) }} className="text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    <input placeholder="Year" value={cert.year || ''} onChange={(e) => { const arr = [...data.certifications]; arr[idx].year = e.target.value; setData({...data, certifications: arr}) }} className="text-xs text-gray-500 w-full outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                  </div>
                ))}
                <button onClick={() => setData({...data, certifications: [...(data.certifications||[]), {id: Date.now(), title:'', issuer:'', year:''}]})} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                  <Plus className="w-4 h-4"/> Add Certification
                </button>
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <SectionHeader icon={Mail} title="Contact Info" />
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                  <input type="email" value={data.contact?.email || ''} onChange={(e) => setData({...data, contact: {...data.contact, email: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">LinkedIn URL</label>
                  <input type="text" value={data.contact?.linkedin || ''} onChange={(e) => setData({...data, contact: {...data.contact, linkedin: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">GitHub URL</label>
                  <input type="text" value={data.contact?.github || ''} onChange={(e) => setData({...data, contact: {...data.contact, github: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-hidden relative">
          <div className="w-full h-full flex justify-center overflow-auto items-start pt-4 pb-12">
            <div 
              className="bg-white shadow-2xl overflow-y-auto relative transition-all duration-300 ease-in-out border border-gray-200 flex flex-col"
              style={{
                width: previewMode === 'desktop' ? '100%' : previewMode === 'tablet' ? '768px' : '375px',
                height: '100%',
                maxHeight: previewMode === 'desktop' ? 'none' : '812px',
                borderRadius: previewMode === 'desktop' ? '8px' : '36px',
                borderWidth: previewMode === 'desktop' ? '1px' : '12px',
                borderColor: '#e5e7eb'
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
