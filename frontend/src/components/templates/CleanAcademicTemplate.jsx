
import React from 'react';

export default function CleanAcademicTemplate({ data }) {
    return (
        <div className="theme-clean-academic bg-surface-bright text-on-surface w-full min-h-screen overflow-x-hidden flex md:flex-row flex-col antialiased relative" style={{ transform: 'translateZ(0)' }}>
            
{/*  Mobile Nav (TopAppBar logic applied for mobile viewing)  */}
<header className="md:hidden flex justify-between items-center px-margin-mobile h-16 bg-surface shadow-sm border-b border-outline-variant fixed top-0 w-full z-50">
<div className="text-headline-md font-headline-md-mobile font-bold text-primary">Dr. E. Vance</div>
<button className="text-on-surface-variant p-2">
<span className="material-symbols-outlined">menu</span>
</button>
</header>
{/*  SideNavBar (Desktop)  */}
<aside className="hidden md:flex flex-col h-screen sticky top-0 w-64 bg-surface-container-low border-r border-outline-variant py-margin-desktop px-4 z-40">
<div className="mb-8 px-4">
<h1 className="text-headline-md font-headline-md text-primary academic-serif">Dr. E. Vance</h1>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Cognitive Neuroscience</p>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined text-[20px]">person</span>
<span className="text-label-md font-label-md">Biography</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined text-[20px]">work</span>
<span className="text-label-md font-label-md">Experience</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined text-[20px]">school</span>
<span className="text-label-md font-label-md">Education</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-on-primary-container font-bold translate-x-1 transition-transform" href="#">
<span className="material-symbols-outlined text-[20px] shadow-sm">description</span>
<span className="text-label-md font-label-md">Publications</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined text-[20px]">science</span>
<span className="text-label-md font-label-md">Research</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined text-[20px]">folder_special</span>
<span className="text-label-md font-label-md">Projects</span>
</a>
</nav>
<div className="mt-auto pt-8 border-t border-outline-variant space-y-2">
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-[18px]">download</span>
<span className="text-label-md font-label-md">Download CV</span>
</a>
</div>
</aside>
{/*  Main Content Canvas  */}
<main className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
{/*  Hero/Header Section for the Active Page  */}
<section className="py-12 md:py-margin-desktop px-margin-mobile md:px-gutter max-w-[1000px] w-full mx-auto">
<h2 className="text-display font-display text-on-surface mb-4">Publications &amp; Research</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A curated selection of peer-reviewed articles, conference proceedings, and ongoing research initiatives focused on neuroplasticity and cognitive behavioral models.
            </p>
</section>
{/*  Content Area: Bento-inspired grid for academic focus  */}
<section className="px-margin-mobile md:px-gutter pb-margin-desktop max-w-[1000px] w-full mx-auto flex-1">
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/*  Main Feature: Latest Publication (Takes up 2 columns)  */}
<div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-80"></div>
<div className="flex justify-between items-start mb-6">
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-label-md bg-surface-container-low text-primary border border-primary/20">Peer-Reviewed Journal</span>
<span className="text-label-md font-label-md text-on-surface-variant">Nature Neuroscience, 2023</span>
</div>
<h3 className="text-headline-lg font-headline-lg text-on-surface mb-4 group-hover:text-primary transition-colors">Mapping Neural Correlates of Adaptive Learning in High-Stress Environments</h3>
<p className="text-body-md font-body-md text-on-surface-variant mb-6 leading-relaxed">
                        This comprehensive study investigates the functional connectivity changes in the prefrontal cortex during acute stress phases. Utilizing advanced fMRI techniques, we present a novel framework for understanding...
                    </p>
<div className="flex items-center gap-4 text-label-md font-label-md">
<a className="text-primary hover:underline flex items-center gap-1" href="#">
                            Read Full Article <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
<span className="text-outline">|</span>
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">DOI: 10.1038/s41593-023</a>
</div>
</div>
{/*  Secondary Feature: Ongoing Research  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary">science</span>
<h4 className="text-headline-md font-headline-md text-on-surface">Active Study</h4>
</div>
<h5 className="text-body-lg font-body-lg font-semibold text-on-surface mb-3">Longitudinal Analysis of Cognitive Decline Markers</h5>
<p className="text-body-md font-body-md text-on-surface-variant mb-4">
                        Currently in phase II data collection. Investigating early warning indicators in non-symptomatic populations over a 5-year period.
                    </p>
<div className="mt-auto">
<span className="inline-block bg-surface-container text-on-surface-variant text-xs px-2 py-1 rounded">Grant Funded: NIH</span>
</div>
</div>
{/*  List of Selected Works  */}
<div className="lg:col-span-3 mt-8">
<h3 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-4 mb-6">Selected Works (2018–2022)</h3>
<div className="space-y-6">
{/*  Item 1  */}
<article className="group border-l-2 border-transparent hover:border-secondary pl-4 transition-colors">
<h4 className="text-body-lg font-body-lg font-semibold text-on-surface group-hover:text-secondary transition-colors">Synaptic Plasticity and Memory Formation: A Computational Approach</h4>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Journal of Cognitive Psychology, Vol 45, Issue 2.</p>
<div className="flex gap-2 mt-2">
<span className="text-label-md font-label-md text-outline">Co-authors: Smith, J., Doe, A.</span>
</div>
</article>
{/*  Item 2  */}
<article className="group border-l-2 border-transparent hover:border-secondary pl-4 transition-colors">
<h4 className="text-body-lg font-body-lg font-semibold text-on-surface group-hover:text-secondary transition-colors">Behavioral Interventions in Early-Stage Dementia: Efficacy Metrics</h4>
<p className="text-body-md font-body-md text-on-surface-variant mt-1">Clinical Neurology Reviews, Vol 12, Issue 4.</p>
</article>
</div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="w-full py-8 px-gutter mt-auto flex flex-col md:flex-row justify-between items-center bg-surface-container-highest border-t border-outline-variant">
<div className="text-label-md font-bold text-primary mb-4 md:mb-0">
                Dr. E. Vance
            </div>
<div className="text-body-md font-body-md text-on-surface-variant mb-4 md:mb-0 text-center">
                © 2024 ResumeMagic AI. All rights reserved.
            </div>
<div className="flex gap-6">
<a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
<a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
<a className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Contact Us</a>
</div>
</footer>
</main>

        </div>
    );
}
