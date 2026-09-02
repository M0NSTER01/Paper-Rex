import React from 'react';
import ContactForm from '../ContactForm';

export default function MidnightDeveloperTemplate({ data }) {
    return (
        <div 
            className="theme-midnight-developer font-body-md text-body-md antialiased min-h-screen flex flex-col relative" 
            style={{ transform: 'translateZ(0)', backgroundColor: '#0c141a', color: '#f8fafc' }}
        >
            {/* TopNavBar */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0c141a]/90 backdrop-blur-md border-b border-[#1e293b] shadow-sm hidden md:flex">
                <div className="flex items-center gap-6">
                    <span className="text-headline-md font-headline-md font-bold text-neon tracking-tight">Midnight Developer</span>
                    <nav className="flex gap-6 items-center">
                        <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#about">About</a>
                        {data?.visible?.education !== false && ( <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#education">Education</a> )}
                        {data?.visible?.skills !== false && ( <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#technology">Technology</a> )}
                        {data?.visible?.experience !== false && ( <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#experience">Experience</a> )}
                        {data?.visible?.projects !== false && ( <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#projects">Projects</a> )}
                        {data?.visible?.certifications !== false && ( <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#certification">Certification</a> )}
                        <a className="text-slate-400 hover:text-neon transition-colors duration-200 text-label-md font-label-md" href="#contact">Contact</a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="border border-neon text-neon hover:bg-neon hover:text-black px-4 py-2 rounded-md font-label-md text-label-md transition-colors shadow-sm font-mono">
                        <span className="material-symbols-outlined text-sm align-middle mr-1">download</span> resume.pdf
                    </button>
                </div>
            </header>

            {/* Mobile Header Fallback */}
            <header className="flex md:hidden sticky top-0 z-50 w-full h-16 bg-[#0c141a] items-center justify-between px-4 border-b border-[#1e293b]">
                <span className="text-headline-lg-mobile font-headline-lg-mobile font-bold text-neon">Midnight</span>
                <button className="p-2 text-slate-400">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>

            <div className="flex flex-1 pt-16 h-full justify-center">
                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-4xl p-4 md:p-10 lg:p-6">
                    
                    {/* 1. About (Intro/Hero) */}
                    <section className="mb-20 pt-8 relative overflow-hidden rounded-xl border border-terminal-border bg-terminal-bg/50 p-8" id="about">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-9xl">terminal</span>
                        </div>
                        <div className="max-w-2xl relative z-10">
                            <h1 className="text-display font-display text-white mb-4">
                                &gt; hello_world<span className="animate-pulse text-neon">_</span>
                            </h1>
                            <p className="text-body-lg font-body-lg text-slate-400 mb-6">
                                {data?.intro?.summary || "Translating complex problems into elegant, scalable solutions. Full-stack developer with a focus on high-performance systems and clean architecture."}
                            </p>
                            <div className="flex gap-4">
                                {data?.visible?.projects !== false && ( <a className="bg-neon text-black px-6 py-2.5 rounded font-label-md text-label-md shadow-lg shadow-neon/20 hover:shadow-neon/40 hover:-translate-y-0.5 transition-all inline-block" href="#projects">
                                    View Work
                                </a> )}
                            </div>
                        </div>
                    </section>

                    {/* 2. Education */}
                    {data?.visible?.education !== false && (
<section className="mb-20 pt-8" id="education">
                        <h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
                            <span className="text-neon">~/</span>education
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {data?.education?.length > 0 ? (
                                data.education.map((edu, idx) => (
                                    <article key={idx} className="terminal-card rounded-lg overflow-hidden flex flex-col group hover:border-slate-600 transition-colors">
                                        <header className="terminal-header px-4 py-2 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-500">degree_{idx}.json</span>
                                        </header>
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-mono text-white font-semibold group-hover:text-neon transition-colors">{edu.degree}</h3>
                                                    <p className="text-sm font-mono text-slate-400">{edu.school}</p>
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 bg-[#0c141a] px-2 py-1 rounded border border-[#1e293b]">{edu.years}</span>
                                            </div>
                                            <ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
                                                <li>&gt; {edu.desc || 'Relevant coursework and activities.'}</li>
                                            </ul>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <>
                                    <article className="terminal-card rounded-lg overflow-hidden flex flex-col group hover:border-slate-600 transition-colors">
                                        <header className="terminal-header px-4 py-2 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-500">degree.json</span>
                                        </header>
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-mono text-white font-semibold group-hover:text-neon transition-colors">M.S. Computer Science</h3>
                                                    <p className="text-sm font-mono text-slate-400">Stanford University</p>
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 bg-[#0c141a] px-2 py-1 rounded border border-[#1e293b]">2016 - 2018</span>
                                            </div>
                                            <ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
                                                <li>&gt; Focus: Distributed Systems &amp; Artificial Intelligence.</li>
                                                <li>&gt; Thesis: Optimizing Consensus Algorithms in Microservices.</li>
                                            </ul>
                                        </div>
                                    </article>
                                    <article className="terminal-card rounded-lg overflow-hidden flex flex-col group hover:border-slate-600 transition-colors">
                                        <header className="terminal-header px-4 py-2 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-500">bs_degree.json</span>
                                        </header>
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-mono text-white font-semibold group-hover:text-neon transition-colors">B.S. Software Engineering</h3>
                                                    <p className="text-sm font-mono text-slate-400">University of Waterloo</p>
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 bg-[#0c141a] px-2 py-1 rounded border border-[#1e293b]">2012 - 2016</span>
                                            </div>
                                        </div>
                                    </article>
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 3. Technology (formerly Skills) */}
                    {data?.visible?.skills !== false && (
<section className="mb-20 pt-8" id="technology">
                        <h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
                            <span className="text-neon">~/</span>technology
                        </h2>
                        <div className="terminal-card rounded-lg p-6 font-mono text-sm overflow-x-auto">
                            <div className="flex">
                                <div className="text-slate-600 pr-4 text-right select-none border-r border-[#1e293b] mr-4">
                                    1<br/>2<br/>3<br/>4<br/>5<br/>6
                                </div>
                                <div className="text-slate-300">
                                    {(() => {
                                      let cats = [];
                                        if (data?.categorizedSkills && data.categorizedSkills.length > 0) {
                                            cats = data.categorizedSkills;
                                        } else {
                                            const skills = data?.skills || ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'AWS'];
                                            const chunkSize = Math.ceil(skills.length / 4) || 1;
                                            cats = [
                                                { category: 'core', items: skills.slice(0, chunkSize) },
                                                { category: 'frontend', items: skills.slice(chunkSize, chunkSize * 2) },
                                                { category: 'backend', items: skills.slice(chunkSize * 2, chunkSize * 3) },
                                                { category: 'tools', items: skills.slice(chunkSize * 3) }
                                            ].filter(c => c.items.length > 0);
                                        }
                                        
                                        const renderArray = (arr) => arr.map((item, i) => (
                                            <React.Fragment key={i}>
                                                <span className="text-green-400">'{item}'</span>
                                                {i < arr.length - 1 ? ', ' : ''}
                                            </React.Fragment>
                                        ));
  
                                        return (
                                            <>
                                                <span className="text-rose-400">const</span> tech_stack = {'{'}<br/>
                                                {cats.map((cat, idx) => (
                                                    <React.Fragment key={idx}>
                                                        &nbsp;&nbsp;<span className="text-blue-400">{cat.category.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>: [{renderArray(cat.items)}]{idx < cats.length - 1 ? ',' : ''}<br/>
                                                    </React.Fragment>
                                                ))}
                                                {'};'}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </section>
)}

                    {/* 4. Work Experience */}
                    {data?.visible?.experience !== false && (
<section className="mb-20 pt-8" id="experience">
                        <h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
                            <span className="text-neon">~/</span>experience
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {data?.experience?.length > 0 ? (
                                data.experience.map((exp, idx) => (
                                    <article key={idx} className="terminal-card rounded-lg overflow-hidden flex flex-col group hover:border-slate-600 transition-colors">
                                        <header className="terminal-header px-4 py-2 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-500">job_{idx}.sh</span>
                                        </header>
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-mono text-neon font-semibold">{exp.company}</h3>
                                                    <p className="text-sm font-mono text-slate-400">{exp.role}</p>
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 bg-[#0c141a] px-2 py-1 rounded border border-[#1e293b]">{exp.years}</span>
                                            </div>
                                            <ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
                                                <li>&gt; {exp.desc}</li>
                                            </ul>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <>
                                    {/* Card 1 */}
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
                                                    <h3 className="text-lg font-mono text-neon font-semibold">TechNova Inc.</h3>
                                                    <p className="text-sm font-mono text-slate-400">Senior Full-Stack Engineer</p>
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 bg-[#0c141a] px-2 py-1 rounded border border-[#1e293b]">2021 - Present</span>
                                            </div>
                                            <ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
                                                <li>&gt; Led migration to microservices architecture.</li>
                                                <li>&gt; Reduced latency by 40% using Redis caching.</li>
                                                <li>&gt; Mentored team of 5 junior developers.</li>
                                            </ul>
                                        </div>
                                    </article>
                                    {/* Card 2 */}
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
                                                    <h3 className="text-lg font-mono text-white font-semibold group-hover:text-neon transition-colors">Quantum Logic</h3>
                                                    <p className="text-sm font-mono text-slate-400">Backend Developer</p>
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 bg-[#0c141a] px-2 py-1 rounded border border-[#1e293b]">2018 - 2021</span>
                                            </div>
                                            <ul className="text-sm text-slate-300 space-y-2 font-mono opacity-80">
                                                <li>&gt; Developed RESTful APIs for core product.</li>
                                                <li>&gt; Implemented OAuth2 authentication flow.</li>
                                                <li>&gt; Optimized complex SQL queries.</li>
                                            </ul>
                                        </div>
                                    </article>
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 5. Projects */}
                    {data?.visible?.projects !== false && (
<section className="mb-20 pt-8" id="projects">
                        <h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
                            <span className="text-neon">~/</span>projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(data?.projects || []).map((proj, index) => (
                                <article key={index} className="terminal-card rounded-lg overflow-hidden p-6 hover:border-neon transition-colors flex flex-col gap-4">
                                    {proj.image && (
                                        <div className="w-full h-48 -mt-6 -mx-6 mb-0 relative border-b border-[#1e293b]">
                                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity mix-blend-screen grayscale hover:grayscale-0" />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-mono text-white font-semibold mb-2">{proj.title}</h3>
                                    <p className="text-sm font-body-md text-slate-400 mb-4">{proj.desc}</p>
                                    <div className="flex gap-2 font-mono text-xs text-neon flex-wrap mt-auto">
                                        {(proj.tech || []).map((t, i) => (
                                            <span key={i}>#{t}</span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
)}

                    {/* 6. Certification */}
                    {data?.visible?.certifications !== false && (
<section className="mb-20 pt-8" id="certification">
                        <h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
                            <span className="text-neon">~/</span>certification
                        </h2>
                        <div className="terminal-card rounded-lg overflow-hidden p-6">
                            <ul className="font-mono text-sm text-slate-300 space-y-4">
                            {(data?.certifications || []).map((cert, index) => (
                                <li key={index} className="flex justify-between items-center border-b border-[#1e293b] pb-2">
                                    <div>
                                        <span className="text-white font-semibold">{cert.title}</span>
                                        <p className="text-slate-500 text-xs mt-1">{cert.issuer}</p>
                                    </div>
                                    <span className="text-neon">{cert.year}</span>
                                </li>
                            ))}
                        </ul>
                        </div>
                    </section>
)}

                    {/* 7. Contact */}
                    <section className="mb-20 pt-8" id="contact">
                        <h2 className="text-headline-md font-headline-md text-slate-200 mb-6 font-mono flex items-center gap-2">
                            <span className="text-neon">~/</span>contact
                        </h2>
                        <div className="terminal-card rounded-lg overflow-hidden p-8 text-center">
                            <h3 className="text-xl font-mono text-white mb-4">Ready to initialize connection?</h3>
                            <p className="text-slate-400 font-body-md mb-6 max-w-lg mx-auto">Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                            <div className="w-full text-left mt-8"><ContactForm toEmail={data?.contact?.email} /></div>
                        </div>
                    </section>

                </main>
            </div>

            {/* Footer */}
            <footer className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center bg-[#0c141a] border-t border-[#1e293b] z-10 relative">
                <div className="text-label-md font-label-md font-bold text-neon mb-4 md:mb-0">
                    Midnight Developer
                </div>
                <div className="flex gap-6 mb-4 md:mb-0">
                    <a className="text-label-md font-label-md text-slate-500 hover:text-neon transition-colors" href="https://github.com">GitHub</a>
                    <a className="text-label-md font-label-md text-slate-500 hover:text-neon transition-colors" href="https://linkedin.com">LinkedIn</a>
                    <a className="text-label-md font-label-md text-slate-500 hover:text-neon transition-colors" href="https://twitter.com">Twitter</a>
                </div>
                <div className="text-body-md font-body-md text-slate-500 text-sm font-mono">
                    EOF © 2024
                </div>
            </footer>
        </div>
    );
}
