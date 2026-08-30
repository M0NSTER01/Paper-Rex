
import React from 'react';

export default function DataDrivenTemplate({ data }) {
    return (
        <div className="theme-data-driven bg-surface-bright text-on-surface w-full h-full overflow-x-hidden overflow-y-auto antialiased relative" style={{ transform: 'translateZ(0)' }}>
            
{/*  Sidebar Navigation  */}
<aside className="hidden md:flex w-72 bg-surface-container-low border-r border-outline flex-col fixed h-full left-0 top-0 overflow-y-auto z-40">
<div className="p-8 border-b border-outline">
<span className="text-headline-md font-headline-md font-bold text-primary">ResumeMagic</span>
</div>
<nav className="flex-1 px-4 py-8 space-y-2">
<a className="block px-4 py-3 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant hover:text-primary transition-colors" href="#about">About</a>
<a className="block px-4 py-3 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant hover:text-primary transition-colors" href="#experience">Experience</a>
<a className="block px-4 py-3 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant hover:text-primary transition-colors" href="#projects">Projects</a>
<a className="block px-4 py-3 rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant hover:text-primary transition-colors" href="#skills">Skills</a>
</nav>
<div className="px-6 py-6 border-t border-outline">
<h4 className="text-label-md font-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Recruiter Lenses</h4>
<div className="flex flex-col gap-2 bg-surface-container p-1 rounded-xl border border-outline-variant">
<button className="lens-btn w-full text-left px-4 py-2 rounded-lg text-label-md font-label-md lens-active transition-colors">HR View</button>
<button className="lens-btn w-full text-left px-4 py-2 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors">EM View</button>
<button className="lens-btn w-full text-left px-4 py-2 rounded-lg text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors">TL;DR</button>
</div>
</div>
<div className="p-6 border-t border-outline bg-surface-container mt-auto">
<button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl shadow-md hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center gap-2 group">
<span className="material-symbols-outlined group-hover:rotate-12 transition-transform" >smart_toy</span>
<span className="text-label-md font-label-md">Ask My Portfolio</span>
</button>
</div>
</aside>
{/*  Mobile Header  */}
<header className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface border-b border-outline shadow-sm">
<span className="text-headline-md font-headline-md font-bold text-primary">ResumeMagic</span>
<button className="text-primary">
<span className="material-symbols-outlined" >menu</span>
</button>
</header>
{/*  Main Content  */}
<main className="flex-1 md:ml-72 w-full pt-20 md:pt-0 pb-32">
<div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-16 space-y-24">
{/*  Hero Section  */}
<section className="bg-surface-container-lowest border border-outline rounded-2xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8" id="about">
<div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-variant shadow-md flex-shrink-0 relative">
<img className="object-cover w-full h-full absolute inset-0" data-alt="A professional headshot of a confident software engineer in a modern, well-lit office setting. The lighting is soft and bright, casting subtle shadows to emphasize a modern light-mode aesthetic. The color palette is neutral with soft indigo accents in the background, conveying professionalism and approachability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3dLfyfIKRfBwy8L3iQifwR8iIjqQ4o0XsZ7DV9xAJbqDnBi2uHduEFNdxDn_8NAFX7mib56sCi5RvwBbbTQltuNI4mEHD6dmlyt4pVHU_0z_gFPik3MBOMeaX2WWYJvRlayEHoTueA1J9cWByTXJOAHS9eLOIsoC_PPYvBf1SEULUmtR7fo4XxIpD1hLI_q_PIHLOjLwg8RMnlNPym8KLE_2e10nt0mQLLxjSTm39-HFFVEXSUlADIA" />
</div>
<div className="flex-1 space-y-4 text-center md:text-left">
<h1 className="text-display font-display text-on-surface">{data.intro.name}</h1>
<h2 className="text-headline-lg font-headline-lg text-primary">{data.intro.title}</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">{data.intro.summary}</p>
<div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
<span className="px-3 py-1 rounded-md bg-surface-variant border border-outline-variant text-on-surface text-mono font-mono">React</span>
<span className="px-3 py-1 rounded-md bg-surface-variant border border-outline-variant text-on-surface text-mono font-mono">Node.js</span>
<span className="px-3 py-1 rounded-md bg-surface-variant border border-outline-variant text-on-surface text-mono font-mono">AWS</span>
<span className="px-3 py-1 rounded-md bg-surface-variant border border-outline-variant text-on-surface text-mono font-mono">TypeScript</span>
<span className="px-3 py-1 rounded-md bg-surface-variant border border-outline-variant text-on-surface text-mono font-mono">GraphQL</span>
</div>
<div className="flex justify-center md:justify-start gap-4 pt-4 border-t border-outline-variant mt-4">
<a className="flex items-center gap-2 text-label-md text-primary hover:text-primary-container transition-colors" href="#">
<span className="material-symbols-outlined text-sm" >link</span> Portfolio
                        </a>
<a className="flex items-center gap-2 text-label-md text-primary hover:text-primary-container transition-colors" href="#">
<span className="material-symbols-outlined text-sm" >code</span> GitHub
                        </a>
<a className="flex items-center gap-2 text-label-md text-primary hover:text-primary-container transition-colors" href="#">
<span className="material-symbols-outlined text-sm" >mail</span> Contact
                        </a>
</div>
</div>
</section>
{/*  Experience Section  */}
<section className="space-y-8" id="experience">
<div className="flex items-center gap-4 border-b border-outline pb-4">
<span className="material-symbols-outlined text-primary text-3xl" >work</span>
<h3 className="text-headline-lg font-headline-lg text-on-surface">Experience</h3>
</div>
<div className="space-y-6">
{/*  Main Role  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline hover:border-primary transition-colors flex flex-col lg:flex-row overflow-hidden shadow-sm">
<div className="flex-1 p-8">
<div className="flex justify-between items-start mb-4">
<div>
<h4 className="text-headline-md font-headline-md text-on-surface">Lead Developer</h4>
<p className="text-label-md font-label-md text-primary mt-1">TechNova Solutions</p>
</div>
<span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">2021 - Present</span>
</div>
<p className="text-body-md font-body-md text-on-surface-variant mb-6">
                                Architected and delivered a cloud-native microservices platform that significantly improved core business operations. Managed deployment pipelines and established new team standards.
                            </p>
</div>
<div className="w-full lg:w-64 bg-surface-container-low border-t lg:border-t-0 lg:border-l border-outline p-6 flex flex-row lg:flex-col justify-around gap-6">
<div className="text-center lg:text-left">
<div className="text-headline-lg text-primary font-bold">+40%</div>
<div className="text-label-md text-on-surface-variant mt-1">System Throughput</div>
</div>
<div className="text-center lg:text-left">
<div className="text-headline-lg text-secondary font-bold">5</div>
<div className="text-label-md text-on-surface-variant mt-1">Devs Mentored</div>
</div>
</div>
</div>
{/*  Previous Role  */}
<div className="bg-surface-container-lowest rounded-xl border border-outline hover:border-primary transition-colors flex flex-col lg:flex-row overflow-hidden shadow-sm">
<div className="flex-1 p-8">
<div className="flex justify-between items-start mb-4">
<div>
<h4 className="text-headline-md font-headline-md text-on-surface">Frontend Engineer</h4>
<p className="text-label-md font-label-md text-secondary mt-1">DesignSystem Inc.</p>
</div>
<span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">2018 - 2021</span>
</div>
<p className="text-body-md font-body-md text-on-surface-variant mb-6">
                                Spearheaded the migration of legacy jQuery applications to modern React architectures, improving maintainability and performance across the product suite.
                            </p>
</div>
<div className="w-full lg:w-64 bg-surface-container-low border-t lg:border-t-0 lg:border-l border-outline p-6 flex flex-row lg:flex-col justify-around gap-6">
<div className="text-center lg:text-left">
<div className="text-headline-lg text-primary font-bold">100%</div>
<div className="text-label-md text-on-surface-variant mt-1">Migration Complete</div>
</div>
<div className="text-center lg:text-left">
<div className="text-headline-lg text-secondary font-bold">-2s</div>
<div className="text-label-md text-on-surface-variant mt-1">Load Time Reduction</div>
</div>
</div>
</div>
</div>
</section>
{/*  Skills Section  */}
<section className="space-y-8" id="skills">
<div className="flex items-center gap-4 border-b border-outline pb-4">
<span className="material-symbols-outlined text-primary text-3xl" >code_blocks</span>
<h3 className="text-headline-lg font-headline-lg text-on-surface">Skills Mastery</h3>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{/*  Skill Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="text-label-md font-bold text-on-surface">React / Next.js</span>
<span className="text-mono text-primary">Advanced</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[90%] rounded-full"></div>
</div>
</div>
{/*  Skill Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="text-label-md font-bold text-on-surface">Node.js / Express</span>
<span className="text-mono text-primary">Advanced</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%] rounded-full"></div>
</div>
</div>
{/*  Skill Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="text-label-md font-bold text-on-surface">TypeScript</span>
<span className="text-mono text-primary">Proficient</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[80%] rounded-full"></div>
</div>
</div>
{/*  Skill Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="text-label-md font-bold text-on-surface">AWS / Cloud</span>
<span className="text-mono text-primary">Proficient</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[75%] rounded-full"></div>
</div>
</div>
{/*  Skill Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="text-label-md font-bold text-on-surface">UI/UX Design</span>
<span className="text-mono text-primary">Intermediate</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[60%] rounded-full"></div>
</div>
</div>
{/*  Skill Item  */}
<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="text-label-md font-bold text-on-surface">SQL / NoSQL</span>
<span className="text-mono text-primary">Advanced</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%] rounded-full"></div>
</div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="w-full py-8 border-t border-outline flex flex-col md:flex-row justify-between items-center gap-4">
<span className="text-label-md font-bold text-primary">ResumeMagic</span>
<p className="text-body-md font-body-md text-on-surface-variant">© 2024 ResumeMagic AI. All rights reserved.</p>
<div className="flex gap-4">
<a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</footer>
</div>
</main>
{/*  Fixed Action Bar  */}
<div className="fixed bottom-0 left-0 md:left-72 right-0 bg-surface-container-lowest border-t border-outline py-4 px-6 md:px-12 flex justify-center md:justify-end z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
<div className="flex gap-4">
<button className="px-6 py-2 rounded-lg border-2 border-outline text-on-surface-variant text-label-md font-label-md hover:bg-surface-variant transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm" >download</span>
                Export to PDF
            </button>
<button className="px-6 py-2 rounded-lg bg-primary text-on-primary text-label-md font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md flex items-center gap-2">
<span className="material-symbols-outlined text-sm" >person_add</span>
                Save Contact
            </button>
</div>
</div>


        </div>
    );
}
