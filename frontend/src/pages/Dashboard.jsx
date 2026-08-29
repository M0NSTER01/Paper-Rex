import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const simulateExtraction = () => {
    setIsExtracting(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => navigate('/editor'), 500);
      } else {
        setProgress(currentProgress);
      }
    }, 400);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateExtraction();
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateExtraction();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col">
      <header className="py-4 px-8 border-b border-[var(--color-surface-dim)] bg-white flex justify-between items-center">
        <h1 className="text-xl font-bold font-geist text-[var(--color-primary)]">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-surface-dim)] flex items-center justify-center">
            <span className="text-sm font-bold text-[var(--color-primary)]">U</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-[var(--color-surface-dim)] p-10 text-center">
          
          {!isExtracting ? (
            <>
              <h2 className="text-2xl font-bold font-geist mb-2">Upload Your Resume</h2>
              <p className="text-gray-500 mb-8">We accept PDF files up to 10MB.</p>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 transition-colors cursor-pointer relative
                  ${isDragging ? 'border-[var(--color-primary)] bg-[var(--color-surface-container)]' : 'border-gray-300 hover:border-[var(--color-primary)]'}`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="font-semibold text-gray-700">Drag & drop your PDF here</p>
                <p className="text-sm text-gray-500 mt-2">or click to browse</p>
              </div>
            </>
          ) : (
            <div className="py-12">
              <Loader2 className="w-12 h-12 text-[var(--color-primary)] mx-auto animate-spin mb-6" />
              <h2 className="text-2xl font-bold font-geist mb-2">Extracting data with AI...</h2>
              <p className="text-gray-500 mb-8">Parsing experience, skills, and education.</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                <div 
                  className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 text-right">{Math.round(Math.min(progress, 100))}%</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
