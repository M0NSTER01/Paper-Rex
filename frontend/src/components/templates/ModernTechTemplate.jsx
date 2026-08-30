import React from 'react';

export default function ModernTechTemplate({ data }) {
  return (
    <div className="resume-a4 modern-tech-template" id="resume-print-area">
      <div className="flex min-h-full">
        {/* Left Sidebar */}
        <aside className="w-[200px] shrink-0 bg-[#1f108e] text-white p-5 flex flex-col gap-5 print:bg-[#1f108e] print:text-white"
          style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
          {/* Name in sidebar */}
          <div className="border-b border-white/20 pb-4">
            <h1 className="text-[18px] font-bold leading-tight">
              {data?.intro?.name || 'Your Name'}
            </h1>
            <p className="text-[11px] mt-1 opacity-80 uppercase tracking-wider">
              {data?.intro?.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Contact</h3>
            <div className="space-y-1.5 text-[11px] opacity-90">
              {data?.contact?.email && (
                <div className="flex items-start gap-1.5">
                  <span className="opacity-60 shrink-0">✉</span>
                  <span className="break-all">{data.contact.email}</span>
                </div>
              )}
              {data?.contact?.linkedin && (
                <div className="flex items-start gap-1.5">
                  <span className="opacity-60 shrink-0">in</span>
                  <span className="break-all">{data.contact.linkedin}</span>
                </div>
              )}
              {data?.contact?.github && (
                <div className="flex items-start gap-1.5">
                  <span className="opacity-60 shrink-0">⌨</span>
                  <span className="break-all">{data.contact.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data?.visible?.skills !== false && data?.skills?.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] bg-white/15 px-2 py-0.5 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data?.visible?.education !== false && data?.education?.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Education</h3>
              <div className="space-y-2">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-[11px] font-semibold leading-tight">{edu.degree}</p>
                    <p className="text-[10px] opacity-70">{edu.school}</p>
                    <p className="text-[10px] opacity-50">{edu.years}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data?.visible?.certifications !== false && data?.certifications?.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Certifications</h3>
              <div className="space-y-1.5">
                {data.certifications.map((cert, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] font-semibold leading-tight">{cert.title}</p>
                    {cert.issuer && <p className="text-[9px] opacity-60">{cert.issuer} {cert.year && `• ${cert.year}`}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 p-6 bg-white">
          {/* Summary */}
          {data?.intro?.summary && (
            <section className="mb-5">
              <h2 className="text-[14px] font-bold text-[#1f108e] uppercase tracking-wider border-b-2 border-[#1f108e] pb-1 mb-2">
                Profile
              </h2>
              <p className="text-[12px] leading-[18px] text-gray-700">
                {data.intro.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data?.visible?.experience !== false && data?.experience?.length > 0 && (
            <section className="mb-5">
              <h2 className="text-[14px] font-bold text-[#1f108e] uppercase tracking-wider border-b-2 border-[#1f108e] pb-1 mb-2">
                Experience
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[13px] font-bold text-gray-900">{exp.role}</h3>
                      <span className="text-[10px] text-gray-500 shrink-0 ml-2 font-medium">{exp.years}</span>
                    </div>
                    <p className="text-[11px] text-[#1f108e] font-medium">{exp.company}</p>
                    {exp.desc && (
                      <p className="text-[11px] leading-[16px] text-gray-600 mt-1 whitespace-pre-line">{exp.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data?.visible?.projects !== false && data?.projects?.length > 0 && (
            <section className="mb-5">
              <h2 className="text-[14px] font-bold text-[#1f108e] uppercase tracking-wider border-b-2 border-[#1f108e] pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((proj, idx) => (
                  <div key={idx}>
                    <h3 className="text-[12px] font-bold text-gray-900">{proj.title}</h3>
                    {proj.desc && (
                      <p className="text-[11px] leading-[16px] text-gray-600 mt-0.5 whitespace-pre-line">{proj.desc}</p>
                    )}
                    {proj.tech?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.tech.map((t, i) => (
                          <span key={i} className="text-[9px] bg-[#1f108e]/10 text-[#1f108e] px-1.5 py-0.5 rounded-sm font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
