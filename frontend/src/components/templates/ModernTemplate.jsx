
import React from 'react';

export default function ModernTemplate({ data }) {
    return (
        <div className="theme-modern bg-surface-bright text-on-surface w-full h-full overflow-x-hidden overflow-y-auto antialiased relative" style={{ transform: 'translateZ(0)' }}>
            
{/*  Header with Segmented Control  */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-sm transition-all duration-300">
<div className="flex items-center gap-4">
<span className="text-headline-md font-headline-md font-bold text-primary">ResumeMagic</span>
</div>
<nav className="hidden md:flex gap-8 items-center bg-surface-container px-6 py-2 rounded-full border border-outline-variant">
<a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors" href="#about">About</a>
<a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors" href="#experience">Experience</a>
<a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors" href="#projects">Projects</a>
<a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors" href="#skills">Skills</a>
</nav>
<div className="flex items-center gap-4">
{/*  Styled Recruiter Lens Segmented Control  */}
<div className="hidden lg:flex items-center bg-surface-variant rounded-full p-1 border border-outline-variant/50">
<button className="lens-btn px-5 py-2 rounded-full text-label-md font-label-md lens-active transition-all">HR View</button>
<button className="lens-btn px-5 py-2 rounded-full text-label-md font-label-md text-on-surface hover:text-secondary transition-all">EM View</button>
<button className="lens-btn px-5 py-2 rounded-full text-label-md font-label-md text-on-surface hover:text-secondary transition-all">TL;DR</button>
</div>
<button className="md:hidden text-primary p-2 bg-surface-container rounded-full">
<span className="material-symbols-outlined" >menu</span>
</button>
</div>
</header>
<main className="flex-1 w-full pt-20">
{/*  Split Screen Hero Section  */}
<section className="hero-split flex flex-col lg:flex-row w-full bg-surface">
<div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 lg:py-0 order-2 lg:order-1 relative overflow-hidden">
{/*  Decorative elements  */}
<div className="absolute top-20 left-10 w-64 h-64 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
<div className="absolute bottom-20 right-10 w-72 h-72 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
<div className="relative z-10 space-y-8 max-w-2xl">
<h1 className="text-display font-display text-on-surface leading-tight">
    Hi, I'm <span className="text-primary block mt-2">{data.intro.name}</span>
</h1>
<h2 className="text-headline-lg font-headline-lg text-secondary">{data.intro.title}</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant">{data.intro.summary}</p>
<div className="flex gap-4 pt-4">
<a className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">
<span className="material-symbols-outlined text-2xl" >link</span>
</a>
<a className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">
<span className="material-symbols-outlined text-2xl" >code</span>
</a>
<a className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">
<span className="material-symbols-outlined text-2xl" >mail</span>
</a>
</div>
</div>
</div>
<div className="flex-1 lg:h-auto h-[50vh] min-h-[400px] order-1 lg:order-2 relative bg-surface-container-high">
<img className="object-cover w-full h-full absolute inset-0 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" data-alt="A professional headshot of a confident software engineer in a modern, well-lit office setting. The lighting is soft and bright, casting subtle shadows to emphasize a modern light-mode aesthetic. The color palette is neutral with soft indigo accents in the background, conveying professionalism and approachability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3dLfyfIKRfBwy8L3iQifwR8iIjqQ4o0XsZ7DV9xAJbqDnBi2uHduEFNdxDn_8NAFX7mib56sCi5RvwBbbTQltuNI4mEHD6dmlyt4pVHU_0z_gFPik3MBOMeaX2WWYJvRlayEHoTueA1J9cWByTXJOAHS9eLOIsoC_PPYvBf1SEULUmtR7fo4XxIpD1hLI_q_PIHLOjLwg8RMnlNPym8KLE_2e10nt0mQLLxjSTm39-HFFVEXSUlADIA" />
<div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-l opacity-80"></div>
</div>
</section>
{/*  Bento Grid Section  */}
<section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-24 space-y-12" id="experience">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-2xl" >work</span>
<h3 className="text-headline-lg font-headline-lg text-on-surface">Experience &amp; Skills</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[250px]">
{/*  Large Feature Card  */}
<div className="bento-card md:col-span-2 xl:col-span-2 row-span-2 p-8 md:p-12 relative flex flex-col justify-between group">
<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
<div>
<div className="flex justify-between items-start mb-6">
<div>
<h4 className="text-display font-display text-on-surface text-4xl">Lead Developer</h4>
<p className="text-headline-md font-headline-md text-secondary mt-2">TechNova Solutions</p>
</div>
<span className="text-label-md font-label-md text-on-tertiary-container bg-tertiary-container px-4 py-2 rounded-xl shadow-sm">2021 - Present</span>
</div>
<p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
        Architected and delivered a cloud-native microservices platform that increased system throughput by 40%. Mentored a team of 5 junior developers, improving code review turnaround times.
    </p>
</div>
<div className="flex flex-wrap gap-3 mt-8">
<span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">React</span>
<span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">Node.js</span>
<span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">AWS</span>
<span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">Microservices</span>
</div>
</div>
{/*  Medium Card  */}
<div className="bento-card p-8 flex flex-col justify-between bg-gradient-to-br from-surface to-surface-container">
<div>
<h4 className="text-headline-md font-headline-md text-on-surface">Frontend Engineer</h4>
<p className="text-label-md font-label-md text-secondary mt-1">DesignSystem Inc.</p>
</div>
<p className="text-body-md font-body-md text-on-surface-variant my-4">
        Spearheaded the migration of legacy jQuery applications to modern React architectures, improving performance by 60%.
    </p>
<span className="text-label-md font-label-md text-outline font-medium">2018 - 2021</span>
</div>
{/*  Small Stat Card  */}
<div className="bento-card p-8 flex flex-col items-center justify-center text-center bg-primary text-on-primary relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-transparent opacity-50"></div>
<div className="relative z-10">
<span className="text-display font-display text-5xl block mb-2 group-hover:scale-110 transition-transform">99%</span>
<p className="text-label-md font-label-md text-primary-fixed">Uptime Delivered</p>
</div>
</div>
{/*  Wide Tools Card  */}
<div className="bento-card md:col-span-2 xl:col-span-1 p-8 flex flex-col justify-center bg-surface-variant">
<h4 className="text-headline-md font-headline-md text-on-surface mb-6">Core Tech Stack</h4>
<div className="flex flex-wrap gap-3">
<div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm text-primary font-bold">TS</div>
<div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm text-secondary font-bold">Re</div>
<div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm text-tertiary font-bold">Py</div>
<div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm text-primary font-bold">Go</div>
<div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shadow-sm text-secondary font-bold">Db</div>
</div>
</div>
</div>
</section>
</main>
{/*  Floating AI Widget - Branded FAB  */}
<button className="fixed bottom-32 md:bottom-24 right-6 md:right-10 w-16 h-16 bg-secondary text-on-secondary rounded-2xl shadow-xl shadow-secondary/30 hover:shadow-2xl hover:shadow-secondary/40 hover:-translate-y-1 transition-all flex items-center justify-center z-40 group">
<span className="material-symbols-outlined text-3xl" >smart_toy</span>
<span className="absolute right-20 bg-surface-container-high text-on-surface text-label-md font-label-md px-5 py-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-outline-variant">Ask My Portfolio</span>
</button>
{/*  Fixed Action Bar  */}
<div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-outline-variant py-4 px-6 md:px-12 flex justify-between items-center z-50">
<div className="hidden md:block">
<span className="text-label-md font-bold text-primary">ResumeMagic AI</span>
</div>
<div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">
<button className="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-primary text-primary text-label-md font-label-md hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg" >download</span>
        Export PDF
    </button>
<button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-tertiary text-on-tertiary text-label-md font-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors shadow-md shadow-tertiary/20 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg" >person_add</span>
        Save Contact
    </button>
</div>
</div>
{/*  Footer  */}
<footer className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center bg-surface border-t border-outline-variant pb-32">
<p className="text-body-md font-body-md text-on-surface-variant mb-4 md:mb-0">© 2024 ResumeMagic AI. All rights reserved.</p>
<div className="flex gap-6">
<a className="text-label-md font-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
<a className="text-label-md font-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a>
</div>
</footer>


        </div>
    );
}
