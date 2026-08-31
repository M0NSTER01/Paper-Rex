import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft, ArrowRight, Upload, Mic, MicOff, PenLine, Loader2,
  Target, CheckCircle2, AlertTriangle, XCircle, Download,
  Briefcase, GraduationCap, Code, Trophy, Mail, User,
  Eye, EyeOff, Plus, Trash2, LayoutTemplate, FileText, Sparkles
} from 'lucide-react';
import ATSClassicTemplate from '../components/templates/ATSClassicTemplate';
import ModernTechTemplate from '../components/templates/ModernTechTemplate';

const API_BASE = 'http://localhost:5000';

export default function CreateResume() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=Data Source, 2=Job Context, 3=ATS Review+Edit, 4=Template+Download

  // Step 1 — Data Source
  const [inputMethod, setInputMethod] = useState(null); // 'manual' | 'upload' | 'voice'
  const [rawText, setRawText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const recognitionRef = useRef(null);

  // Step 2 — Job Context
  const [targetPosition, setTargetPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Step 3 — ATS Review + Editor
  const [data, setData] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);

  // Step 4 — Template
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  // ─── Step 1: Voice dictation via Web Speech API ────────────────
  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      if (finalTranscript) {
        setRawText(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  // ─── Step 1: PDF upload ────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const processUpload = async (file) => {
    if (!file) return;
    setIsExtracting(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      const interval = setInterval(() => {
        setUploadProgress(p => Math.min(p + 12, 90));
      }, 400);

      const res = await axios.post(`${API_BASE}/api/extract-resume`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      clearInterval(interval);
      setUploadProgress(100);

      // Convert extracted JSON to a raw text representation for Gemini
      const extracted = res.data;
      let text = '';
      if (extracted.intro) {
        text += `Name: ${extracted.intro.name || ''}\nTitle: ${extracted.intro.title || ''}\nSummary: ${extracted.intro.summary || ''}\n\n`;
      }
      if (extracted.experience?.length) {
        text += 'EXPERIENCE:\n';
        extracted.experience.forEach(exp => {
          text += `- ${exp.role} at ${exp.company} (${exp.years}): ${exp.desc}\n`;
        });
        text += '\n';
      }
      if (extracted.education?.length) {
        text += 'EDUCATION:\n';
        extracted.education.forEach(edu => {
          text += `- ${edu.degree} from ${edu.school} (${edu.years})\n`;
        });
        text += '\n';
      }
      if (extracted.skills?.length) {
        text += `SKILLS: ${extracted.skills.join(', ')}\n\n`;
      }
      if (extracted.projects?.length) {
        text += 'PROJECTS:\n';
        extracted.projects.forEach(proj => {
          text += `- ${proj.title}: ${proj.desc} [${(proj.tech || []).join(', ')}]\n`;
        });
        text += '\n';
      }
      if (extracted.certifications?.length) {
        text += 'CERTIFICATIONS:\n';
        extracted.certifications.forEach(cert => {
          text += `- ${cert.title} (${cert.issuer}, ${cert.year})\n`;
        });
        text += '\n';
      }
      if (extracted.contact) {
        text += `CONTACT: Email: ${extracted.contact.email || ''} | LinkedIn: ${extracted.contact.linkedin || ''} | GitHub: ${extracted.contact.github || ''}\n`;
      }

      setRawText(text.trim());
      setTimeout(() => {
        setIsExtracting(false);
      }, 600);
    } catch (err) {
      console.error('PDF extraction failed:', err);
      alert('Failed to extract resume data. Make sure the backend is running with a valid Gemini API key.');
      setIsExtracting(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      processUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      processUpload(e.target.files[0]);
    }
  };

  // ─── Step 2: Hit the ATS optimization endpoint ─────────────────
  const handleOptimize = async () => {
    if (!rawText.trim()) {
      alert('Please provide your resume data first.');
      return;
    }
    if (!jobDescription.trim()) {
      alert('Please paste the job description.');
      return;
    }

    setIsOptimizing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/optimize-resume`, {
        candidateData: rawText,
        targetPosition,
        companyName,
        jobDescription
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data.editorData);
      setAtsAnalysis(res.data.atsAnalysis);
      setStep(3);
    } catch (err) {
      console.error('Optimization failed:', err);
      alert('Failed to optimize resume. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const [isReoptimizing, setIsReoptimizing] = useState(false);

  const handleReoptimize = async () => {
    setIsReoptimizing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/optimize-resume`, {
        candidateData: data,
        targetPosition,
        companyName,
        jobDescription
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data.editorData);
      setAtsAnalysis(res.data.atsAnalysis);
    } catch (err) {
      console.error('Reoptimization failed:', err);
      alert('Failed to recalculate ATS score. Please try again.');
    } finally {
      setIsReoptimizing(false);
    }
  };

  // ─── Step 4: Print PDF ─────────────────────────────────────────
  const handleDownloadPDF = () => {
    window.print();
  };

  // ─── Editor helpers (same pattern as Editor.jsx) ───────────────
  const toggleVisibility = (section) => {
    setData(prev => ({
      ...prev,
      visible: { ...prev.visible, [section]: !prev.visible[section] }
    }));
  };

  const SectionHeader = ({ icon: Icon, title, sectionKey }) => (
    <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
      <div className="flex items-center gap-2 text-[#1f108e] font-semibold text-base">
        <Icon className="w-4 h-4" /> <h3>{title}</h3>
      </div>
      {sectionKey && (
        <button
          onClick={() => toggleVisibility(sectionKey)}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${data.visible[sectionKey] ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
        >
          {data.visible[sectionKey] ? <><Eye className="w-3 h-3" /> Visible</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
        </button>
      )}
    </div>
  );

  // ─── Score color helper ────────────────────────────────────────
  const getScoreColor = (score) => {
    if (score >= 75) return { ring: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Strong Match' };
    if (score >= 50) return { ring: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Moderate Match' };
    return { ring: '#ef4444', bg: 'bg-red-50', text: 'text-red-700', label: 'Needs Work' };
  };

  // ─── Auth guard ────────────────────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth');
    }
  }, [navigate]);

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col print:bg-white print:min-h-0">

      {/* Top Bar — hidden in print */}
      <header className="h-14 flex-shrink-0 border-b border-[var(--color-surface-dim)] bg-white px-6 flex items-center justify-between shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-gray-700 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold font-geist text-lg text-[var(--color-primary)]">Create Resume</h1>
        </div>

        {/* Step Indicator */}
        <div className="hidden md:flex items-center gap-2">
          {['Data Input', 'Job Context', 'ATS Review', 'Download'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? 'bg-emerald-500 text-white' :
                step === i + 1 ? 'bg-[var(--color-primary)] text-white shadow-md' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${step === i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
              {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="w-20" />
      </header>

      {/* ═══════════════ STEP 1: DATA SOURCE ═══════════════ */}
      {step === 1 && (
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 print:hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-geist text-gray-900 mb-2">How would you like to provide your data?</h2>
            <p className="text-gray-500">Choose an input method to get started. You can always edit later.</p>
          </div>

          {/* Method Selector */}
          {!inputMethod && (
            <div className="grid md:grid-cols-3 gap-5">
              <button
                onClick={() => setInputMethod('manual')}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all group"
              >
                <PenLine className="w-10 h-10 text-gray-400 group-hover:text-[var(--color-primary)] mx-auto mb-4 transition" />
                <h3 className="font-bold text-gray-900 mb-1">Type / Paste</h3>
                <p className="text-sm text-gray-500">Manually enter or paste your resume content</p>
              </button>

              <button
                onClick={() => setInputMethod('upload')}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all group"
              >
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-[var(--color-primary)] mx-auto mb-4 transition" />
                <h3 className="font-bold text-gray-900 mb-1">Upload PDF</h3>
                <p className="text-sm text-gray-500">Upload an existing resume PDF for AI extraction</p>
              </button>

              <button
                onClick={() => setInputMethod('voice')}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all group"
              >
                <Mic className="w-10 h-10 text-gray-400 group-hover:text-[var(--color-primary)] mx-auto mb-4 transition" />
                <h3 className="font-bold text-gray-900 mb-1">Voice Dictation</h3>
                <p className="text-sm text-gray-500">Speak your experience and let AI transcribe it</p>
              </button>
            </div>
          )}

          {/* Manual / Voice text area */}
          {(inputMethod === 'manual' || inputMethod === 'voice') && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => { setInputMethod(null); }} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                {inputMethod === 'voice' && (
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition ${
                      isRecording
                        ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                        : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]'
                    }`}
                  >
                    {isRecording ? <><MicOff className="w-4 h-4" /> Stop Recording</> : <><Mic className="w-4 h-4" /> Start Recording</>}
                  </button>
                )}
              </div>

              <textarea
                rows="14"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={inputMethod === 'voice'
                  ? "Click 'Start Recording' and describe your experience, education, skills, and projects. The transcription will appear here..."
                  : "Paste your resume text here, or type out your experience, skills, education, and projects. Include as much detail as possible — the AI will structure and optimize it for you."
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:border-[var(--color-primary)] outline-none font-mono leading-relaxed"
              />

              {rawText.trim() && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm"
                  >
                    Next: Job Context <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PDF Upload */}
          {inputMethod === 'upload' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center mb-4">
                <button onClick={() => { setInputMethod(null); setIsExtracting(false); setUploadProgress(0); }} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              </div>

              {isExtracting ? (
                <div className="py-10 text-center">
                  <Loader2 className="w-12 h-12 text-[var(--color-primary)] mx-auto animate-spin mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Extracting resume data with AI...</h3>
                  <p className="text-gray-500 mb-6 text-sm">Parsing your experience, skills, and education.</p>
                  <div className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[var(--color-primary)] h-full rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{Math.round(uploadProgress)}%</p>
                </div>
              ) : rawText ? (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold text-sm">PDF extracted successfully!</span>
                  </div>
                  <textarea
                    rows="10"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:border-[var(--color-primary)] outline-none font-mono leading-relaxed"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm"
                    >
                      Next: Job Context <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-14 transition-colors cursor-pointer text-center relative ${
                    isDragging
                      ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]'
                      : 'border-gray-300 hover:border-[var(--color-primary)] hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700 mb-1">Drag & drop your PDF resume here</p>
                  <p className="text-xs text-gray-500">or click to browse • Maximum 10MB</p>
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* ═══════════════ STEP 2: JOB CONTEXT ═══════════════ */}
      {step === 2 && (
        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10 print:hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-geist text-gray-900 mb-2">Target Job Context</h2>
            <p className="text-gray-500">Tell us about the role you're applying for. The AI will tailor your resume to match.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Target Position</label>
                <input
                  type="text"
                  value={targetPosition}
                  onChange={(e) => setTargetPosition(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-[var(--color-primary)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-[var(--color-primary)] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Job Description</label>
              <textarea
                rows="10"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here. The more detail you provide, the better the AI can tailor your resume and calculate ATS compatibility..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:border-[var(--color-primary)] outline-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-semibold text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm disabled:opacity-60"
              >
                {isOptimizing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Optimizing with AI...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Optimize Resume</>
                )}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ═══════════════ STEP 3: ATS REVIEW + EDITOR ═══════════════ */}
      {step === 3 && data && (
        <div className="flex-1 flex overflow-hidden print:hidden">

          {/* Left Panel — Editor */}
          <div className="w-[420px] flex-shrink-0 flex flex-col border-r border-[var(--color-surface-dim)] bg-white overflow-y-auto">
            <div className="p-5 space-y-8 pb-32">

              {/* Intro */}
              <section>
                <SectionHeader icon={User} title="Professional Intro" />
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                    <input type="text" value={data.intro?.name || ''} onChange={(e) => setData({ ...data, intro: { ...data.intro, name: e.target.value } })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Professional Title</label>
                    <input type="text" value={data.intro?.title || ''} onChange={(e) => setData({ ...data, intro: { ...data.intro, title: e.target.value } })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Summary</label>
                    <textarea rows="3" value={data.intro?.summary || ''} onChange={(e) => setData({ ...data, intro: { ...data.intro, summary: e.target.value } })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:border-[var(--color-primary)] outline-none" />
                  </div>
                </div>
              </section>

              {/* Experience */}
              <section>
                <SectionHeader icon={Briefcase} title="Experience" sectionKey="experience" />
                <div className="space-y-3">
                  {(data.experience || []).map((exp, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-md p-3 bg-gray-50 relative group">
                      <button onClick={() => { const arr = [...data.experience]; arr.splice(idx, 1); setData({ ...data, experience: arr }); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      <input placeholder="Role" value={exp.role || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx] = { ...arr[idx], role: e.target.value }; setData({ ...data, experience: arr }); }} className="font-semibold text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <input placeholder="Company" value={exp.company || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx] = { ...arr[idx], company: e.target.value }; setData({ ...data, experience: arr }); }} className="text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <input placeholder="Duration" value={exp.years || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx] = { ...arr[idx], years: e.target.value }; setData({ ...data, experience: arr }); }} className="text-xs text-gray-500 w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <textarea placeholder="Description" rows="2" value={exp.desc || ''} onChange={(e) => { const arr = [...data.experience]; arr[idx] = { ...arr[idx], desc: e.target.value }; setData({ ...data, experience: arr }); }} className="text-sm w-full outline-none bg-transparent resize-none border-b border-dashed border-gray-300 focus:border-[var(--color-primary)]" />
                    </div>
                  ))}
                  <button onClick={() => setData({ ...data, experience: [...(data.experience || []), { id: Date.now(), role: '', company: '', years: '', desc: '' }] })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>
              </section>

              {/* Education */}
              <section>
                <SectionHeader icon={GraduationCap} title="Education" sectionKey="education" />
                <div className="space-y-3">
                  {(data.education || []).map((edu, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-md p-3 bg-gray-50 relative group">
                      <button onClick={() => { const arr = [...data.education]; arr.splice(idx, 1); setData({ ...data, education: arr }); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      <input placeholder="Degree" value={edu.degree || ''} onChange={(e) => { const arr = [...data.education]; arr[idx] = { ...arr[idx], degree: e.target.value }; setData({ ...data, education: arr }); }} className="font-semibold text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <input placeholder="School" value={edu.school || ''} onChange={(e) => { const arr = [...data.education]; arr[idx] = { ...arr[idx], school: e.target.value }; setData({ ...data, education: arr }); }} className="text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <input placeholder="Years" value={edu.years || ''} onChange={(e) => { const arr = [...data.education]; arr[idx] = { ...arr[idx], years: e.target.value }; setData({ ...data, education: arr }); }} className="text-xs text-gray-500 w-full outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    </div>
                  ))}
                  <button onClick={() => setData({ ...data, education: [...(data.education || []), { id: Date.now(), degree: '', school: '', years: '' }] })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </div>
              </section>

              {/* Skills */}
              <section>
                <SectionHeader icon={Code} title="Skills" sectionKey="skills" />
                <textarea
                  placeholder="Comma separated skills"
                  rows="3"
                  value={(data.skills || []).join(', ')}
                  onChange={(e) => setData({ ...data, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:border-[var(--color-primary)] outline-none"
                />
              </section>

              {/* Projects */}
              <section>
                <SectionHeader icon={LayoutTemplate} title="Projects" sectionKey="projects" />
                <div className="space-y-3">
                  {(data.projects || []).map((proj, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-md p-3 bg-gray-50 relative group">
                      <button onClick={() => { const arr = [...data.projects]; arr.splice(idx, 1); setData({ ...data, projects: arr }); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      <input placeholder="Project Title" value={proj.title || ''} onChange={(e) => { const arr = [...data.projects]; arr[idx] = { ...arr[idx], title: e.target.value }; setData({ ...data, projects: arr }); }} className="font-semibold text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <textarea placeholder="Description" rows="2" value={proj.desc || ''} onChange={(e) => { const arr = [...data.projects]; arr[idx] = { ...arr[idx], desc: e.target.value }; setData({ ...data, projects: arr }); }} className="text-sm w-full outline-none mb-1.5 bg-transparent resize-none border-b border-dashed border-gray-300 focus:border-[var(--color-primary)]" />
                      <input placeholder="Technologies (comma separated)" value={(proj.tech || []).join(', ')} onChange={(e) => { const arr = [...data.projects]; arr[idx] = { ...arr[idx], tech: e.target.value.split(',').map(s => s.trim()) }; setData({ ...data, projects: arr }); }} className="text-xs text-gray-500 w-full outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    </div>
                  ))}
                  <button onClick={() => setData({ ...data, projects: [...(data.projects || []), { id: Date.now(), title: '', desc: '', tech: [] }] })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <SectionHeader icon={Trophy} title="Certifications" sectionKey="certifications" />
                <div className="space-y-3">
                  {(data.certifications || []).map((cert, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-md p-3 bg-gray-50 relative group">
                      <button onClick={() => { const arr = [...data.certifications]; arr.splice(idx, 1); setData({ ...data, certifications: arr }); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      <input placeholder="Certification Title" value={cert.title || ''} onChange={(e) => { const arr = [...data.certifications]; arr[idx] = { ...arr[idx], title: e.target.value }; setData({ ...data, certifications: arr }); }} className="font-semibold text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <input placeholder="Issuer" value={cert.issuer || ''} onChange={(e) => { const arr = [...data.certifications]; arr[idx] = { ...arr[idx], issuer: e.target.value }; setData({ ...data, certifications: arr }); }} className="text-sm w-full outline-none mb-1.5 bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                      <input placeholder="Year" value={cert.year || ''} onChange={(e) => { const arr = [...data.certifications]; arr[idx] = { ...arr[idx], year: e.target.value }; setData({ ...data, certifications: arr }); }} className="text-xs text-gray-500 w-full outline-none bg-transparent border-b border-dashed border-gray-300 focus:border-[var(--color-primary)] pb-1" />
                    </div>
                  ))}
                  <button onClick={() => setData({ ...data, certifications: [...(data.certifications || []), { id: Date.now(), title: '', issuer: '', year: '' }] })} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-md text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex justify-center items-center gap-1 transition">
                    <Plus className="w-4 h-4" /> Add Certification
                  </button>
                </div>
              </section>

              {/* Contact */}
              <section>
                <SectionHeader icon={Mail} title="Contact Info" />
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                    <input type="email" value={data.contact?.email || ''} onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">LinkedIn URL</label>
                    <input type="text" value={data.contact?.linkedin || ''} onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">GitHub URL</label>
                    <input type="text" value={data.contact?.github || ''} onChange={(e) => setData({ ...data, contact: { ...data.contact, github: e.target.value } })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-[var(--color-primary)] outline-none" />
                  </div>
                </div>
              </section>

              {/* Next Step Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setStep(4)}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm"
                >
                  Next: Choose Template <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel — ATS Analysis Sidebar */}
          <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
            {atsAnalysis && (
              <div className="max-w-md mx-auto space-y-5">

                {/* ATS Score Gauge */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">ATS Compatibility Score</h3>
                  <div className="relative w-36 h-36 mx-auto mb-4">
                    <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                      <circle
                        cx="60" cy="60" r="52" fill="none"
                        stroke={getScoreColor(atsAnalysis.score).ring}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${(atsAnalysis.score / 100) * 327} 327`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">{atsAnalysis.score}</span>
                      <span className="text-xs text-gray-500">/ 100</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getScoreColor(atsAnalysis.score).bg} ${getScoreColor(atsAnalysis.score).text}`}>
                      {getScoreColor(atsAnalysis.score).label}
                    </span>
                    <button
                      onClick={handleReoptimize}
                      disabled={isReoptimizing}
                      className="mt-1 flex items-center justify-center gap-2 text-sm bg-indigo-50 text-[#1f108e] hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-60"
                    >
                      {isReoptimizing ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Recalculating...</>
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Recalculate Score</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Matching Keywords */}
                {atsAnalysis.matching_keywords?.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h4 className="text-sm font-bold text-emerald-700 flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Matching Keywords
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {atsAnalysis.matching_keywords.map((kw, i) => (
                        <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-200 font-medium">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords */}
                {atsAnalysis.missing_keywords?.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h4 className="text-sm font-bold text-amber-700 flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4" /> Missing Keywords
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">Add these to your resume if you have the experience:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {atsAnalysis.missing_keywords.map((kw, i) => (
                        <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-200 font-medium">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {atsAnalysis.suggestions?.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h4 className="text-sm font-bold text-[#1f108e] flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4" /> Suggestions
                    </h4>
                    <ul className="space-y-2">
                      {atsAnalysis.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-[var(--color-primary)] font-bold mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 4: TEMPLATE + DOWNLOAD ═══════════════ */}
      {step === 4 && data && (
        <>
          {/* Controls — hidden in print */}
          <div className="border-b border-gray-200 bg-white px-6 py-3 flex items-center justify-between print:hidden">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-semibold text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Editor
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setSelectedTemplate('classic')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${selectedTemplate === 'classic' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  ATS Classic
                </button>
                <button
                  onClick={() => setSelectedTemplate('modern')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${selectedTemplate === 'modern' ? 'bg-white shadow text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Modern Tech
                </button>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[var(--color-secondary)] transition shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 bg-gray-100 flex items-start justify-center py-8 overflow-auto print:bg-white print:p-0 print:overflow-visible">
            <div className="shadow-2xl print:shadow-none">
              {selectedTemplate === 'classic'
                ? <ATSClassicTemplate data={data} />
                : <ModernTechTemplate data={data} />
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}
