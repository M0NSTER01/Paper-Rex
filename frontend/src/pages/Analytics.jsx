import { useState } from 'react';
import { Eye, Users, MapPin, Copy, ExternalLink, BarChart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Analytics() {
  const [copied, setCopied] = useState(false);
  const portfolioLink = "https://secondlife.app/p/jane-doe";

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col">
      <header className="py-4 px-8 border-b border-[var(--color-surface-dim)] bg-white flex justify-between items-center">
        <h1 className="text-xl font-bold font-geist text-[var(--color-primary)]">Analytics</h1>
        <Link to="/editor" className="text-sm font-semibold text-gray-600 hover:text-[var(--color-primary)]">Back to Editor</Link>
      </header>

      <main className="flex-grow p-8 max-w-6xl mx-auto w-full">
        
        {/* Shareable Link Section */}
        <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-dim)] shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-geist mb-1">Your Public Portfolio is Live!</h2>
            <p className="text-sm text-gray-500">Share this link with recruiters or on your social profiles.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="bg-gray-100 px-4 py-2 rounded-md border border-gray-200 text-sm font-mono flex-grow md:w-64 overflow-hidden text-ellipsis whitespace-nowrap">
              {portfolioLink}
            </div>
            <button 
              onClick={handleCopy}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-600"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
            <Link 
              to="/portfolio/jane-doe"
              className="p-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] transition"
              title="View Portfolio"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Analytics Grid */}
        <h2 className="text-xl font-bold font-geist mb-4">Portfolio Visit Insights</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-dim)] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Total Views</p>
                <h3 className="text-3xl font-bold">1,248</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-green-600 font-semibold flex items-center">
              <span>+12% from last week</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-dim)] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Unique Visitors</p>
                <h3 className="text-3xl font-bold">892</h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-green-600 font-semibold flex items-center">
              <span>+8% from last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-dim)] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Avg. Time on Page</p>
                <h3 className="text-3xl font-bold">2m 14s</h3>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <BarChart className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-gray-500 font-semibold flex items-center">
              <span>Steady engagement</span>
            </div>
          </div>
        </div>

        {/* Charts / Locations Mock */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-dim)] shadow-sm">
            <h3 className="text-md font-bold font-geist mb-4">Traffic over 30 Days</h3>
            <div className="h-48 flex items-end justify-between gap-2 px-2 border-b border-l border-gray-200 pb-2 pl-2">
              {[40, 60, 30, 80, 50, 90, 70, 110, 85, 120].map((h, i) => (
                <div key={i} className="w-full bg-[var(--color-primary)] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[var(--color-surface-dim)] shadow-sm">
            <h3 className="text-md font-bold font-geist mb-4">Top Locations</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> San Francisco, CA</div>
                <span className="font-semibold">34%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> New York, NY</div>
                <span className="font-semibold">22%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> London, UK</div>
                <span className="font-semibold">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Remote / Other</div>
                <span className="font-semibold">29%</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
