import React from 'react';

export default function NeonCreativeTemplate({ data }) {
    return (
        <div 
            className="theme-neon-creative font-body-md text-on-background antialiased selection:bg-amber selection:text-on-surface min-h-screen flex flex-col relative"
            style={{ transform: 'translateZ(0)' }}
        >
            {/* TopNavBar */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-surface-bright brutal-border-b shadow-brutal-sm">
                <div className="flex items-center gap-8">
                    <a className="text-headline-md font-headline-md font-extrabold text-on-surface uppercase tracking-tighter" href="#">
                        Portfolio
                    </a>
                    <div className="hidden lg:flex gap-4">
                        <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#about">About</a>
                        {data?.visible?.education !== false && ( <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#education">Education</a> )}
                        {data?.visible?.skills !== false && ( <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#technology">Tech</a> )}
                        {data?.visible?.experience !== false && ( <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#experience">Experience</a> )}
                        {data?.visible?.projects !== false && ( <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#projects">Projects</a> )}
                        {data?.visible?.certifications !== false && ( <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#certification">Certifications</a> )}
                        <a className="text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-amber px-2 py-1 brutal-border border-transparent hover:border-on-surface transition-colors uppercase" href="#contact">Contact</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <a className="text-label-md font-label-md font-bold text-on-surface bg-teal brutal-border px-6 py-2 shadow-brutal sticker uppercase hidden sm:block" href="#contact">
                        Hire Me
                    </a>
                </div>
            </nav>

            {/* Main Layout */}
            <div className="pt-20 flex flex-1">
                {/* Main Content Area */}
                <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
                    {/* 1. About (Hero/Intro) */}
                    <section className="mb-24 pt-8" id="about">
                        <div className="bg-surface-container-lowest brutal-border shadow-brutal p-8 md:p-12 relative">
                            <div className="absolute -top-6 -right-6 bg-pink brutal-border p-4 font-bold text-on-surface uppercase transform rotate-6 shadow-brutal-sm">
                                Hello World!
                            </div>
                            <div className="max-w-3xl">
                                <h1 className="text-display font-display font-extrabold text-on-surface uppercase mb-6 leading-none">
                                    {data?.intro?.name?.split(' ')[0] || "Creative"}<br/>
                                    <span className="text-surface-container-lowest bg-on-surface px-4 mt-2 inline-block -rotate-1">
                                        {data?.intro?.name?.split(' ').slice(1).join(' ') || "Developer"}
                                    </span>
                                </h1>
                                <p className="text-headline-md font-headline-md text-on-surface font-bold bg-amber inline-block px-4 py-2 brutal-border shadow-brutal-sm mb-6">
                                    {data?.intro?.title || "Building bold digital experiences."}
                                </p>
                                <p className="text-body-lg font-body-lg text-on-surface mt-4 leading-relaxed">
                                    {data?.intro?.summary || "I am a passionate software engineer specializing in frontend development and interactive design. I bridge the gap between design and engineering, crafting pixel-perfect, performant, and accessible user interfaces that make an impact."}
                                </p>
                                <div className="mt-8 flex gap-4">
                                    {data?.visible?.projects !== false && ( <a className="text-label-md font-label-md font-bold text-on-surface bg-amber brutal-border px-6 py-3 shadow-brutal sticker uppercase inline-block" href="#projects">View Work</a> )}
                                    <a className="text-label-md font-label-md font-bold text-on-surface bg-surface-container-lowest brutal-border px-6 py-3 shadow-brutal sticker uppercase inline-block" href="#contact">Contact Me</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Education */}
                    {data?.visible?.education !== false && (
<section className="mb-24" id="education">
                        <header className="mb-12">
                            <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface uppercase inline-block border-b-4 border-on-surface pb-2">
                                Education
                            </h2>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(data?.projects || []).map((proj, index) => (
                            <div key={index} className="bg-surface-container-lowest brutal-border shadow-brutal flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-48 bg-pink border-b-4 border-on-surface flex items-center justify-center relative overflow-hidden">
                                    <span className="text-display font-display font-extrabold text-on-surface transform -rotate-12 opacity-50 absolute scale-150">{proj.title.substring(0, 10).toUpperCase()}</span>
                                </div>
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface mb-4 uppercase">{proj.title}</h3>
                                    <p className="text-body-md font-bold text-on-surface-variant mb-6">{proj.desc}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {(proj.tech || []).map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-surface-container-low text-on-surface font-bold text-sm uppercase brutal-border">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
)}

                    {/* 3. Technology */}
                    {data?.visible?.skills !== false && (
<section className="mb-24" id="technology">
                        <header className="mb-12">
                            <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface uppercase inline-block bg-amber px-4 py-2 brutal-border transform -rotate-1">
                                Tech Stack
                            </h2>
                        </header>
                        <div className="flex flex-wrap gap-4">
                            {data?.skills?.length > 0 ? (
                                data.skills.map((skill, idx) => {
                                    const colors = ['bg-white', 'bg-pink', 'bg-teal', 'bg-amber'];
                                    const colorClass = colors[idx % colors.length];
                                    return (
                                        <div key={idx} className={`${colorClass} brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker`}>
                                            <span className="text-headline-md font-extrabold">{skill}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <>
                                    <div className="bg-white brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">HTML5</span>
                                    </div>
                                    <div className="bg-white brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">CSS3</span>
                                    </div>
                                    <div className="bg-pink brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">JavaScript</span>
                                    </div>
                                    <div className="bg-teal brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">React</span>
                                    </div>
                                    <div className="bg-white brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">Tailwind</span>
                                    </div>
                                    <div className="bg-white brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">Node.js</span>
                                    </div>
                                    <div className="bg-amber brutal-border shadow-brutal px-6 py-4 flex items-center gap-3 sticker">
                                        <span className="text-headline-md font-extrabold">Figma</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 4. Work Experience */}
                    {data?.visible?.experience !== false && (
<section className="mb-24" id="experience">
                        <header className="mb-12">
                            <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface uppercase mb-4 leading-none">
                                Work Experience<br/>
                                <span className="text-teal bg-on-surface px-4 ml-2 inline-block -rotate-2 text-headline-md">Milestones</span>
                            </h2>
                        </header>
                        <div className="grid grid-cols-1 gap-10 max-w-4xl">
                            {data?.experience?.length > 0 ? (
                                data.experience.map((exp, idx) => (
                                    <div key={idx} className={`${idx % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'} brutal-border shadow-brutal p-8 relative group hover:-translate-y-1 transition-transform`}>
                                        <div className={`absolute -top-4 ${idx % 2 === 0 ? '-right-4 bg-teal rotate-3' : '-left-4 bg-amber -rotate-2'} brutal-border px-4 py-2 font-bold text-on-surface uppercase transform shadow-brutal-sm`}>
                                            {idx === 0 ? 'Present' : 'Past Role'}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                                            <div>
                                                <h3 className="text-headline-lg font-headline-lg font-extrabold text-on-surface leading-tight">{exp.role}</h3>
                                                <p className={`text-headline-md font-headline-md text-on-surface font-bold ${idx % 2 === 0 ? 'bg-pink' : 'bg-surface-container-lowest brutal-border'} inline-block px-2 mt-2`}>{exp.company}</p>
                                            </div>
                                            <div className="flex gap-4 mt-4 sm:mt-0 text-label-md font-label-md font-bold text-on-surface uppercase">
                                                <span className="flex items-center gap-1 border-2 border-on-surface px-2 py-1 bg-surface-container-lowest">
                                                    <span className="material-symbols-outlined text-[18px]">calendar_month</span> {exp.years}
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 text-body-md font-body-md text-on-surface font-medium pl-6 list-none relative">
                                            <li className={`relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 ${idx % 2 === 0 ? 'before:bg-on-surface' : 'before:bg-teal'} before:brutal-border`}>
                                                {exp.desc}
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* Experience 1 */}
                                    <div className="bg-surface-container-lowest brutal-border shadow-brutal p-8 relative group hover:-translate-y-1 transition-transform">
                                        <div className="absolute -top-4 -right-4 bg-teal brutal-border px-4 py-2 font-bold text-on-surface uppercase transform rotate-3 shadow-brutal-sm">
                                            Present
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                                            <div>
                                                <h3 className="text-headline-lg font-headline-lg font-extrabold text-on-surface leading-tight">Frontend Engineer</h3>
                                                <p className="text-headline-md font-headline-md text-on-surface font-bold bg-pink inline-block px-2 mt-2">Digital Agency Co.</p>
                                            </div>
                                            <div className="flex gap-4 mt-4 sm:mt-0 text-label-md font-label-md font-bold text-on-surface uppercase">
                                                <span className="flex items-center gap-1 border-2 border-on-surface px-2 py-1 bg-surface-container-lowest">
                                                    <span className="material-symbols-outlined text-[18px]">calendar_month</span> Jan 2023 - Present
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 text-body-md font-body-md text-on-surface font-medium pl-6 list-none relative">
                                            <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-on-surface before:brutal-border">Develop and maintain highly responsive user interfaces using React and modern CSS frameworks.</li>
                                            <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-on-surface before:brutal-border">Collaborate closely with design teams to implement pixel-perfect, accessible components.</li>
                                            <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-on-surface before:brutal-border">Optimized core web vitals, improving overall site performance by 30%.</li>
                                        </ul>
                                    </div>
                                    {/* Experience 2 */}
                                    <div className="bg-surface-container-low brutal-border shadow-brutal p-8 relative group hover:-translate-y-1 transition-transform">
                                        <div className="absolute -top-4 -left-4 bg-amber brutal-border px-4 py-2 font-bold text-on-surface uppercase transform -rotate-2 shadow-brutal-sm">
                                            Past Role
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 pt-4">
                                            <div>
                                                <h3 className="text-headline-lg font-headline-lg font-extrabold text-on-surface leading-tight">Junior Developer</h3>
                                                <p className="text-headline-md font-headline-md text-on-surface font-bold bg-surface-container-lowest inline-block px-2 mt-2 brutal-border">StartUp Inc.</p>
                                            </div>
                                            <div className="flex gap-4 mt-4 sm:mt-0 text-label-md font-label-md font-bold text-on-surface uppercase">
                                                <span className="flex items-center gap-1 border-2 border-on-surface px-2 py-1 bg-surface-container-lowest">
                                                    <span className="material-symbols-outlined text-[18px]">calendar_month</span> Jun 2021 - Dec 2022
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="space-y-3 text-body-md font-body-md text-on-surface font-medium pl-6 list-none relative">
                                            <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-teal before:brutal-border">Assisted in the development of a customer portal handling 10k+ daily active users.</li>
                                            <li className="relative before:content-[''] before:absolute before:left-[-20px] before:top-2 before:w-3 before:h-3 before:bg-teal before:brutal-border">Wrote comprehensive unit tests and documentation for internal tools.</li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
)}

                    {/* 5. Project */}
                    {data?.visible?.projects !== false && (
<section className="mb-24" id="projects">
                        <header className="mb-12">
                            <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface uppercase inline-block border-b-4 border-on-surface pb-2">
                                Projects
                            </h2>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Project 1 */}
                            <div className="bg-surface-container-lowest brutal-border shadow-brutal flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-48 bg-pink border-b-4 border-on-surface flex items-center justify-center relative overflow-hidden">
                                    <span className="text-display font-display font-extrabold text-on-surface transform -rotate-12 opacity-50 absolute scale-150">ECOMMERCE</span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface mb-2">Modern Storefront</h3>
                                    <p className="text-body-md mb-6 flex-1">A fully responsive e-commerce platform built with Next.js and Stripe integration. Features a brutalist aesthetic.</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-2 py-1 bg-surface-container-low brutal-border text-label-md font-bold">Next.js</span>
                                        <span className="px-2 py-1 bg-surface-container-low brutal-border text-label-md font-bold">Stripe</span>
                                    </div>
                                    <a className="inline-block text-center w-full py-3 bg-on-surface text-surface-container-lowest text-label-md font-bold uppercase tracking-widest brutal-border hover:bg-amber hover:text-on-surface transition-colors sticker" href="#">
                                        View Project
                                    </a>
                                </div>
                            </div>
                            {/* Project 2 */}
                            <div className="bg-surface-container-lowest brutal-border shadow-brutal flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-48 bg-teal border-b-4 border-on-surface flex items-center justify-center relative overflow-hidden">
                                    <span className="text-display font-display font-extrabold text-on-surface transform rotate-6 opacity-50 absolute scale-150">DASHBOARD</span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface mb-2">Analytics Admin</h3>
                                    <p className="text-body-md mb-6 flex-1">Data visualization dashboard for SaaS metrics. Includes interactive charts and dark mode toggle.</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-2 py-1 bg-surface-container-low brutal-border text-label-md font-bold">React</span>
                                        <span className="px-2 py-1 bg-surface-container-low brutal-border text-label-md font-bold">D3.js</span>
                                    </div>
                                    <a className="inline-block text-center w-full py-3 bg-on-surface text-surface-container-lowest text-label-md font-bold uppercase tracking-widest brutal-border hover:bg-amber hover:text-on-surface transition-colors sticker" href="#">
                                        View Project
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
)}

                    {/* 6. Certification */}
                    {data?.visible?.certifications !== false && (
<section className="mb-24" id="certification">
                        <header className="mb-12">
                            <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface uppercase inline-block bg-teal px-4 py-2 brutal-border transform rotate-1">
                                Certifications
                            </h2>
                        </header>
                        <div className="space-y-6 max-w-3xl">
                            <div className="bg-surface-container-lowest brutal-border shadow-brutal p-6 flex items-center gap-6 group hover:-translate-x-2 transition-transform">
                                <div className="w-16 h-16 bg-amber brutal-border flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-headline-lg">verified</span>
                                </div>
                                <div>
                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface">AWS Certified Developer</h3>
                                    <p className="text-body-md font-bold text-on-surface-variant">Amazon Web Services • 2023</p>
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest brutal-border shadow-brutal p-6 flex items-center gap-6 group hover:-translate-x-2 transition-transform">
                                <div className="w-16 h-16 bg-pink brutal-border flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-headline-lg">workspace_premium</span>
                                </div>
                                <div>
                                    <h3 className="text-headline-md font-headline-md font-extrabold text-on-surface">Frontend UI Specialist</h3>
                                    <p className="text-body-md font-bold text-on-surface-variant">Google • 2022</p>
                                </div>
                            </div>
                        </div>
                    </section>
)}

                    {/* 7. Contact */}
                    <section className="mb-24" id="contact">
                        <div className="bg-on-surface brutal-border shadow-brutal p-8 md:p-12 text-surface-container-lowest">
                            <div className="max-w-2xl mx-auto text-center">
                                <h2 className="text-display font-display font-extrabold uppercase mb-6">Let's Talk</h2>
                                <p className="text-body-lg mb-8 font-medium">Currently open for new opportunities or freelance projects. Send me a message and I'll get back to you soon.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <a className="bg-amber text-on-surface brutal-border px-8 py-4 text-headline-md font-extrabold uppercase sticker inline-flex items-center justify-center gap-2" href="mailto:hello@example.com">
                                        <span className="material-symbols-outlined">mail</span> Email Me
                                    </a>
                                    <a className="bg-surface-container-lowest text-on-surface brutal-border px-8 py-4 text-headline-md font-extrabold uppercase sticker inline-flex items-center justify-center gap-2" href="#">
                                        <span className="material-symbols-outlined">link</span> LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Footer */}
            <footer className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center bg-on-surface text-surface-container-lowest brutal-border-t">
                <div className="text-label-md font-label-md font-extrabold uppercase text-amber tracking-widest mb-4 md:mb-0">
                    Portfolio
                </div>
                <div className="text-body-md font-body-md font-medium">
                    © 2024. Built with Brutalism.
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a className="text-label-md font-label-md font-bold uppercase hover:text-pink transition-colors" href="#">Github</a>
                    <a className="text-label-md font-label-md font-bold uppercase hover:text-teal transition-colors" href="#">Twitter</a>
                </div>
            </footer>
        </div>
    );
}
