import React from 'react';

export default function MinimalistTemplate({ data }) {
    return (
        <div className="theme-minimalist bg-surface-bright text-on-surface antialiased min-h-screen flex flex-col relative selection:bg-primary/20" style={{ transform: 'translateZ(0)' }}>
            {/* Executive Sticky Navigation */}
            <header className="sticky top-0 left-0 w-full z-50 bg-surface-bright/95 backdrop-blur-xl border-b border-surface-variant transition-all duration-300 py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <span className="text-xl font-serif font-bold text-primary tracking-wide">RM.</span>
                    <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
                        <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#about">About</a>
                        {data?.visible?.education !== false && ( <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#education">Education</a> )}
                        {data?.visible?.skills !== false && ( <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#technology">Technology</a> )}
                        {data?.visible?.experience !== false && ( <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#experience">Experience</a> )}
                        {data?.visible?.projects !== false && ( <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#projects">Projects</a> )}
                        {data?.visible?.certifications !== false && ( <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#certification">Certification</a> )}
                        <a className="text-sm font-medium text-on-surface hover:text-primary transition-colors" href="#contact">Contact</a>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    
                    {/* Integrated AI Widget */}
                    <button className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm font-medium">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                        <span className="hidden sm:inline">Ask AI</span>
                    </button>
                    <button className="md:hidden text-primary">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>
            
            <main className="flex-1 w-full flex flex-col items-center">
                {/* 1. About Section */}
                <section className="w-full max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center space-y-12 relative" id="about">
                    <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low to-transparent -z-10 opacity-50"></div>
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl relative mb-4">
                        <img alt={data?.intro?.name || "Alex Mercer"} className="object-cover w-full h-full absolute inset-0" src={data?.intro?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC3dLfyfIKRfBwy8L3iQifwR8iIjqQ4o0XsZ7DV9xAJbqDnBi2uHduEFNdxDn_8NAFX7mib56sCi5RvwBbbTQltuNI4mEHD6dmlyt4pVHU_0z_gFPik3MBOMeaX2WWYJvRlayEHoTueA1J9cWByTXJOAHS9eLOIsoC_PPYvBf1SEULUmtR7fo4XxIpD1hLI_q_PIHLOjLwg8RMnlNPym8KLE_2e10nt0mQLLxjSTm39-HFFVEXSUlADIA"} />
                    </div>
                    <div className="space-y-6 max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-on-surface tracking-tight">{data?.intro?.name || "Alex Mercer"}</h1>
                        <h2 className="text-xl md:text-2xl font-body font-light text-primary tracking-widest uppercase">{data?.intro?.title || "Senior Full-Stack Engineer"}</h2>
                        <p className="text-lg md:text-xl font-body font-light text-on-surface-variant leading-relaxed max-w-2xl mx-auto pt-4">
                            {data?.intro?.summary || "Building scalable web applications and intuitive user experiences. Passionate about bridging the gap between complex engineering challenges and elegant design solutions."}
                        </p>
                    </div>
                    <div className="flex gap-6 pt-8 border-t border-surface-variant w-32 justify-center">
                        <a className="text-on-surface hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-2xl">link</span></a>
                        <a className="text-on-surface hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-2xl">code</span></a>
                        <a className="text-on-surface hover:text-primary transition-colors" href="#contact"><span className="material-symbols-outlined text-2xl">mail</span></a>
                    </div>
                </section>
                
                {/* 2. Education Section */}
                {data?.visible?.education !== false && (
<section className="w-full bg-surface py-24 px-6" id="education">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-serif font-bold text-on-surface">Education</h3>
                            <div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {data?.education?.length > 0 ? (
                                data.education.map((edu, idx) => (
                                    <div key={idx} className="bg-surface-bright p-8 rounded-2xl shadow-sm border border-surface-variant hover:shadow-md hover:border-primary/30 transition-all text-center md:text-left">
                                        <h4 className="text-xl font-serif font-bold text-on-surface mb-2">{edu.degree}</h4>
                                        <p className="text-base font-medium text-primary mb-2">{edu.school}</p>
                                        <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">{edu.years}</p>
                                        <p className="text-sm font-light text-on-surface-variant">{edu.desc || 'Focus on relevant coursework.'}</p>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="bg-surface-bright p-8 rounded-2xl shadow-sm border border-surface-variant hover:shadow-md hover:border-primary/30 transition-all text-center md:text-left">
                                        <h4 className="text-xl font-serif font-bold text-on-surface mb-2">Master of Science in Computer Science</h4>
                                        <p className="text-base font-medium text-primary mb-2">Stanford University</p>
                                        <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">2016 - 2018</p>
                                        <p className="text-sm font-light text-on-surface-variant">Focus on Distributed Systems and Human-Computer Interaction.</p>
                                    </div>
                                    <div className="bg-surface-bright p-8 rounded-2xl shadow-sm border border-surface-variant hover:shadow-md hover:border-primary/30 transition-all text-center md:text-left">
                                        <h4 className="text-xl font-serif font-bold text-on-surface mb-2">Bachelor of Science in Software Engineering</h4>
                                        <p className="text-base font-medium text-primary mb-2">University of California, Berkeley</p>
                                        <p className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">2012 - 2016</p>
                                        <p className="text-sm font-light text-on-surface-variant">Graduated with Honors. Minor in Graphic Design.</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
)}
                
                {/* 3. Technology Section */}
                {data?.visible?.skills !== false && (
<section className="w-full py-24 px-6 bg-surface-bright" id="technology">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-serif font-bold text-on-surface">Technology</h3>
                            <div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
                            <p className="text-on-surface-variant font-light mt-6 max-w-2xl mx-auto">A comprehensive overview of my technical toolkit, ranging from frontend interfaces to backend infrastructure.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-surface p-6 rounded-2xl border border-surface-variant">
                                <h4 className="font-serif font-bold text-lg text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">devices</span> Frontend</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">HTML5</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">CSS3</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">JavaScript</span>
                                    {data?.skills?.slice(0, 3).map(s => <span key={s} className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">{s}</span>)}
                                    {!data?.skills && (
                                        <>
                                            <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">React</span>
                                            <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">TypeScript</span>
                                            <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Tailwind CSS</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="bg-surface p-6 rounded-2xl border border-surface-variant">
                                <h4 className="font-serif font-bold text-lg text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">dns</span> Backend</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Node.js</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Python</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">PostgreSQL</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">GraphQL</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Redis</span>
                                </div>
                            </div>
                            <div className="bg-surface p-6 rounded-2xl border border-surface-variant">
                                <h4 className="font-serif font-bold text-lg text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">cloud</span> Infrastructure &amp; Tools</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">AWS</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Docker</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Kubernetes</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">Git</span>
                                    <span className="px-3 py-1.5 rounded-md bg-surface-container-high text-on-surface text-sm font-medium">CI/CD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
)}
                
                {/* 4. Work Experience Timeline */}
                {data?.visible?.experience !== false && (
<section className="w-full bg-surface py-32 px-6" id="experience">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-20">
                            <h3 className="text-3xl font-serif font-bold text-on-surface">Professional Journey</h3>
                            <div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
                        </div>
                        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-surface-variant">
                            {data?.experience?.length > 0 ? (
                                data.experience.map((exp, idx) => (
                                    <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${idx === 0 ? 'is-active' : ''}`}>
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-bright shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${idx === 0 ? 'bg-primary' : 'bg-surface-variant text-on-surface'}`}>
                                            <span className={`material-symbols-outlined text-sm ${idx === 0 ? 'text-on-primary' : ''}`}>{idx === 0 ? 'work' : 'work_outline'}</span>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-surface-bright p-8 rounded-2xl shadow-sm border border-surface-variant hover:shadow-md hover:border-primary/30 transition-all text-left">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                                <h4 className="text-xl font-serif font-bold text-on-surface">{exp.role}</h4>
                                                <span className={`text-xs font-bold uppercase tracking-wider ${idx === 0 ? 'text-primary' : 'text-on-surface-variant'}`}>{exp.years}</span>
                                            </div>
                                            <p className="text-sm font-medium text-on-surface-variant mb-4">{exp.company}</p>
                                            <p className="text-base font-light text-on-surface-variant mb-6 leading-relaxed">
                                                {exp.desc}
                                            </p>
                                            {idx === 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-medium">React</span>
                                                    <span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-medium">Node.js</span>
                                                    <span className="px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-medium">AWS</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* Role 1 */}
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
                                    {/* Role 2 */}
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
                                </>
                            )}
                        </div>
                    </div>
                </section>
)}
                
                {/* 5. Projects (Minimalist Image Focus) */}
                {data?.visible?.projects !== false && (
<section className="w-full py-32 px-6 bg-surface-bright" id="projects">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-20">
                            <h3 className="text-3xl font-serif font-bold text-on-surface">Selected Works</h3>
                            <div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
                        </div>
                        <div className="space-y-32">
                            {(data?.projects || []).map((proj, index) => (
                                <div key={index} className="flex flex-col items-center gap-8">
                                    <div className="text-center max-w-2xl">
                                        <h4 className="text-2xl font-serif font-bold text-on-surface mb-4">{proj.title}</h4>
                                        <p className="text-on-surface-variant font-light text-lg mb-4">{proj.desc}</p>
                                        <div className="flex justify-center flex-wrap gap-2">
                                            {(proj.tech || []).map((t, i) => (
                                                <span key={i} className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm rounded-full">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
)}
                
                {/* 6. Certification Section */}
                {data?.visible?.certifications !== false && (
<section className="w-full bg-surface py-24 px-6" id="certification">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-serif font-bold text-on-surface">Certification</h3>
                            <div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {(data?.certifications || []).map((cert, index) => (
                                <div key={index} className="flex items-start gap-4 p-6 bg-surface-bright rounded-xl border border-surface-variant shadow-sm">
                                    <div className="p-3 bg-surface-container-low rounded-full text-primary shrink-0">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-on-surface mb-1">{cert.title}</h4>
                                        <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
                                        <p className="text-xs text-on-surface-variant uppercase tracking-wide">Issued: {cert.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
)}
                
                {/* 7. Contact Section */}
                <section className="w-full py-32 px-6 bg-surface-bright" id="contact">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-serif font-bold text-on-surface">Get In Touch</h3>
                            <div className="w-12 h-1 bg-primary mx-auto mt-6"></div>
                            <p className="text-on-surface-variant font-light mt-6">Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                        </div>
                        <form className="bg-surface p-8 md:p-12 rounded-2xl border border-surface-variant shadow-sm max-w-2xl mx-auto space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="name">Name</label>
                                    <input className="w-full px-4 py-3 rounded-lg bg-surface-bright border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" id="name" placeholder="John Doe" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="email">Email</label>
                                    <input className="w-full px-4 py-3 rounded-lg bg-surface-bright border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface" id="email" placeholder="john@example.com" type="email" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-on-surface mb-2" htmlFor="message">Message</label>
                                <textarea className="w-full px-4 py-3 rounded-lg bg-surface-bright border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface resize-none" id="message" placeholder="Hello..." rows="5"></textarea>
                            </div>
                            <button className="w-full py-4 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm" type="button">Send Message</button>
                        </form>
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
                    <a className="text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-2" href="#contact">
                        <span className="material-symbols-outlined text-sm">person_add</span> Contact
                    </a>
                </div>
            </footer>
        </div>
    );
}
