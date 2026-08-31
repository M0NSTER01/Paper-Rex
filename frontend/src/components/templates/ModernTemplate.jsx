import React from 'react';
import ContactForm from '../ContactForm';

export default function ModernTemplate({ data }) {
    return (
        <div className="theme-modern bg-surface-container-low text-on-surface antialiased min-h-screen flex flex-col relative" style={{ transform: 'translateZ(0)' }}>
            {/* Header with Persistent Navigation */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-sm transition-all duration-300">
                <div className="flex items-center gap-4">
                    <span className="text-headline-md font-headline-md font-bold text-primary">ResumeMagic</span>
                </div>
                <nav className="hidden md:flex gap-6 items-center bg-surface-container px-6 py-2 rounded-full border border-outline-variant overflow-x-auto max-w-[60vw]">
                    <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#about">About</a>
                    {data?.visible?.education !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#education">Education</a> )}
                    {data?.visible?.skills !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#technology">Tech Stack</a> )}
                    {data?.visible?.experience !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#experience">Experience</a> )}
                    {data?.visible?.projects !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#projects">Projects</a> )}
                    {data?.visible?.certifications !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#certifications">Certifications</a> )}
                    <a className="text-label-md font-label-md text-on-surface hover:text-secondary transition-colors whitespace-nowrap" href="#contact">Contact</a>
                </nav>
                <div className="flex items-center gap-4">
                    
                    <button className="md:hidden text-primary p-2 bg-surface-container rounded-full">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full pt-20">
                {/* 1. About (Intro/Hero Section) */}
                <section className="hero-split flex flex-col lg:flex-row w-full bg-surface" id="about">
                    <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 lg:py-0 order-2 lg:order-1 relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                        <div className="absolute bottom-20 right-10 w-72 h-72 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                        <div className="relative z-10 space-y-8 max-w-2xl">
                            <h1 className="text-display font-display text-on-surface leading-tight">
                                Hi, I'm <span className="text-primary block mt-2">{data?.intro?.name || "Alex Mercer"}</span>
                            </h1>
                            <h2 className="text-headline-lg font-headline-lg text-secondary">{data?.intro?.title || "Senior Full-Stack Engineer"}</h2>
                            <p className="text-body-lg font-body-lg text-on-surface-variant">
                                {data?.intro?.summary || "Building scalable web applications and intuitive user experiences. Passionate about bridging the gap between complex engineering challenges and elegant design solutions."}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#contact">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                                </a>
                                <a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>link</span>
                                </a>
                                <a className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary shadow-sm transition-all hover:-translate-y-1" href="#">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 lg:h-auto h-[50vh] min-h-[400px] order-1 lg:order-2 relative bg-surface-container-high">
                        <img className="object-cover w-full h-full absolute inset-0 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" alt={data?.intro?.name || "Profile"} src={data?.intro?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC3dLfyfIKRfBwy8L3iQifwR8iIjqQ4o0XsZ7DV9xAJbqDnBi2uHduEFNdxDn_8NAFX7mib56sCi5RvwBbbTQltuNI4mEHD6dmlyt4pVHU_0z_gFPik3MBOMeaX2WWYJvRlayEHoTueA1J9cWByTXJOAHS9eLOIsoC_PPYvBf1SEULUmtR7fo4XxIpD1hLI_q_PIHLOjLwg8RMnlNPym8KLE_2e10nt0mQLLxjSTm39-HFFVEXSUlADIA"}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-l opacity-80"></div>
                    </div>
                </section>

                {/* 2. Education */}
                {data?.visible?.education !== false && (
<section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-24 space-y-12" id="education">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                        <h3 className="text-headline-lg font-headline-lg text-on-surface">Education</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data?.education?.length > 0 ? (
                            data.education.map((edu, idx) => (
                                <div key={idx} className="bento-card p-8 flex flex-col justify-between group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">{edu.degree}</h4>
                                            <p className="text-body-lg font-body-lg text-secondary mt-1">{edu.school}</p>
                                        </div>
                                        <span className="text-label-md font-label-md text-on-tertiary-container bg-tertiary-container px-4 py-2 rounded-xl shadow-sm">{edu.years}</span>
                                    </div>
                                    <p className="text-body-md font-body-md text-on-surface-variant">{edu.desc || 'Relevant coursework and focus.'}</p>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="bento-card p-8 flex flex-col justify-between group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">M.S. Computer Science</h4>
                                            <p className="text-body-lg font-body-lg text-secondary mt-1">Stanford University</p>
                                        </div>
                                        <span className="text-label-md font-label-md text-on-tertiary-container bg-tertiary-container px-4 py-2 rounded-xl shadow-sm">2016 - 2018</span>
                                    </div>
                                    <p className="text-body-md font-body-md text-on-surface-variant">Focus on Artificial Intelligence and Distributed Systems. Graduated with Honors.</p>
                                </div>
                                <div className="bento-card p-8 flex flex-col justify-between group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">B.S. Software Engineering</h4>
                                            <p className="text-body-lg font-body-lg text-secondary mt-1">University of California, Berkeley</p>
                                        </div>
                                        <span className="text-label-md font-label-md text-on-tertiary-container bg-tertiary-container px-4 py-2 rounded-xl shadow-sm">2012 - 2016</span>
                                    </div>
                                    <p className="text-body-md font-body-md text-on-surface-variant">Minor in Mathematics. Dean's List all semesters.</p>
                                </div>
                            </>
                        )}
                    </div>
                </section>
)}

                {/* 3. Technology (Tech Stack) */}
                {data?.visible?.skills !== false && (
<section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 space-y-12 bg-surface" id="technology">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>code_blocks</span>
                        <h3 className="text-headline-lg font-headline-lg text-on-surface">Technology</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {data?.skills?.length > 0 ? (
                            data.skills.map((skill, idx) => {
                                const initial = skill.substring(0, 2);
                                const colors = ['text-primary', 'text-secondary', 'text-tertiary'];
                                const colorClass = colors[idx % colors.length];
                                return (
                                    <div key={idx} className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                        <span className={`text-display font-display font-bold ${colorClass}`}>{initial}</span>
                                        <span className="text-label-md font-label-md text-on-surface">{skill}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-primary">JS</span>
                                    <span className="text-label-md font-label-md text-on-surface">JavaScript</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-secondary">TS</span>
                                    <span className="text-label-md font-label-md text-on-surface">TypeScript</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-tertiary">Py</span>
                                    <span className="text-label-md font-label-md text-on-surface">Python</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-primary">Re</span>
                                    <span className="text-label-md font-label-md text-on-surface">React</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-secondary">No</span>
                                    <span className="text-label-md font-label-md text-on-surface">Node.js</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-tertiary">Go</span>
                                    <span className="text-label-md font-label-md text-on-surface">Go</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-primary">HT</span>
                                    <span className="text-label-md font-label-md text-on-surface">HTML5</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-secondary">CS</span>
                                    <span className="text-label-md font-label-md text-on-surface">CSS3</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-tertiary">TW</span>
                                    <span className="text-label-md font-label-md text-on-surface">Tailwind</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-primary">Aw</span>
                                    <span className="text-label-md font-label-md text-on-surface">AWS</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-secondary">Db</span>
                                    <span className="text-label-md font-label-md text-on-surface">PostgreSQL</span>
                                </div>
                                <div className="bento-card p-6 flex flex-col items-center justify-center gap-3 bg-surface-variant/50 hover:bg-surface-variant transition-colors">
                                    <span className="text-display font-display font-bold text-tertiary">Dk</span>
                                    <span className="text-label-md font-label-md text-on-surface">Docker</span>
                                </div>
                            </>
                        )}
                    </div>
                </section>
)}

                {/* 4. Work Experience Section */}
                {data?.visible?.experience !== false && (
<section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 space-y-12" id="experience">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                        <h3 className="text-headline-lg font-headline-lg text-on-surface">Work Experience</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[250px]">
                        {data?.experience?.length > 0 ? (
                            data.experience.map((exp, idx) => {
                                if (idx === 0) {
                                    return (
                                        <div key={idx} className="bento-card md:col-span-2 xl:col-span-2 row-span-2 p-8 md:p-12 relative flex flex-col justify-between group">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h4 className="text-display font-display text-on-surface">{exp.role}</h4>
                                                        <p className="text-headline-md font-headline-md text-secondary mt-2">{exp.company}</p>
                                                    </div>
                                                    <span className="text-label-md font-label-md text-on-tertiary-container bg-tertiary-container px-4 py-2 rounded-xl shadow-sm">{exp.years}</span>
                                                </div>
                                                <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                                                    {exp.desc}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-3 mt-8">
                                                <span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">React</span>
                                                <span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">Node.js</span>
                                                <span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">AWS</span>
                                                <span className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-label-md font-label-md border border-outline-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors">Microservices</span>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={idx} className="bento-card p-8 flex flex-col justify-between bg-gradient-to-br from-surface to-surface-container">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">{exp.role}</h4>
                                            <p className="text-label-md font-label-md text-secondary mt-1">{exp.company}</p>
                                        </div>
                                        <p className="text-body-md font-body-md text-on-surface-variant my-4">
                                            {exp.desc}
                                        </p>
                                        <span className="text-label-md font-label-md text-outline font-medium">{exp.years}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                {/* Large Feature Card */}
                                <div className="bento-card md:col-span-2 xl:col-span-2 row-span-2 p-8 md:p-12 relative flex flex-col justify-between group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="text-display font-display text-on-surface">Lead Developer</h4>
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
                                {/* Medium Card */}
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
                            </>
                        )}
                        
                        {/* Small Stat Card (always keep as a fun element) */}
                        <div className="bento-card p-8 flex flex-col items-center justify-center text-center bg-primary text-on-primary relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-transparent opacity-50"></div>
                            <div className="relative z-10">
                                <span className="text-display font-display text-5xl block mb-2 group-hover:scale-110 transition-transform">99%</span>
                                <p className="text-label-md font-label-md text-primary-fixed">Uptime Delivered</p>
                            </div>
                        </div>
                    </div>
                </section>
)}

                {/* 5. Projects */}
                {data?.visible?.projects !== false && (
<section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 space-y-12 bg-surface" id="projects">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                        <h3 className="text-headline-lg font-headline-lg text-on-surface">Projects</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {(data?.projects || []).map((proj, index) => (
                            <div key={index} className="bento-card p-8 flex flex-col gap-4 overflow-hidden relative">
                                {proj.image && (
                                    <div className="w-full h-48 -mt-8 -mx-8 mb-0 relative">
                                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <h4 className="text-headline-md font-headline-md text-on-surface">{proj.title}</h4>
                                <p className="text-body-md font-body-md text-on-surface-variant">{proj.desc}</p>
                                <div className="flex gap-2 mt-auto pt-4 flex-wrap">
                                    {(proj.tech || []).map((t, i) => (
                                        <span key={i} className="text-label-md font-label-md bg-secondary/10 text-secondary px-3 py-1 rounded-full">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
)}

                {/* 6. Certifications */}
                <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 space-y-12" id="certifications">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                        <h3 className="text-headline-lg font-headline-lg text-on-surface">Certifications</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(data?.certifications || []).map((cert, index) => (
                            <div key={index} className="bento-card p-6 flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
                                <div>
                                    <h4 className="text-label-md font-label-md text-on-surface">{cert.title}</h4>
                                    <p className="text-mono font-mono text-on-surface-variant mt-1">{cert.issuer} ({cert.year})</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Contact */}
                <section className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 pb-32 space-y-12 bg-surface" id="contact">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-tertiary text-4xl bg-tertiary-container text-on-tertiary-container p-3 rounded-xl" style={{ fontVariationSettings: "'FILL' 1" }}>contact_mail</span>
                        <h3 className="text-headline-lg font-headline-lg text-on-surface">Contact</h3>
                    </div>
                    <div className="bento-card p-8 md:p-12 text-center flex flex-col items-center justify-center max-w-3xl mx-auto bg-surface-container-low">
                        <h4 className="text-headline-md font-headline-md text-on-surface mb-4">Let's build something great together.</h4>
                        <p className="text-body-lg font-body-lg text-on-surface-variant mb-8">I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                        <div className="w-full text-left mt-8"><ContactForm toEmail={data?.contact?.email} /></div>
                    </div>
                </section>
            </main>

            {/* Floating AI Widget - Branded FAB */}
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))} className="ai-chat-trigger fixed bottom-32 md:bottom-24 right-6 md:right-10 w-16 h-16 bg-secondary text-on-secondary rounded-xl shadow-xl shadow-secondary/30 hover:shadow-2xl hover:shadow-secondary/40 hover:-translate-y-1 transition-all flex items-center justify-center z-40 group">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                <span className="absolute right-20 bg-surface-container-high text-on-surface text-label-md font-label-md px-5 py-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-outline-variant">Ask My Portfolio</span>
            </button>

            {/* Fixed Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-outline-variant py-4 px-6 md:px-12 flex justify-between items-center z-50">
                <div className="hidden md:block">
                    <span className="text-label-md font-bold text-primary">ResumeMagic AI</span>
                </div>
                <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">
                    <button className="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-primary text-primary text-label-md font-label-md hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>download</span>
                        Export PDF
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-tertiary text-on-tertiary text-label-md font-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors shadow-md shadow-tertiary/20 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                        Save Contact
                    </button>
                </div>
            </div>

            {/* Footer */}
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
