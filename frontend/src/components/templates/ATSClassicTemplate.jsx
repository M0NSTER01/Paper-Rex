import React from 'react';

export default function ATSClassicTemplate({ data }) {
  return (
    <div className="resume-a4 ats-classic-template" id="resume-print-area">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-5">
        <h1 className="text-[28px] font-bold tracking-tight text-gray-900 leading-tight">
          {data?.intro?.name || 'Your Name'}
        </h1>
        <p className="text-[14px] font-semibold text-gray-600 mt-1 tracking-wide uppercase">
          {data?.intro?.title || 'Professional Title'}
        </p>
        <div className="flex items-center justify-center gap-3 mt-2 text-[11px] text-gray-600 flex-wrap">
          {data?.contact?.email && (
            <span>{data.contact.email}</span>
          )}
          {data?.contact?.linkedin && (
            <>
              <span className="text-gray-400">|</span>
              <a href={data.contact.linkedin.startsWith("http") ? data.contact.linkedin : "https://" + data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.contact.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</a>
            </>
          )}
          {data?.contact?.github && (
            <>
              <span className="text-gray-400">|</span>
              <a href={data.contact.github.startsWith("http") ? data.contact.github : "https://" + data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.contact.github.replace(/^https?:\/\/(www\.)?/, "")}</a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {data?.intro?.summary && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-[12px] leading-[18px] text-gray-700">
            {data.intro.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data?.visible?.experience !== false && data?.experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[13px] font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-[11px] text-gray-500 shrink-0 ml-2">{exp.years}</span>
                </div>
                <p className="text-[12px] text-gray-600 italic">{exp.company}</p>
                {exp.desc && (
                  <p className="text-[12px] leading-[17px] text-gray-700 mt-1 whitespace-pre-line">{exp.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data?.visible?.projects !== false && data?.projects?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <h3 className="text-[13px] font-bold text-gray-900">{proj.title}</h3>
                {proj.desc && (
                  <p className="text-[12px] leading-[17px] text-gray-700 mt-0.5 whitespace-pre-line">{proj.desc}</p>
                )}
                {proj.tech?.length > 0 && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    <span className="font-semibold">Technologies:</span> {proj.tech.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data?.visible?.skills !== false && data?.skills?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <p className="text-[12px] text-gray-700 leading-[18px]">
            {data.skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Education */}
      {data?.visible?.education !== false && data?.education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-[13px] font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-[12px] text-gray-600">{edu.school}</p>
                </div>
                <span className="text-[11px] text-gray-500 shrink-0 ml-2">{edu.years}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data?.visible?.certifications !== false && data?.certifications?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">
            Certifications
          </h2>
          <div className="space-y-1">
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <span className="text-[12px] text-gray-700">
                  {cert.title}{cert.issuer ? ` — ${cert.issuer}` : ''}
                </span>
                {cert.year && <span className="text-[11px] text-gray-500 ml-2">{cert.year}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
