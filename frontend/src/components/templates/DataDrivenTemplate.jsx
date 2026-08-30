import React from 'react';
import ContactForm from '../ContactForm';

export default function DataDrivenTemplate({ data }) {
    return (
        <div className="theme-data-driven bg-background text-on-surface antialiased min-h-screen flex relative flex-col" style={{ transform: 'translateZ(0)' }}>
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-outline shadow-sm h-16 flex items-center px-6 md:px-12 justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-headline-md font-headline-md font-bold text-primary">ResumeMagic</span>
                </div>
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#about">About</a>
                    {data?.visible?.education !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#education">Education</a> )}
                    {data?.visible?.skills !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#technology">Technology</a> )}
                    {data?.visible?.experience !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#experience">Experience</a> )}
                    {data?.visible?.projects !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#projects">Projects</a> )}
                    {data?.visible?.certifications !== false && ( <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#certification">Certification</a> )}
                    <a className="text-label-md font-label-md text-on-surface hover:text-primary transition-colors" href="#contact">Contact</a>
                </div>
                {/* Mobile Menu Button */}
                <button className="md:hidden text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
                </button>
            </nav>

            {/* Main Content */}
            <main className="w-full pt-20 pb-32">
                <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-16 space-y-24">
                    {/* 1. Hero Section */}
                    <section className="bg-surface-container-lowest border border-outline rounded-2xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8" id="about">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-variant shadow-md flex-shrink-0 relative">
                            <img className="object-cover w-full h-full absolute inset-0" alt={data?.intro?.name || "Profile"} src={data?.intro?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC3dLfyfIKRfBwy8L3iQifwR8iIjqQ4o0XsZ7DV9xAJbqDnBi2uHduEFNdxDn_8NAFX7mib56sCi5RvwBbbTQltuNI4mEHD6dmlyt4pVHU_0z_gFPik3MBOMeaX2WWYJvRlayEHoTueA1J9cWByTXJOAHS9eLOIsoC_PPYvBf1SEULUmtR7fo4XxIpD1hLI_q_PIHLOjLwg8RMnlNPym8KLE_2e10nt0mQLLxjSTm39-HFFVEXSUlADIA"}/>
                        </div>
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h1 className="text-display font-display text-on-surface">{data?.intro?.name || "Alex Mercer"}</h1>
                            <h2 className="text-headline-lg font-headline-lg text-primary">{data?.intro?.title || "Senior Full-Stack Engineer"}</h2>
                            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                                {data?.intro?.summary || "Building scalable web applications and intuitive user experiences. Passionate about bridging the gap between complex engineering challenges and elegant design solutions."}
                            </p>
                            <div className="flex justify-center md:justify-start gap-4 pt-4 border-t border-outline-variant mt-4">
                                <a className="flex items-center gap-2 text-label-md text-primary hover:text-primary-container transition-colors" href="#">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>link</span> Portfolio
                                </a>
                                <a className="flex items-center gap-2 text-label-md text-primary hover:text-primary-container transition-colors" href="#">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>code</span> GitHub
                                </a>
                                <a className="flex items-center gap-2 text-label-md text-primary hover:text-primary-container transition-colors" href="#">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span> Contact
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* 2. Education Section */}
                    {data?.visible?.education !== false && (
<section className="space-y-8" id="education">
                        <div className="flex items-center gap-4 border-b border-outline pb-4">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface">Education</h3>
                        </div>
                        <div className="space-y-6">
                            {data?.education?.length > 0 ? (
                                data.education.map((edu, idx) => (
                                    <div key={idx} className="bg-surface-container-lowest rounded-xl border border-outline p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">{edu.degree}</h4>
                                            <p className="text-label-md font-label-md text-primary mt-1">{edu.school}</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 text-right">
                                            <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">{edu.years}</span>
                                            <p className="text-body-md text-on-surface-variant mt-2">{edu.desc}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="bg-surface-container-lowest rounded-xl border border-outline p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">M.S. Computer Science</h4>
                                            <p className="text-label-md font-label-md text-primary mt-1">Stanford University</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 text-right">
                                            <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">2016 - 2018</span>
                                            <p className="text-body-md text-on-surface-variant mt-2">GPA: 3.9/4.0</p>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest rounded-xl border border-outline p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                                        <div>
                                            <h4 className="text-headline-md font-headline-md text-on-surface">B.S. Software Engineering</h4>
                                            <p className="text-label-md font-label-md text-secondary mt-1">MIT</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 text-right">
                                            <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">2012 - 2016</span>
                                            <p className="text-body-md text-on-surface-variant mt-2">GPA: 3.8/4.0</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 3. Technology Section */}
                    {data?.visible?.skills !== false && (
<section className="space-y-8" id="technology">
                        <div className="flex items-center gap-4 border-b border-outline pb-4">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>code_blocks</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface">Technology Stack</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data?.skills?.length > 0 ? (
                                data.skills.map((skill, idx) => {
                                    const percents = ['95%', '90%', '85%', '80%', '75%'];
                                    const percent = percents[idx % percents.length];
                                    const proficiencies = ['Advanced', 'Advanced', 'Proficient', 'Proficient', 'Intermediate'];
                                    const prof = proficiencies[idx % proficiencies.length];
                                    return (
                                        <div key={idx} className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-label-md font-bold text-on-surface">{skill}</span>
                                                <span className="text-mono text-primary">{prof}</span>
                                            </div>
                                            <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: percent }}></div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <>
                                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-md font-bold text-on-surface">HTML/CSS</span>
                                            <span className="text-mono text-primary">Advanced</span>
                                        </div>
                                        <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[95%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-md font-bold text-on-surface">JavaScript (ES6+)</span>
                                            <span className="text-mono text-primary">Advanced</span>
                                        </div>
                                        <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[90%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-md font-bold text-on-surface">React / Next.js</span>
                                            <span className="text-mono text-primary">Advanced</span>
                                        </div>
                                        <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[90%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-md font-bold text-on-surface">Node.js / Express</span>
                                            <span className="text-mono text-primary">Advanced</span>
                                        </div>
                                        <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[85%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-md font-bold text-on-surface">TypeScript</span>
                                            <span className="text-mono text-primary">Proficient</span>
                                        </div>
                                        <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[80%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-md font-bold text-on-surface">AWS / Cloud</span>
                                            <span className="text-mono text-primary">Proficient</span>
                                        </div>
                                        <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[75%] rounded-full"></div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 4. Work Experience Section */}
                    {data?.visible?.experience !== false && (
<section className="space-y-8" id="experience">
                        <div className="flex items-center gap-4 border-b border-outline pb-4">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface">Work Experience</h3>
                        </div>
                        <div className="space-y-6">
                            {data?.experience?.length > 0 ? (
                                data.experience.map((exp, idx) => (
                                    <div key={idx} className="bg-surface-container-lowest rounded-xl border border-outline hover:border-primary transition-colors flex flex-col lg:flex-row overflow-hidden shadow-sm">
                                        <div className="flex-1 p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="text-headline-md font-headline-md text-on-surface">{exp.role}</h4>
                                                    <p className="text-label-md font-label-md text-primary mt-1">{exp.company}</p>
                                                </div>
                                                <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">{exp.years}</span>
                                            </div>
                                            <p className="text-body-md font-body-md text-on-surface-variant mb-6">
                                                {exp.desc}
                                            </p>
                                        </div>
                                        <div className="w-full lg:w-64 bg-surface-container-low border-t lg:border-t-0 lg:border-l border-outline p-6 flex flex-row lg:flex-col justify-around gap-6">
                                            <div className="text-center lg:text-left">
                                                <div className="text-headline-lg text-primary font-bold">{idx === 0 ? '+40%' : '100%'}</div>
                                                <div className="text-label-md text-on-surface-variant mt-1">{idx === 0 ? 'System Throughput' : 'Migration Complete'}</div>
                                            </div>
                                            <div className="text-center lg:text-left">
                                                <div className="text-headline-lg text-secondary font-bold">{idx === 0 ? '5' : '-2s'}</div>
                                                <div className="text-label-md text-on-surface-variant mt-1">{idx === 0 ? 'Devs Mentored' : 'Load Time Reduction'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* Main Role */}
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
                                    {/* Previous Role */}
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
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 5. Projects Section */}
                    {data?.visible?.projects !== false && (
<section className="space-y-8" id="projects">
                        <div className="flex items-center gap-4 border-b border-outline pb-4">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface">Projects</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(data?.projects || []).map((proj, index) => (
                            <div key={index} className="bg-surface-container-lowest border border-outline rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 overflow-hidden relative">
                                {proj.image && (
                                    <div className="w-full h-48 -mt-6 -mx-6 mb-0 relative">
                                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <h4 className="text-headline-md text-on-surface mb-2">{proj.title}</h4>
                                <p className="text-body-md text-on-surface-variant mb-4">{proj.desc}</p>
                                <div className="flex gap-2 mb-4 flex-wrap mt-auto">
                                    {(proj.tech || []).map((t, i) => (
                                        <span key={i} className="px-2 py-1 text-xs bg-surface-variant rounded text-on-surface">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
)}

                    {/* 6. Certification Section */}
                    {data?.visible?.certifications !== false && (
<section className="space-y-8" id="certification">
                        <div className="flex items-center gap-4 border-b border-outline pb-4">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface">Certification</h3>
                        </div>
                        <div className="space-y-4">
                        {(data?.certifications || []).map((cert, index) => (
                            <div key={index} className="bg-surface-container-lowest border border-outline rounded-xl p-6 flex justify-between items-center shadow-sm">
                                <div>
                                    <h4 className="text-headline-md text-on-surface">{cert.title}</h4>
                                    <p className="text-body-md text-on-surface-variant">{cert.issuer}</p>
                                </div>
                                <span className="text-label-md text-primary bg-primary-fixed px-3 py-1 rounded-full">{cert.year}</span>
                            </div>
                        ))}
                    </div>
            </section>
)}

                    {/* 7. Contact Section */}
                    <section className="space-y-8" id="contact">
                        <div className="flex items-center gap-4 border-b border-outline pb-4">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                            <h3 className="text-headline-lg font-headline-lg text-on-surface">Contact</h3>
                        </div>
                        <div className="bg-surface-container-lowest border border-outline rounded-xl p-8 shadow-sm text-center">
                            <h4 className="text-headline-md text-on-surface mb-4">Let's Connect</h4>
                            <p className="text-body-md text-on-surface-variant mb-6 max-w-lg mx-auto">I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                            <ContactForm toEmail={data?.contact?.email} />
                        </div>
                    </section>

                    {/* Footer */}
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

            {/* Fixed Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline py-4 px-6 md:px-12 flex justify-center md:justify-end z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex gap-4">
                    <button className="px-6 py-2 rounded-lg border-2 border-outline text-on-surface-variant text-label-md font-label-md hover:bg-surface-variant transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>download</span>
                        Export to PDF
                    </button>
                    <button className="px-6 py-2 rounded-lg bg-primary text-on-primary text-label-md font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                        Save Contact
                    </button>
                </div>
            </div>
        </div>
    );
}
