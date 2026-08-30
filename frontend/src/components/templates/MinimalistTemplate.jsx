
import React from 'react';

export default function MinimalistTemplate({ data }) {
    return (
        <div className="theme-minimalist bg-surface-bright text-on-surface w-full h-full overflow-x-hidden overflow-y-auto antialiased relative" style={{ transform: 'translateZ(0)' }}>
            
{/*  Executive Sticky Navigation  */}
<header className="sticky top-0 left-0 w-full z-50 bg-surface-bright/95 backdrop-blur-xl border-b border-surface-variant transition-all duration-300 py-4 px-6 md:px-12 flex justify-between items-center">
<div className="flex items-center gap-8">
<span className="text-xl font-serif font-bold text-primary tracking-wide">RM.</span>
<nav className="hidden md:flex gap-8 items-center">
<a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#about">About</a>
<a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#experience">Experience</a>
<a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#projects">Projects</a>
</nav>
</div>
<div className="flex items-center gap-6">
{/*  Integrated Recruiter Lens Toggle  */}
<div className="hidden lg:flex items-center bg-surface-container-low rounded-full p-1 border border-surface-variant">
<button className="lens-btn px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide lens-active transition-colors uppercase">HR View</button>
<button className="lens-btn px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-on-surface-variant hover:text-primary transition-colors uppercase">EM View</button>
<button className="lens-btn px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-on-surface-variant hover:text-primary transition-colors uppercase">TL;DR</button>
</div>
{/*  Integrated AI Widget  */}
<button className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm font-medium">
<span className="material-symbols-outlined text-lg" >smart_toy</span>
            Ask AI
        </button>
<button className="md:hidden text-primary">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</header>
<main className="flex-1 w-full flex flex-col items-center">
{/*  Hero Section  */}
<section className="w-full max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center space-y-12 relative" id="about">
<div className="absolute inset-0 bg-gradient-to-b from-surface-container-low to-transparent -z-10 opacity-50"></div>
<div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl relative mb-4">
<img alt="Alex Mercer" className="object-cover w-full h-full absolute inset-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3dLfyfIKRfBwy8L3iQifwR8iIjqQ4o0XsZ7DV9xAJbqDnBi2uHduEFNdxDn_8NAFX7mib56sCi5RvwBbbTQltuNI4mEHD6dmlyt4pVHU_0z_gFPik3MBOMeaX2WWYJvRlayEHoTueA1J9cWByTXJOAHS9eLOIsoC_PPYvBf1SEULUmtR7fo4XxIpD1hLI_q_PIHLOjLwg8RMnlNPym8KLE_2e10nt0mQLLxjSTm39-HFFVEXSUlADIA" />
</div>
<div className="space-y-6 max-w-3xl">
<h1 className="text-5xl md:text-7xl font-serif font-bold text-on-surface tracking-tight">{data.intro.name}</h1>
<h2 className="text-xl md:text-2xl font-body font-light text-primary tracking-widest uppercase">{data.intro.title}</h2>
<p className="text-lg md:text-xl font-body font-light text-on-surface-variant leading-relaxed max-w-2xl mx-auto pt-4">{data.intro.summary}</p>
</div>
<div className="flex gap-6 pt-8 border-t border-surface-variant w-32 justify-center">
<a className="text-on-surface hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-2xl">link</span></a>
<a className="text-on-surface hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-2xl">code</span></a>
<a className="text-on-surface hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-2xl">mail</span></a>
</div>
</section>
{/*  Experience Timeline  */}
<section className="w-full bg-surface py-32 px-6" id="experience">
<div className="max-w-3xl mx-auto">
<div className="text-center mb-20">
<h3 className="text-3xl font-serif font-bold text-on-surface">Professional Journey</h3>
<div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
</div>
<div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-surface-variant">
{/*  Role 1  */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-bright bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
<span className="material-symbols-outlined text-on-primary text-sm">work</span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-surface-bright p-8 rounded-2xl shadow-sm border border-surface-variant hover:shadow-md hover:border-primary/30 transition-all text-left">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
<h4 className="text-xl font-serif font-bold text-on-surface">Lead Developer</h4>
<span className="text-xs font-bold uppercase tracking-wider text-primary">2021 - Present</span>
</div>
<p className="text-sm font-medium text-on-surface-variant mb-4">TechNova Solutions</p>
<p className="text-base font-light text-on-surface-variant mb-6 leading-relaxed">
                            Architected and delivered a cloud-native microservices platform that increased system throughput by 40%. Mentored a team of 5 junior developers, improving code review turnaround times.
                        </p>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-medium">React</span>
<span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-medium">Node.js</span>
<span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-medium">AWS</span>
</div>
</div>
</div>
{/*  Role 2  */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-bright bg-surface-variant text-on-surface shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
<span className="material-symbols-outlined text-sm">work_outline</span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-surface-bright p-8 rounded-2xl shadow-sm border border-surface-variant hover:shadow-md hover:border-primary/30 transition-all text-left">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
<h4 className="text-xl font-serif font-bold text-on-surface">Frontend Engineer</h4>
<span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">2018 - 2021</span>
</div>
<p className="text-sm font-medium text-on-surface-variant mb-4">DesignSystem Inc.</p>
<p className="text-base font-light text-on-surface-variant leading-relaxed">
                            Spearheaded the migration of legacy jQuery applications to modern React architectures, establishing robust design system components.
                        </p>
</div>
</div>
</div>
</div>
</section>
{/*  Project Highlights (Minimalist Image Focus)  */}
<section className="w-full py-32 px-6" id="projects">
<div className="max-w-5xl mx-auto">
<div className="text-center mb-20">
<h3 className="text-3xl font-serif font-bold text-on-surface">Selected Works</h3>
<div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
</div>
<div className="space-y-32">
{/*  Project 1  */}
<div className="flex flex-col items-center gap-8">
<div className="w-full aspect-[16/9] bg-surface-container-high rounded-sm overflow-hidden shadow-lg border border-surface-variant relative group">
<div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
<span className="text-on-surface-variant font-serif italic text-lg">[ High-Resolution Project Image Placeholder ]</span>
</div>
</div>
<div className="text-center max-w-2xl">
<h4 className="text-2xl font-serif font-bold text-on-surface mb-4">Enterprise Dashboard Redesign</h4>
<p className="text-on-surface-variant font-light text-lg">A comprehensive overhaul of core business intelligence tools, emphasizing data clarity and user workflow efficiency.</p>
</div>
</div>
</div>
</div>
</section>
</main>
<footer className="w-full py-16 px-6 md:px-12 bg-surface flex flex-col md:flex-row justify-between items-center border-t border-surface-variant">
<div className="flex flex-col md:flex-row items-center gap-6">
<span className="text-lg font-serif font-bold text-primary">RM.</span>
<p className="text-sm font-light text-on-surface-variant">© 2024 ResumeMagic AI.</p>
</div>
<div className="flex gap-6 mt-6 md:mt-0">
<button className="text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">download</span> PDF
        </button>
<button className="text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">person_add</span> Contact
        </button>
</div>
</footer>


        </div>
    );
}
