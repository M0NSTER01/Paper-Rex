import React from 'react';

export default function MinimalistTemplate({ data }) {
  if (!data || !data.basics) return <div>No data available</div>;

  return (
    <div className="bg-white text-black font-sans min-h-screen p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-light mb-1">{data.basics.name}</h1>
          <h2 className="text-gray-500 font-light tracking-wide">{data.basics.label}</h2>
          <div className="mt-4 text-xs text-gray-400">
            {data.basics.email} <br className="sm:hidden" /> <span className="hidden sm:inline">/</span> {data.basics.phone}
          </div>
        </header>

        <section className="mb-8 md:mb-12">
          <p className="text-sm leading-relaxed text-gray-700">{data.basics.summary}</p>
        </section>

        {data.experience && (
          <section className="mb-8 md:mb-12">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Experience</h3>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-8 flex flex-col sm:flex-row">
                <div className="w-full sm:w-32 flex-shrink-0 text-xs text-gray-400 pt-1 mb-2 sm:mb-0">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{exp.position}</h4>
                  <div className="text-xs text-gray-500 mb-2">{exp.company}</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exp.highlights?.map((h, i) => <li key={i}>- {h}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.skills && (
          <section className="mb-12">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Skills</h3>
            <p className="text-sm text-gray-700">{data.skills.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
