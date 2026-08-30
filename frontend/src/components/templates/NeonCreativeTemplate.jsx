
import React from 'react';

export default function NeonCreativeTemplate({ data }) {
    return (
        <div className="theme-neon bg-surface-bright text-on-surface w-full h-full overflow-x-hidden overflow-y-auto antialiased relative" style={{ transform: 'translateZ(0)' }}>
            
{/*  TopNavBar  */}
<nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-20 bg-[#FDFBF7] brutal-border-b shadow-brutal-sm">
<div className="flex items-center gap-8">
<a className="text-headline-md font-headline-md font-extrabold text-black uppercase tracking-tighter" href="#">
                ResumeMagic
            </a>
<div className="hidden md:flex gap-6">
<a className="text-label-md font-label-md text-on-surface-variant hover:text-black hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-black transition-colors uppercase" href="#">Home</a>
<a className="text-label-md font-label-md font-extrabold text-black bg-teal brutal-border px-3 py-1 shadow-brutal-sm uppercase" href="#">Dashboard</a>
<a className="text-label-md font-label-md text-on-surface-variant hover:text-black hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-black transition-colors uppercase" href="#">Analytics</a>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-label-md font-label-md font-bold text-black bg-amber brutal-border px-6 py-2 shadow-brutal sticker uppercase">
                Publish
            </button>
<button className="w-12 h-12 bg-white brutal-border shadow-brutal flex items-center justify-center sticker">
<span className="material-symbols-outlined text-black font-bold" data-icon="account_circle" >account_circle</span>
</button>
</div>
</nav>
{/*  Main Layout  */}
<div className="pt-20 flex min-h-screen">
{/*  SideNavBar  */}
<aside className="hidden lg:flex flex-col w-72 bg-[#FDFBF7] brutal-border-r sticky top-20 py-gutter px-6 h-[calc(100vh-80px)] z-40 shadow-brutal-sm">
<div className="mb-8">
<h2 className="text-headline-md font-headline-md font-extrabold text-black uppercase">Editor Sections</h2>
<div className="mt-2 bg-white brutal-border h-4 w-full relative">
<div className="absolute top-0 left-0 h-full bg-pink brutal-border-r w-[75%]"></div>
</div>
<p className="text-label-md font-label-md text-black mt-2 font-bold">75% Complete</p>
</div>
<nav className="flex-1 flex flex-col gap-3">
<a className="flex items-center gap-3 px-4 py-3 bg-white brutal-border shadow-brutal hover:bg-amber sticker group text-black font-bold" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="text-label-md font-label-md uppercase">Personal Info</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-teal brutal-border shadow-brutal sticker group text-black font-bold translate-x-2" href="#">
<span className="material-symbols-outlined" data-icon="work" >work</span>
<span className="text-label-md font-label-md uppercase">Experience</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-white brutal-border shadow-brutal hover:bg-amber sticker group text-black font-bold" href="#">
<span className="material-symbols-outlined" data-icon="school">school</span>
<span className="text-label-md font-label-md uppercase">Education</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-white brutal-border shadow-brutal hover:bg-amber sticker group text-black font-bold" href="#">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
<span className="text-label-md font-label-md uppercase">Skills</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-white brutal-border shadow-brutal hover:bg-amber sticker group text-black font-bold" href="#">
<span className="material-symbols-outlined" data-icon="folder_special">folder_special</span>
<span className="text-label-md font-label-md uppercase">Projects</span>
</a>
</nav>
<button className="mt-8 w-full py-4 bg-black text-white text-label-md font-label-md font-extrabold uppercase tracking-widest brutal-border hover:bg-pink hover:text-black transition-colors sticker shadow-brutal">
                Add New Section
            </button>
<div className="mt-8 pt-8 brutal-border-t flex flex-col gap-3">
<a className="flex items-center gap-3 text-on-surface-variant hover:text-black font-bold group" href="#">
<span className="material-symbols-outlined group-hover:text-amber" data-icon="settings">settings</span>
<span className="text-label-md font-label-md uppercase">Settings</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant hover:text-black font-bold group" href="#">
<span className="material-symbols-outlined group-hover:text-amber" data-icon="help">help</span>
<span className="text-label-md font-label-md uppercase">Support</span>
</a>
</div>
</aside>
{/*  Main Content Area  */}
<main className="flex-1 p-gutter lg:p-12 overflow-y-auto">
<header className="mb-12">
<h1 className="text-display font-display font-extrabold text-black uppercase mb-4 leading-none">Experience<br /><span className="text-teal bg-black px-4 ml-2 inline-block -rotate-2">Stickers</span></h1>
<p className="text-body-lg font-body-lg text-black font-bold max-w-2xl bg-amber inline-block px-4 py-2 brutal-border shadow-brutal-sm">Drag, drop, and edit your career milestones.</p>
</header>
<div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
{/*  Experience Sticker 1  */}
<div className="bg-white brutal-border shadow-brutal p-8 relative group hover:-translate-y-1 transition-transform">
<div className="absolute -top-4 -right-4 bg-teal brutal-border px-4 py-2 font-bold text-black uppercase transform rotate-3 shadow-brutal-sm">
                        Present
                    </div>
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="text-headline-lg font-headline-lg font-extrabold text-black leading-tight">Senior UX Designer</h3>
<p className="text-headline-md font-headline-md text-black font-bold bg-pink inline-block px-2 mt-2">TechCorp Inc.</p>
</div>
<div className="flex gap-2">
<button className="w-10 h-10 bg-amber brutal-border flex items-center justify-center sticker shadow-brutal-sm">
<span className="material-symbols-outlined font-bold text-black" data-icon="edit">edit</span>
</button>
</div>
</div>
<div className="flex gap-4 mb-6 text-label-md font-label-md font-bold text-black uppercase">
<span className="flex items-center gap-1 border-2 border-black px-2 py-1 bg-white">
<span className="material-symbols-outlined text-[18px]" data-icon="calendar_month">calendar_month</span>
                            Jan 2022 - Present
                        </span>
<span className="flex items-center gap-1 border-2 border-black px-2 py-1 bg-white">
<span className="material-symbols-outlined text-[18px]" data-icon="location_on">location_on</span>
                            San Francisco, CA
                        </span>
</div>
<ul className="space-y-3 text-body-md font-body-md text-black font-medium pl-6 list-none relative">
<li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-black before:brutal-border">Led the redesign of the core enterprise dashboard, resulting in a 40% increase in user engagement and a 25% reduction in support tickets.</li>
<li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-black before:brutal-border">Established a comprehensive design system utilized by 5 distinct product teams, ensuring visual consistency.</li>
<li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-black before:brutal-border">Mentored junior designers and facilitated cross-functional design thinking workshops.</li>
</ul>
<div className="mt-8 flex flex-wrap gap-2">
<span className="px-3 py-1 bg-black text-white text-label-md font-label-md font-bold uppercase tracking-wide">Figma</span>
<span className="px-3 py-1 bg-black text-white text-label-md font-label-md font-bold uppercase tracking-wide">React</span>
<span className="px-3 py-1 bg-black text-white text-label-md font-label-md font-bold uppercase tracking-wide">Design Systems</span>
</div>
</div>
{/*  Experience Sticker 2  */}
<div className="bg-[#F4F4F4] brutal-border shadow-brutal p-8 relative group hover:-translate-y-1 transition-transform">
<div className="absolute -top-4 -left-4 bg-amber brutal-border px-4 py-2 font-bold text-black uppercase transform -rotate-2 shadow-brutal-sm">
                        Past Role
                    </div>
<div className="flex justify-between items-start mb-6 pt-4">
<div>
<h3 className="text-headline-lg font-headline-lg font-extrabold text-black leading-tight">Product Designer</h3>
<p className="text-headline-md font-headline-md text-black font-bold bg-white inline-block px-2 mt-2 brutal-border">Creative Solutions LLC</p>
</div>
<div className="flex gap-2">
<button className="w-10 h-10 bg-teal brutal-border flex items-center justify-center sticker shadow-brutal-sm">
<span className="material-symbols-outlined font-bold text-black" data-icon="edit">edit</span>
</button>
</div>
</div>
<div className="flex gap-4 mb-6 text-label-md font-label-md font-bold text-black uppercase">
<span className="flex items-center gap-1 border-2 border-black px-2 py-1 bg-white">
<span className="material-symbols-outlined text-[18px]" data-icon="calendar_month">calendar_month</span>
                            Mar 2019 - Dec 2021
                        </span>
</div>
<ul className="space-y-3 text-body-md font-body-md text-black font-medium pl-6 list-none relative">
<li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-teal before:brutal-border">Spearheaded the UI/UX for a new mobile application, securing 100k+ downloads in the first month.</li>
<li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-teal before:brutal-border">Conducted extensive user research and A/B testing to optimize conversion funnels.</li>
</ul>
<div className="mt-8 flex flex-wrap gap-2">
<span className="px-3 py-1 bg-white brutal-border text-black text-label-md font-label-md font-bold uppercase tracking-wide">User Research</span>
<span className="px-3 py-1 bg-white brutal-border text-black text-label-md font-label-md font-bold uppercase tracking-wide">Prototyping</span>
</div>
</div>
</div>
</main>
</div>
{/*  Footer  */}
<footer className="w-full py-8 px-gutter flex flex-col md:flex-row justify-between items-center bg-black text-white brutal-border-t">
<div className="text-label-md font-label-md font-extrabold uppercase text-amber tracking-widest mb-4 md:mb-0">
            ResumeMagic
        </div>
<div className="text-body-md font-body-md text-white font-medium">
            © 2024 ResumeMagic AI. All rights reserved.
        </div>
<div className="flex gap-6 mt-4 md:mt-0">
<a className="text-label-md font-label-md font-bold uppercase hover:text-pink transition-colors" href="#">Privacy Policy</a>
<a className="text-label-md font-label-md font-bold uppercase hover:text-teal transition-colors" href="#">Terms of Service</a>
<a className="text-label-md font-label-md font-bold uppercase hover:text-amber transition-colors" href="#">Contact Us</a>
</div>
</footer>

        </div>
    );
}
