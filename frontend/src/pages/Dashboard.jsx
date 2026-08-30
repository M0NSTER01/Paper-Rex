import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, LayoutTemplate, ExternalLink, Edit, MoreVertical, LogOut, UploadCloud, Loader2, FileText } from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Modal states
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [modalStep, setModalStep] = useState('upload'); // 'upload' | 'extracting' | 'theme'
  const [selectedTheme, setSelectedTheme] = useState('Minimalist');
  
  // Upload states inside modal
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token) {
      navigate('/auth');
      return;
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchPortfolios(token);
  }, [navigate]);

  const fetchPortfolios = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPortfolios(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);


  const [extractedData, setExtractedData] = useState(null);

  const processFile = async (file) => {
    if (!file) return;
    setModalStep('extracting');
    setProgress(10);
    
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      // Simulate progress while waiting
      const interval = setInterval(() => {
        setProgress(p => Math.min(p + 15, 90));
      }, 500);

      const res = await axios.post('http://localhost:5000/api/extract-resume', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      clearInterval(interval);
      setProgress(100);
      setExtractedData(res.data);
      
      setTimeout(() => {
        setModalStep('theme');
      }, 800);
    } catch (err) {
      console.error("Extraction failed", err);
      alert("Failed to extract data. Make sure the backend has a valid Gemini API Key.");
      setShowNewModal(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleCreateNew = async (theme) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/portfolios', 
        { 
          name: newPortfolioName || 'Untitled Portfolio', 
          theme: theme || 'Minimalist',
          data: extractedData 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/editor?id=${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert('Error creating portfolio');
    }
  };


  

  

  

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]"><Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" /></div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col">
      <header className="py-4 px-8 border-b border-[var(--color-surface-dim)] bg-white flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-bold font-geist text-[var(--color-primary)]">SecondLife Resume</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700 font-inter">{user?.name}</span>
          <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold font-geist text-gray-900 mb-2">My Portfolios</h2>
            <p className="text-gray-500">Manage, edit, and share your generated web portfolios.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/create-resume"
              className="flex items-center gap-2 bg-white text-[var(--color-primary)] border border-[var(--color-primary)] px-5 py-2.5 rounded-lg font-semibold hover:bg-[var(--color-surface-container)] transition shadow-sm"
            >
              <FileText className="w-5 h-5" /> Create Resume
            </Link>
            <button 
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm"
            >
              <Plus className="w-5 h-5" /> Create New
            </button>
          </div>
        </div>

        {portfolios.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center shadow-sm">
            <LayoutTemplate className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-geist text-gray-900 mb-2">No portfolios yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't created any portfolios yet. Upload your first PDF resume to generate a beautiful web portfolio instantly.</p>
            <button 
              onClick={() => setShowNewModal(true)}
              className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map(portfolio => (
              <div key={portfolio.id} className="bg-white rounded-xl border border-[var(--color-surface-dim)] shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 border-b border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-200 transition-colors">
                  <LayoutTemplate className="w-12 h-12 text-gray-300" />
                  {/* Theme Badge */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-md text-gray-700 shadow-sm border border-gray-200">
                    {portfolio.theme}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold font-geist text-gray-900 mb-1">{portfolio.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 flex-grow">
                    Updated {new Date(portfolio.updated_at).toLocaleDateString()}
                  </p>
                  
                  <div className="flex gap-2 mt-auto">
                    <Link to={`/editor?id=${portfolio.id}`} className="flex-1 flex justify-center items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-2 rounded-md font-semibold text-sm transition">
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                    <Link to={`/portfolio/${portfolio.id}`} className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white py-2 rounded-md font-semibold text-sm transition shadow-sm">
                      <ExternalLink className="w-4 h-4" /> View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Portfolio Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative">
            <button onClick={() => setShowNewModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            {modalStep === 'upload' && (
              <>
                <h2 className="text-2xl font-bold font-geist mb-2 text-gray-900">Create New Portfolio</h2>
                <p className="text-gray-500 mb-6">Give your portfolio a name and upload your PDF resume.</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold font-geist mb-1 text-gray-700">Portfolio Name</label>
                  <input 
                    type="text" 
                    value={newPortfolioName} 
                    onChange={(e) => setNewPortfolioName(e.target.value)} 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none"
                    placeholder="e.g. Frontend Dev 2026"
                  />
                </div>

                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-10 transition-colors cursor-pointer text-center relative
                    ${isDragging ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-gray-300 hover:border-[var(--color-primary)] hover:bg-gray-50'}`}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700 mb-1">Drag & drop your PDF resume here</p>
                  <p className="text-xs text-gray-500">Maximum file size 10MB</p>
                </div>
              </>
            )}

            {modalStep === 'extracting' && (
              <div className="py-10 text-center">
                <Loader2 className="w-12 h-12 text-[var(--color-primary)] mx-auto animate-spin mb-6" />
                <h2 className="text-2xl font-bold font-geist mb-2 text-gray-900">Extracting data with AI...</h2>
                <p className="text-gray-500 mb-8">Parsing experience, skills, and education structure.</p>
                
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden border border-gray-200">
                  <div 
                    className="bg-[var(--color-primary)] h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-gray-500 text-right">{Math.round(Math.min(progress, 100))}%</p>
              </div>
            )}

            {modalStep === 'theme' && (
              <div className="py-4 text-center">
                <h2 className="text-2xl font-bold font-geist mb-2 text-gray-900">Choose Your Template</h2>
                <p className="text-gray-500 mb-8">Select a starting theme for your web portfolio. You can change this later.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-left">
                  {['Minimalist', 'Modern', 'Data Driven', 'Clean Academic', 'Midnight Developer', 'Neon Creative'].map(t => (
                    <div 
                      key={t}
                      onClick={() => setSelectedTheme(t)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${selectedTheme === t ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="h-20 bg-white rounded-md mb-3 border border-gray-100 flex items-center justify-center shadow-sm">
                         <LayoutTemplate className={`w-8 h-8 ${selectedTheme === t ? 'text-[var(--color-primary)]' : 'text-gray-300'}`} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm text-center">{t}</h4>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleCreateNew(selectedTheme)}
                  className="w-full bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm"
                >
                  Generate Portfolio
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
