import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, Share2, Save, ExternalLink, Settings, Briefcase, GraduationCap, User, Trophy, LayoutTemplate, Loader2, Monitor, Tablet, Smartphone, Code, Mail, Eye, EyeOff, Plus, Trash2, UploadCloud } from 'lucide-react';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import DataDrivenTemplate from '../components/templates/DataDrivenTemplate';
import MidnightDeveloperTemplate from '../components/templates/MidnightDeveloperTemplate';
import NeonCreativeTemplate from '../components/templates/NeonCreativeTemplate';
import SkillGapAnalysis from '../components/SkillGapAnalysis';
import Chatbot from '../components/Chatbot';

const DEFAULT_DATA = {
  intro: { name: '', title: '', summary: '' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  contact: { email: '', linkedin: '', github: '' },
  ats: { score: 0, feedback: '' },
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
  const [evaluatingAts, setEvaluatingAts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deploySuccessUrl, setDeploySuccessUrl] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
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

  // Autosave logic
  useEffect(() => {
    if (!portfolioId || loading || !data.intro?.name?.trim()) return;
    const timeoutId = setTimeout(() => {
       const token = localStorage.getItem('token');
       axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/portfolios/${portfolioId}`, 
          { theme, data },
          { headers: { Authorization: `Bearer ${token}` } }
       ).catch(err => console.error('Autosave failed', err));
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [data, theme, portfolioId, loading]);

  const fetchPortfolio = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolios/${id}`, {
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
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setData(prev => ({
        ...prev,
        intro: { ...prev.intro, photoUrl: reader.result }
      }));
    };
    reader.readAsDataURL(file);
  };

  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceSummary = async () => {
    try {
      setIsEnhancing(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/enhance-summary`, { data }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.data.enhancedSummary) {
        setData(prev => ({
          ...prev,
          intro: { ...prev.intro, summary: res.data.enhancedSummary }
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to enhance summary');
    } finally {
      setIsEnhancing(false);
    }
  };

  const calculateCompletion = () => {
    let completed = 0;
    let total = 6;
    if (data.intro?.name && data.intro?.title && data.intro?.summary) completed++;
    if (data.experience && data.experience.length > 0) completed++;
    if (data.education && data.education.length > 0) completed++;
    if (data.skills && data.skills.length > 0) completed++;
    if (data.projects && data.projects.length > 0) completed++;
    if (data.contact?.email) completed++;
    return Math.round((completed / total) * 100);
  };

  const handleSave = async () => {
    if (!data.intro?.name?.trim() || !data.contact?.email?.trim() || !data.intro?.title?.trim()) {
      alert("Mandatory Fields Missing:\nPlease ensure your Full Name, Professional Title, and Contact Email are filled in before saving.");
      return false;
    }
    if (!portfolioId) return false;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/portfolios/${portfolioId}`, 
        { theme, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
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

  const handleRecalculateATS = async () => {
    if (!portfolioId) return;
    setEvaluatingAts(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/evaluate-ats`, { data }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(prev => ({
        ...prev,
        ats: { score: res.data.score, feedback: res.data.feedback }
      }));
    } catch (err) {
      console.error(err);
      alert('Failed to calculate ATS score.');
    } finally {
      setEvaluatingAts(false);
    }
  };

  
  const handleDeploy = async () => {
    setDeploying(true);
    try {
      const el = document.getElementById('template-preview');
      if (!el) return;
      
      const customStyles = Array.from(document.querySelectorAll('style')).map(s => s.innerHTML).join('\n');
      const innerHtml = el.innerHTML;
      
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.intro?.name || 'Portfolio'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
  <style>
    ${customStyles}
  </style>
</head>
<body>
  ${innerHtml}
  
    <script>
      const contactForm = document.getElementById('portfolio-contact-form');

      // --- CHATBOT WIDGET ---
      const chatWidget = document.createElement('div');
      chatWidget.innerHTML = 
'' +
'        <button id="chat-fab" class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-700 transition">' +
'          <span class="material-symbols-outlined">chat</span>' +
'        </button>' +
'        <div id="chat-window" class="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 hidden" style="height: 500px; max-height: 85vh;">' +
'          <div class="bg-blue-600 p-4 flex items-center justify-between text-white shrink-0 rounded-t-2xl">' +
'            <span class="font-bold">Ask AI</span>' +
'            <button id="chat-close" class="text-white hover:text-gray-200">' +
'              <span class="material-symbols-outlined">close</span>' +
'            </button>' +
'          </div>' +
'          <div id="chat-messages" class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">' +
'            <div class="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">' +
'              Hi! Ask me anything about this portfolio!' +
'            </div>' +
'          </div>' +
'          <form id="chat-form" class="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0 rounded-b-2xl">' +
'            <input type="text" id="chat-input" placeholder="Ask a question..." class="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none" required />' +
'            <button type="submit" class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">' +
'              <span class="material-symbols-outlined text-sm">send</span>' +
'            </button>' +
'          </form>' +
'        </div>' +
'      ';
      document.body.appendChild(chatWidget);

      const chatFab = document.getElementById('chat-fab');
      const chatWindow = document.getElementById('chat-window');
      const chatClose = document.getElementById('chat-close');
      const chatForm = document.getElementById('chat-form');
      const chatInput = document.getElementById('chat-input');
      const chatMessages = document.getElementById('chat-messages');

      chatFab.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
        chatFab.classList.add('hidden');
      });

      // Handle template-specific AI buttons
      const templateAIBtns = document.querySelectorAll('.ai-chat-trigger');
      if (templateAIBtns.length > 0) {
        chatFab.style.display = 'none'; // Hide fallback FAB if template has its own
        templateAIBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            chatWindow.classList.remove('hidden');
          });
        });
      }

      chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        if (templateAIBtns.length === 0) {
          chatFab.classList.remove('hidden');
        }
      });

      let chatHistory = [{ role: 'model', parts: [{ text: 'Hi! Ask me anything about this portfolio!' }] }];
      const contextData = JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(data))}"));
      const backendUrl = "${import.meta.env.VITE_BACKEND_URL}";

      chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if(!msg) return;

        chatMessages.innerHTML += 
'<div class="self-end bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%]">' + msg + '</div>';
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const loadingId = 'loading-' + Date.now();
        chatMessages.innerHTML += 
'<div id="' + loadingId + '" class="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] animate-pulse">Thinking...</div>';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
          const res = await fetch(backendUrl + '/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, history: chatHistory, context: contextData })
          });
          const resData = await res.json();
          document.getElementById(loadingId).remove();
          if(resData.response) {
            chatMessages.innerHTML += 
'<div class="self-start bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">' + resData.response.replace(/</g, "&lt;") + '</div>';
            chatHistory.push({ role: 'user', parts: [{ text: msg }] });
            chatHistory.push({ role: 'model', parts: [{ text: resData.response }] });
          } else {
            chatMessages.innerHTML += 
'<div class="self-start bg-red-100 text-red-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">Error fetching response</div>';
          }
        } catch(err) {
          document.getElementById(loadingId).remove();
          chatMessages.innerHTML += 
'<div class="self-start bg-red-100 text-red-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">Connection error</div>';
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
      // ------------------------

      if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const btn = contactForm.querySelector('button[type="submit"]');
          const originalText = btn.innerText;
          btn.innerText = 'Sending...';
          btn.disabled = true;

          const toEmail = contactForm.getAttribute('data-to-email');
          const name = contactForm.querySelector('#name').value;
          const email = contactForm.querySelector('#email').value;
          const message = contactForm.querySelector('#message').value;

          try {
            const res = await fetch(backendUrl + '/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, message, toEmail })
            });
            if (res.ok) {
              btn.innerText = 'Message sent!';
              btn.style.backgroundColor = '#16a34a'; // green
              contactForm.reset();
            } else {
              throw new Error('Failed');
            }
          } catch(err) {
            btn.innerText = 'Failed to send';
            btn.style.backgroundColor = '#dc2626'; // red
          }
          
          setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
          }, 3000);
        });
      }
    </script>

  </body>
  </html>`;

      const token = localStorage.getItem('token');
      const slug = (data.intro?.name || 'user').replace(/\s+/g, '-').toLowerCase() + '-' + Math.floor(Math.random() * 1000);

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/deploy`, {
        htmlContent,
        slug
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const url = 'https://' + res.data.liveUrl;
      const newDeploy = { url, date: new Date().toISOString() };
      const updatedData = { 
        ...data, 
        liveUrl: url,
        deployments: [newDeploy, ...(data.deployments || [])]
      };
      setData(updatedData);
      
      // Save to DB so Dashboard can show it
      if (portfolioId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/portfolios/${portfolioId}`, 
          { theme, data: updatedData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setDeploySuccessUrl(url);
    } catch (err) {
      console.error(err);
      alert('Failed to deploy to Netlify');
    } finally {
      setDeploying(false);
    }
  };

  const handlePublish = () => {
    handleSave().then((success) => {
      if (success !== false) {
        navigate(`/portfolio/${portfolioId || 'demo'}`);
      }
    });
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-[var(--color-surface)]"><Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" /></div>;
  }

  const renderTemplate = () => {
    switch (theme) {
      case 'Modern': return <ModernTemplate data={data} />;
      case 'Data Driven': return <DataDrivenTemplate data={data} />;
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

  
  const handleCopy = () => {
    navigator.clipboard.writeText(data.liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--color-surface)] overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 flex-shrink-0 border-b border-[var(--color-surface-dim)] bg-white px-6 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Paper Rex Logo" className="h-8 object-contain" />
          </div>
          <div className="flex items-center gap-3 ml-2">
            <span className="text-sm text-gray-500 font-medium">Profile Completion</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${calculateCompletion()}%` }}></div>
            </div>
            <span className="text-sm font-semibold">{calculateCompletion()}%</span>
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
              <option value="Midnight Developer">Midnight Developer</option>
              <option value="Neon Creative">Neon Creative</option>
            </select>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-200 transition shadow-sm border border-gray-200">
            {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : saved ? <span className="text-green-600 font-bold">✓</span> : <Save className="w-4 h-4" />} {saved ? "Saved!" : "Save"}
          </button>
          <button onClick={handlePublish} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[var(--color-secondary)] transition shadow-sm">
            <ExternalLink className="w-4 h-4" /> View Live
          </button>
          
            {data.liveUrl && (
              <button onClick={() => setShowShareModal(true)} className="flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-100 transition shadow-sm">
                <Share2 className="w-4 h-4" /> Share
              </button>
            )}
            <button onClick={handleDeploy} disabled={deploying} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-800 transition shadow-sm disabled:opacity-50">
            {deploying ? <Loader2 className="w-4 h-4 animate-spin"/> : <Monitor className="w-4 h-4" />} Deploy to Netlify
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
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={data.intro?.name || ''} onChange={(e) => setData({...data, intro: {...data.intro, name: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title <span className="text-red-500">*</span></label>
                  <input type="text" value={data.intro?.title || ''} onChange={(e) => setData({...data, intro: {...data.intro, title: e.target.value}})} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-500">Summary</label>
                    <button onClick={handleEnhanceSummary} disabled={isEnhancing} className="text-xs text-[var(--color-primary)] font-semibold flex items-center gap-1 hover:underline disabled:opacity-50">
                      {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="material-symbols-outlined text-[14px]">auto_awesome</span>}
                      {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                    </button>
                  </div>
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
                    }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition z-10 bg-white rounded-md"><Trash2 className="w-4 h-4"/></button>
                    
                    <div className="flex gap-4 mb-3">
                      {proj.image ? (
                        <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-200 shrink-0 group/img">
                          <img src={proj.image} alt="Project" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <button onClick={() => {
                              const arr = [...data.projects];
                              delete arr[idx].image;
                              setData({...data, projects: arr});
                            }} className="text-white hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ) : (
                        <label className="w-20 h-20 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors shrink-0">
                          <UploadCloud className="w-5 h-5 mb-1" />
                          <span className="text-[10px] font-semibold text-center leading-tight">Project<br/>Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0) return;
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const arr = [...data.projects];
                              arr[idx].image = reader.result;
                              setData({...data, projects: arr});
                            };
                            reader.readAsDataURL(file);
                          }} />
                        </label>
                      )}
                      <div className="flex-1 min-w-0">
                        <input placeholder="Project Title" value={proj.title || ''} onChange={(e) => { const arr = [...data.projects]; arr[idx].title = e.target.value; setData({...data, projects: arr}) }} className="font-semibold text-sm w-full outline-none mb-2 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                        <textarea placeholder="Description" rows="2" value={proj.desc || ''} onChange={(e) => { const arr = [...data.projects]; arr[idx].desc = e.target.value; setData({...data, projects: arr}) }} className="text-sm w-full outline-none bg-transparent resize-none border-b border-dashed border-gray-300 focus:border-[var(--color-primary)]"></textarea>
                      </div>
                    </div>
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
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Email <span className="text-red-500">*</span></label>
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

              {/* Skill Gap Analysis */}
              <SkillGapAnalysis data={data} />
  
            </div>
          </div>
  
        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-hidden relative">
          <div className="w-full h-full flex justify-center overflow-auto items-start pt-4 pb-12">
            <div 
              id="template-preview"
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

      {/* Deployment Success Modal */}
      {deploySuccessUrl && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold font-geist mb-2 text-gray-900">Deployed Successfully!</h3>
            <p className="text-gray-500 mb-6 text-sm">Your portfolio is now live on Netlify.</p>
            <div className="space-y-3">
              <a 
                href={deploySuccessUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-colors shadow-md hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5" /> Open Live Site
              </a>
              <button 
                onClick={() => setDeploySuccessUrl(null)}
                className="w-full py-3 px-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-geist text-gray-900 flex items-center gap-2"><Share2 className="w-5 h-5"/> Share Portfolio</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <QRCodeCanvas value={data.liveUrl} size={180} level={"H"} className="rounded-lg shadow-sm" />
              <p className="text-xs text-gray-500 mt-4 text-center">Scan to open on mobile</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live URL</label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={data.liveUrl} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none" />
                <button onClick={handleCopy} className="bg-[var(--color-primary)] text-white p-2.5 rounded-lg hover:bg-[var(--color-secondary)] transition shadow-sm" title="Copy to clipboard">
                  {copied ? <span className="material-symbols-outlined text-xl">check</span> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website AI (Paper Rex Support) */}
      <Chatbot 
        title="Paper Rex Support" 
        welcomeMessage="Hi! Need help building your portfolio?" 
      />

      {/* Portfolio AI (Answers questions about the user's resume) */}
      <Chatbot 
        context={data} 
        title="Ask AI" 
        welcomeMessage={`Hi! Ask me anything about ${data.intro?.name || 'this portfolio'}!`} 
        hideFab={true} 
        triggerEvent="open-ai-chat" 
      />
    </div>
  );
}