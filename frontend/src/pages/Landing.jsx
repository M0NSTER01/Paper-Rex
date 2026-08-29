import { Link } from 'react-router-dom';
import { FileText, Zap, BarChart3 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col">
      <header className="py-6 px-8 flex justify-between items-center border-b border-[var(--color-surface-dim)]">
        <h1 className="text-2xl font-bold font-geist text-[var(--color-primary)]">SecondLife Resume</h1>
        <Link to="/auth" className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-md font-semibold hover:bg-[var(--color-secondary)] transition">
          Login / Sign Up
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center text-center px-4 pt-20">
        <h2 className="text-5xl md:text-6xl font-bold font-geist text-[var(--color-on-surface)] max-w-4xl tracking-tight leading-tight mb-6">
          Escape the PDF Prison: <br className="hidden md:block"/>
          <span className="text-[var(--color-primary)]">Give Your Resume a Second Life.</span>
        </h2>
        
        <p className="text-xl text-[var(--color-on-surface)] opacity-80 mb-10 max-w-2xl font-inter">
          Transform your static PDF resume into an interactive, publishable web portfolio in seconds using the power of AI.
        </p>

        <Link to="/auth" className="px-8 py-4 bg-[var(--color-primary)] text-white text-lg rounded-md font-semibold shadow-lg hover:shadow-xl hover:bg-[var(--color-secondary)] transition-all">
          Get Started for Free
        </Link>

        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full px-4 mb-20">
          <div className="bg-white p-8 rounded-xl border border-[var(--color-surface-dim)] shadow-sm text-left">
            <Zap className="w-10 h-10 text-[var(--color-secondary)] mb-4" />
            <h3 className="text-xl font-bold font-geist mb-2">AI Extraction</h3>
            <p className="text-[var(--color-on-surface)] opacity-70">Our intelligent AI parses your PDF and structures your experience perfectly, saving you hours of data entry.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-[var(--color-surface-dim)] shadow-sm text-left">
            <FileText className="w-10 h-10 text-[var(--color-secondary)] mb-4" />
            <h3 className="text-xl font-bold font-geist mb-2">Instant Web Portfolio</h3>
            <p className="text-[var(--color-on-surface)] opacity-70">Generate a beautiful, responsive online portfolio that you can share with recruiters instantly.</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-[var(--color-surface-dim)] shadow-sm text-left">
            <BarChart3 className="w-10 h-10 text-[var(--color-secondary)] mb-4" />
            <h3 className="text-xl font-bold font-geist mb-2">Rich Analytics</h3>
            <p className="text-[var(--color-on-surface)] opacity-70">Track views, unique visitors, and see exactly when and where your portfolio is being viewed.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
