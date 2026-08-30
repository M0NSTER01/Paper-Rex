
import React from 'react';

export default function MidnightDeveloperTemplate({ data }) {
    return (
        <div className="theme-midnight bg-surface-bright text-on-surface w-full h-full overflow-x-hidden overflow-y-auto antialiased relative" style={{ transform: 'translateZ(0)' }}>
            
{/*  TopNavBar  */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-sm hidden md:flex">
<div className="flex items-center gap-6">
<span className="text-headline-md font-headline-md font-bold text-electric-violet tracking-tight">Midnight Developer</span>
<nav className="flex gap-6 items-center">
<a className="text-electric-violet font-bold border-b-2 border-electric-violet pb-1 text-label-md font-label-md" href="#">Home</a>
<a className="text-slate-400 hover:text-electric-violet transition-colors duration-200 text-label-md font-label-md" href="#">Dashboard</a>
<a className="text-slate-400 hover:text-electric-violet transition-colors duration-200 text-label-md font-label-md" href="#">Analytics</a>
</nav>
</div>
<div className="flex items-center gap-4">
{/*  Recruiter Lenses Toggle  */}
<div className="flex items-center gap-2 mr-4 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
<span className="text-xs font-mono text-slate-400">Recruiter Lens:</span>
<button aria-pressed="false" className="w-8 h-4 bg-slate-600 rounded-full relative focus:outline-none focus:ring-2 focus:ring-electric-violet transition-colors" onclick="this.classList.toggle('bg-electric-violet'); this.classList.toggle('bg-slate-600'); this.querySelector('div').classList.toggle('translate-x-4')">
<div className="w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 shadow"></div>
</button>
</div>
<button className="bg-electric-violet hover:bg-violet-600 text-white px-4 py-2 rounded-md font-label-md text-label-md transition-colors shadow-sm">Publish</button>
<button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-electric-violet rounded-full transition-colors" data-icon="account_circle">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>
{/*  Mobile Header Fallback  */}
<header className="flex md:hidden sticky top-0 z-50 w-full h-16 bg-slate-900 items-center justify-between px-margin-mobile border-b border-slate-800">
<span className="text-headline-lg-mobile font-headline-lg-mobile font-bold text-electric-violet">Midnight</span>
<button className="p-2 text-slate-400">
<span className="material-symbols-outlined">menu</span>
</button>
</header>
<div className="flex flex-1 pt-16 h-full">
{/*  SideNavBar  */}
<aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16 py-gutter px-4 w-64 bg-slate-900 border-r border-slate-800 overflow-y-auto">
<div className="mb-8 px-2">
<h2 className="text-headline-md font-headline-md text-electric-violet mb-1">Editor Sections</h2>
<p className="text-slate-400 text-mono font-mono">75% Complete</p>
<div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
<div className="bg-electric-violet h-full w-3/4"></div>
</div>
</div>
<nav className="flex-1 flex flex-col gap-2">
<a className="flex items-center gap-3 px-3 py-2 bg-violet-900/30 text-electric-violet rounded-lg font-bold border border-violet-800/50" href="#">
<span className="material-symbols-outlined" >person</span>
<span className="text-label-md font-label-md">Personal Info</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined">work</span>
<span className="text-label-md font-label-md">Experience</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined">school</span>
<span className="text-label-md font-label-md">Education</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="text-label-md font-label-md">Skills</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors" href="#">
<span className="material-symbols-outlined">folder_special</span>
<span className="text-label-md font-label-md">Projects</span>
</a>
</nav>
<button className="mt-4 mb-8 w-full border border-dashed border-slate-600 text-slate-400 hover:text-electric-violet hover:border-electric-violet py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">add</span> Add New Section
            </button>
<div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-2">
<a className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-300 transition-colors" href="#">
<span className="material-symbols-outlined text-sm">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-300 transition-colors" href="#">
<span className="material-symbols-outlined text-sm">help</span>
<span className="text-label-md font-label-md">Support</span>
</a>
</div>
</aside>
{/*  Main Content Area  */}
<main className="flex-1 w-full bg-slate-950 p-margin-mobile md:p-margin-desktop lg:p-gutter overflow-y-auto">
{/*  Hero Section  */}
<section className="mb-12 relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-8">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-9xl">terminal</span>
</div>
<div className="max-w-2xl relative z-10">
<h1 className="text-display font-display text-white mb-4">
                        &gt; hello_world<span className="animate-pulse text-electric-violet">_</span>
</h1>
<p className="text-body-lg font-body-lg text-slate-400 mb-6">
                        Translating complex problems into elegant, scalable solutions. Full-stack developer with a focus on high-performance systems and clean architecture.
                    </p>
<div className="flex gap-4">
<button className="bg-electric-violet text-white px-6 py-2.5 rounded font-label-md text-label-md shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all">
                            View Work
                        </button>
<button className="border border-slate-700 text-slate-300 hover:bg-slate-800 px-6 py-2.5 rounded font-label-md text-label-md transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">download</span> Resume
                        </button>
</div>
</div>
</section>
{/*  Experience - Terminal Cards  */}
<section className="mb-12">
<h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
<span className="text-electric-violet">~/</span>experience
                </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Card 1  */}
<article className="terminal-card rounded-lg overflow-hidden flex flex-col group hover:border-slate-600 transition-colors">
<header className="terminal-header px-4 py-2 flex items-center justify-between">
<div className="flex gap-2">
<div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
<div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
<div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
</div>
<span className="text-xs font-mono text-slate-500">senior_engineer.sh</span>
</header>
<div className="p-6 flex-1">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-lg font-mono text-electric-violet font-semibold">TechNova Inc.</h3>
<p className="text-sm font-mono text-slate-400">{data.intro.title}</p>
</div>
<span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">2021 - Present</span>
</div>
<ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
<li>&gt; Led migration to microservices architecture.</li>
<li>&gt; Reduced latency by 40% using Redis caching.</li>
<li>&gt; Mentored team of 5 junior developers.</li>
</ul>
</div>
</article>
{/*  Card 2  */}
<article className="terminal-card rounded-lg overflow-hidden flex flex-col group hover:border-slate-600 transition-colors">
<header className="terminal-header px-4 py-2 flex items-center justify-between">
<div className="flex gap-2">
<div className="w-3 h-3 rounded-full bg-slate-600"></div>
<div className="w-3 h-3 rounded-full bg-slate-600"></div>
<div className="w-3 h-3 rounded-full bg-slate-600"></div>
</div>
<span className="text-xs font-mono text-slate-500">dev_role.sh</span>
</header>
<div className="p-6 flex-1">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-lg font-mono text-white font-semibold group-hover:text-electric-violet transition-colors">Quantum Logic</h3>
<p className="text-sm font-mono text-slate-400">Backend Developer</p>
</div>
<span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">2018 - 2021</span>
</div>
<ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
<li>&gt; Developed RESTful APIs for core product.</li>
<li>&gt; Implemented OAuth2 authentication flow.</li>
<li>&gt; Optimized complex SQL queries.</li>
</ul>
</div>
</article>
</div>
</section>
{/*  Skills - Code Blocks  */}
<section>
<h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
<span className="text-electric-violet">~/</span>skills
                </h2>
<div className="bg-slate-900 border border-slate-800 rounded-lg p-6 font-mono text-sm overflow-x-auto">
<div className="flex">
<div className="text-slate-600 pr-4 text-right select-none border-r border-slate-800 mr-4">
                            1<br />2<br />3<br />4<br />5<br />6
                        </div>
<div className="text-slate-300">
<span className="text-rose-400">const</span> skills = &#123;<br />
                            &nbsp;&nbsp;<span className="text-blue-400">languages</span>: [<span className="text-green-400">'JavaScript'</span>, <span className="text-green-400">'TypeScript'</span>, <span className="text-green-400">'Python'</span>, <span className="text-green-400">'Go'</span>],<br />
                            &nbsp;&nbsp;<span className="text-blue-400">frontend</span>: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Next.js'</span>, <span className="text-green-400">'Tailwind CSS'</span>],<br />
                            &nbsp;&nbsp;<span className="text-blue-400">backend</span>: [<span className="text-green-400">'Node.js'</span>, <span className="text-green-400">'Express'</span>, <span className="text-green-400">'PostgreSQL'</span>, <span className="text-green-400">'Redis'</span>],<br />
                            &nbsp;&nbsp;<span className="text-blue-400">tools</span>: [<span className="text-green-400">'Docker'</span>, <span className="text-green-400">'Git'</span>, <span className="text-green-400">'AWS'</span>, <span className="text-green-400">'CI/CD'</span>]<br />
                            &#125;;
                        </div>
</div>
</div>
</section>
</main>
</div>
{/*  Footer  */}
<footer className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center bg-slate-950 border-t border-slate-900 z-10 relative">
<div className="text-label-md font-label-md font-bold text-electric-violet mb-4 md:mb-0">
            Midnight Developer
        </div>
<div className="flex gap-6 mb-4 md:mb-0">
<a className="text-label-md font-label-md text-slate-500 hover:text-electric-violet transition-colors" href="#">Privacy Policy</a>
<a className="text-label-md font-label-md text-slate-500 hover:text-electric-violet transition-colors" href="#">Terms of Service</a>
<a className="text-label-md font-label-md text-slate-500 hover:text-electric-violet transition-colors" href="#">Contact Us</a>
</div>
<div className="text-body-md font-body-md text-slate-500 text-sm">
            © 2024 ResumeMagic AI. All rights reserved.
        </div>
</footer>

        </div>
    );
}
