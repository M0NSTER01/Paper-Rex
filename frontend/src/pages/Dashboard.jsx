import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Settings, BarChart2, MessageSquare, History, Eye } from 'lucide-react';
import DeveloperTemplate from '../components/Templates/Developer';
import CorporateTemplate from '../components/Templates/Corporate';
import CreativeTemplate from '../components/Templates/Creative';
import MinimalistTemplate from '../components/Templates/Minimalist';
import ModernTemplate from '../components/Templates/Modern';

export default function Dashboard() {
  const { user, token, logout, portfolio, setPortfolio, updatePortfolioContent } = useStore();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState('developer');
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('edit'); // edit, history, analytics
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPortfolio();
  }, []);

  const fetchMyPortfolio = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolios/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.length > 0) {
        // Fetch the full content of the first portfolio
        const port = res.data[0];
        const fullRes = await axios.get(`http://localhost:5000/api/portfolios/${port.id}`);
        setPortfolio(fullRes.data);
        setTemplate(fullRes.data.template);
        fetchHistory(port.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/portfolios/${id}/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await axios.post('http://localhost:5000/api/portfolios/upload-resume', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      updatePortfolioContent(res.data.extractedData);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.error || err.message || 'Upload failed');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        id: portfolio?.id,
        template,
        content: portfolio?.content || {}
      };
      const res = await axios.post('http://localhost:5000/api/portfolios', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Portfolio saved/published!');
      fetchMyPortfolio(); // refresh
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleChatEdit = async () => {
    if (!chatPrompt) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/portfolios/chatbot-edit', {
        prompt: chatPrompt,
        currentContent: portfolio?.content || {}
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      updatePortfolioContent(res.data.updatedContent);
      setChatResponse(res.data.message);
      setChatPrompt('');
    } catch (err) {
      alert('Chatbot error');
    }
    setLoading(false);
  };

  const handleRollback = async (versionId) => {
    if (!portfolio?.id) return;
    try {
      await axios.post(`http://localhost:5000/api/portfolios/${portfolio.id}/rollback`, { versionId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMyPortfolio();
      alert('Rollback successful');
    } catch (err) {
      alert('Rollback failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate completeness score
  const getCompleteness = () => {
    if (!portfolio?.content) return 0;
    const c = portfolio.content;
    let score = 0;
    if (c.basics?.name) score += 20;
    if (c.basics?.summary) score += 20;
    if (c.skills?.length > 0) score += 20;
    if (c.experience?.length > 0) score += 20;
    if (c.projects?.length > 0) score += 20;
    return score;
  };

  const renderLivePreview = () => {
    const data = portfolio?.content || {};
    switch (template) {
      case 'corporate': return <CorporateTemplate data={data} />;
      case 'creative': return <CreativeTemplate data={data} />;
      case 'minimalist': return <MinimalistTemplate data={data} />;
      case 'modern': return <ModernTemplate data={data} />;
      case 'developer':
      default: return <DeveloperTemplate data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-b md:border-r md:border-b-0 shadow-sm flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4 md:mb-8 text-center md:text-left">PDF Prison</h1>
        
        <nav className="flex flex-row md:flex-col gap-2 flex-1 overflow-x-auto">
          <button onClick={() => setActiveTab('edit')} className={`flex-1 md:w-full flex items-center justify-center md:justify-start p-2 rounded whitespace-nowrap ${activeTab === 'edit' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            <Settings className="w-5 h-5 mr-0 md:mr-3" /> <span className="hidden md:inline">Editor</span>
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex-1 md:w-full flex items-center justify-center md:justify-start p-2 rounded whitespace-nowrap ${activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            <History className="w-5 h-5 mr-0 md:mr-3" /> <span className="hidden md:inline">History</span>
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`flex-1 md:w-full flex items-center justify-center md:justify-start p-2 rounded whitespace-nowrap ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}>
            <BarChart2 className="w-5 h-5 mr-0 md:mr-3" /> <span className="hidden md:inline">Analytics</span>
          </button>
        </nav>

        <div className="mt-4 md:mt-auto border-t pt-4 flex justify-between md:flex-col items-center md:items-start">
          <p className="text-sm font-medium mb-0 md:mb-2">User: {user?.username}</p>
          <button onClick={handleLogout} className="text-red-600 text-sm p-2 hover:bg-red-50 rounded">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-full mx-auto space-y-6">
          
          <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
            <div>
              <h2 className="text-lg font-semibold">Profile Completeness</h2>
              <div className="w-64 bg-gray-200 h-2 rounded mt-2 overflow-hidden">
                <div className="bg-green-500 h-full transition-all" style={{ width: `${getCompleteness()}%` }}></div>
              </div>
            </div>
            {portfolio?.id && (
              <a href={`/p/${portfolio.id}`} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                View Public Portfolio
              </a>
            )}
          </div>

          {activeTab === 'edit' && (
            <div className="flex flex-col lg:flex-row gap-6 lg:h-[800px]">
              {/* Left Panel: Editor Tools */}
              <div className="w-full lg:w-1/3 flex flex-col space-y-4 lg:overflow-y-auto pr-0 lg:pr-2 pb-4">
                
                <div className="bg-white p-5 rounded shadow-sm border">
                  <h3 className="font-semibold mb-3 flex items-center"><Upload className="w-4 h-4 mr-2" /> Upload Resume</h3>
                  <p className="text-xs text-gray-500 mb-3">Upload your PDF resume to instantly paste the relevant info into the live preview.</p>
                  <form onSubmit={handleUpload} className="flex gap-2">
                    <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="border p-2 flex-1 rounded text-sm min-w-0" />
                    <button type="submit" disabled={loading} className="bg-gray-800 text-white px-3 rounded text-sm hover:bg-gray-900 disabled:opacity-50 whitespace-nowrap">
                      Extract
                    </button>
                  </form>
                </div>

                <div className="bg-white p-5 rounded shadow-sm border">
                  <h3 className="font-semibold flex items-center mb-3"><MessageSquare className="w-4 h-4 mr-2" /> AI Assistant</h3>
                  <div className="bg-gray-50 p-3 rounded text-xs min-h-[60px] mb-3 border text-gray-700">
                    {chatResponse || "Hi! Ask me to rewrite your summary or fix grammar."}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 border p-2 rounded text-sm min-w-0" 
                      placeholder="e.g. 'Make it sound professional'"
                      value={chatPrompt}
                      onChange={e => setChatPrompt(e.target.value)}
                    />
                    <button onClick={handleChatEdit} disabled={loading} className="bg-indigo-600 text-white px-3 rounded hover:bg-indigo-700 text-sm disabled:opacity-50 whitespace-nowrap">
                      Send
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded shadow-sm border flex-1">
                  <h3 className="font-semibold flex items-center mb-3"><FileText className="w-4 h-4 mr-2" /> Manual Tweaks</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" className="w-full border p-2 rounded text-sm" 
                        value={portfolio?.content?.basics?.name || ''} 
                        onChange={e => updatePortfolioContent({ basics: { ...portfolio.content.basics, name: e.target.value }})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Professional Summary</label>
                      <textarea className="w-full border p-2 rounded h-24 text-sm" 
                        value={portfolio?.content?.basics?.summary || ''} 
                        onChange={e => updatePortfolioContent({ basics: { ...portfolio.content.basics, summary: e.target.value }})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Template Selector & Live Preview */}
              <div className="w-full lg:w-2/3 flex flex-col space-y-4">
                <div className="bg-white p-4 rounded shadow-sm border flex gap-4 overflow-x-auto items-center">
                  
                  <div className="flex gap-4 min-w-max">
                    {/* Developer Template Preview */}
                    <div 
                      onClick={() => setTemplate('developer')}
                      className={`w-32 cursor-pointer border-2 rounded-lg p-2 transition-all ${template === 'developer' ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="h-16 bg-gray-900 rounded p-1 flex flex-col gap-1 overflow-hidden border border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                        <div className="flex gap-1 items-center">
                          <span className="text-[6px] text-green-400 font-mono">&gt;</span>
                          <div className="w-1/2 h-1 bg-green-400 rounded-sm"></div>
                        </div>
                        <div className="ml-1 pl-1 border-l border-green-700 space-y-0.5">
                          <div className="w-3/4 h-1 bg-green-200/70 rounded-sm"></div>
                          <div className="w-1/2 h-1 bg-green-200/70 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="mt-2 text-center font-semibold text-xs">Developer</div>
                    </div>

                    {/* Corporate Template Preview */}
                    <div 
                      onClick={() => setTemplate('corporate')}
                      className={`w-32 cursor-pointer border-2 rounded-lg p-2 transition-all ${template === 'corporate' ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="h-16 bg-white border border-gray-200 rounded flex flex-col items-center pt-2 px-2 gap-1 overflow-hidden shadow-sm">
                        <div className="w-2/3 h-2 bg-blue-900 rounded-sm"></div>
                        <div className="w-1/3 h-1 bg-gray-400 rounded-sm mb-1"></div>
                        <div className="w-full border-t-2 border-blue-900 pt-1">
                          <div className="w-full h-1 bg-gray-300 rounded-sm mb-0.5"></div>
                          <div className="w-4/5 h-1 bg-gray-300 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="mt-2 text-center font-semibold text-xs">Corporate</div>
                    </div>

                    {/* Creative Template Preview */}
                    <div 
                      onClick={() => setTemplate('creative')}
                      className={`w-32 cursor-pointer border-2 rounded-lg p-2 transition-all ${template === 'creative' ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="h-16 bg-yellow-50 rounded flex flex-col p-1 overflow-hidden relative shadow-inner">
                        <div className="absolute top-[-5px] right-[-5px] w-8 h-8 bg-pink-300 rounded-full blur-sm"></div>
                        <div className="absolute bottom-[-5px] left-[-5px] w-8 h-8 bg-yellow-300 rounded-full blur-sm"></div>
                        <div className="w-4/5 h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-sm relative z-10 mt-1 mb-1"></div>
                        <div className="flex gap-1 relative z-10">
                          <div className="w-2/3 space-y-0.5">
                            <div className="w-full h-1 bg-pink-200 rounded-sm"></div>
                            <div className="w-full h-1 bg-pink-200 rounded-sm"></div>
                          </div>
                          <div className="w-1/3 space-y-0.5 mt-1">
                             <div className="w-full h-2 bg-violet-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-center font-semibold text-xs">Creative</div>
                    </div>

                    {/* Minimalist Template Preview */}
                    <div 
                      onClick={() => setTemplate('minimalist')}
                      className={`w-32 cursor-pointer border-2 rounded-lg p-2 transition-all ${template === 'minimalist' ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="h-16 bg-white rounded border border-gray-100 flex flex-col px-2 pt-2 overflow-hidden">
                        <div className="w-1/3 h-1 bg-gray-800 mb-0.5"></div>
                        <div className="w-1/4 h-0.5 bg-gray-400 mb-2"></div>
                        <div className="flex gap-1">
                          <div className="w-1/5 h-0.5 bg-gray-300 mt-0.5"></div>
                          <div className="w-4/5 space-y-0.5">
                            <div className="w-full h-1 bg-gray-800"></div>
                            <div className="w-3/4 h-0.5 bg-gray-400"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-center font-semibold text-xs">Minimalist</div>
                    </div>

                    {/* Modern Template Preview */}
                    <div 
                      onClick={() => setTemplate('modern')}
                      className={`w-32 cursor-pointer border-2 rounded-lg p-2 transition-all ${template === 'modern' ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="h-16 bg-gray-100 rounded flex gap-1 p-1 overflow-hidden">
                        <div className="w-1/3 h-full bg-white rounded shadow-sm flex flex-col items-center p-0.5">
                           <div className="w-3 h-3 bg-indigo-100 rounded-full mb-0.5"></div>
                           <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-2/3 h-full bg-white rounded shadow-sm p-1 flex flex-col gap-0.5">
                           <div className="w-full h-1 bg-gray-800 rounded"></div>
                           <div className="w-full h-4 bg-gray-50 rounded"></div>
                        </div>
                      </div>
                      <div className="mt-2 text-center font-semibold text-xs">Modern</div>
                    </div>
                  </div>
                  
                  <div className="ml-auto pl-4 border-l">
                    <button onClick={handleSave} className="bg-green-600 text-white px-6 py-4 rounded-xl text-sm font-bold shadow-lg hover:bg-green-700 whitespace-nowrap transition-transform hover:scale-105 active:scale-95">
                      Save & Publish
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-[500px] bg-white rounded shadow-sm border relative overflow-hidden flex flex-col">
                  <div className="bg-gray-100 border-b p-2 flex items-center gap-2">
                    <div className="flex gap-1.5 ml-2 hidden sm:flex">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="bg-white text-xs text-gray-500 px-3 py-1 rounded ml-2 sm:ml-4 shadow-sm font-mono flex items-center gap-2">
                      <Eye className="w-3 h-3" /> Live Preview (Updates instantly)
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto bg-gray-200 relative">
                    <div className="origin-top-left transform scale-50 sm:scale-75 lg:scale-90 xl:scale-100 min-w-[320px] w-[200%] sm:w-[133%] lg:w-[111%] xl:w-full h-[200%] sm:h-[133%] lg:h-[111%] xl:h-full">
                      {renderLivePreview()}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white p-6 rounded shadow-sm border">
              <h3 className="font-semibold mb-4">Version History</h3>
              {history.length === 0 ? <p className="text-gray-500">No history yet.</p> : (
                <ul className="space-y-4">
                  {history.map(h => (
                    <li key={h.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                      <div>
                        <span className="font-medium">Version {h.version_number}</span>
                        <span className="text-sm text-gray-500 ml-4">{new Date(h.created_at).toLocaleString()}</span>
                      </div>
                      <button onClick={() => handleRollback(h.id)} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                        Rollback
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white p-6 rounded shadow-sm border">
              <h3 className="font-semibold mb-4">Page Analytics</h3>
              <p>Analytics integration coming soon. This portfolio has been visited.</p>
              {/* Actual analytics data fetching would go here */}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
