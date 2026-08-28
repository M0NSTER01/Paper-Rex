import React from 'react';

export default function CorporateTemplate({ data }) {
  if (!data || !data.basics) return <div>No data available</div>;

  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 md:mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-blue-900 mb-2">{data.basics.name}</h1>
          <h2 className="text-lg md:text-xl text-gray-600 uppercase tracking-widest">{data.basics.label}</h2>
          <div className="mt-4 text-xs md:text-sm text-gray-500 space-x-2 md:space-x-4">
            <span>{data.basics.email}</span>
            <span className="hidden sm:inline">|</span>
            <br className="sm:hidden" />
            <span>{data.basics.phone}</span>
          </div>
        </header>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">Professional Summary</h3>
          <p className="leading-relaxed text-gray-700">{data.basics.summary}</p>
        </section>

        {data.experience && (
          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6">Experience</h3>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-bold">{exp.position}</h4>
                  <span className="text-sm font-semibold text-gray-600">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="text-md text-blue-800 font-medium mb-2">{exp.company}</div>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.highlights?.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {data.skills && (
          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
