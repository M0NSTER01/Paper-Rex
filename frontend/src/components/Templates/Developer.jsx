import React from 'react';

export default function DeveloperTemplate({ data }) {
  if (!data || !data.basics) return <div>No data available</div>;

  return (
    <div className="bg-gray-900 text-green-400 font-mono min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto border border-green-500 p-4 md:p-8 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)]">
        <header className="mb-6 md:mb-8 border-b border-green-800 pb-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">&gt; {data.basics.name}_</h1>
          <h2 className="text-lg md:text-xl text-green-200 mb-2">Role: {data.basics.label}</h2>
          <div className="text-xs md:text-sm text-green-300">
            {data.basics.email} <br className="md:hidden" /> <span className="hidden md:inline">|</span> {data.basics.phone}
          </div>
        </header>

        <section className="mb-8">
          <h3 className="text-2xl border-b border-green-800 mb-4 inline-block">./summary</h3>
          <p className="leading-relaxed">{data.basics.summary}</p>
        </section>

        {data.skills && (
          <section className="mb-8">
            <h3 className="text-2xl border-b border-green-800 mb-4 inline-block">./skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="bg-green-900 text-green-100 px-3 py-1 rounded-sm text-sm border border-green-700">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.experience && data.experience.map((exp, idx) => (
          <section key={idx} className="mb-6 border-l-2 border-green-700 pl-4">
            <h4 className="text-xl font-semibold">{exp.position} @ {exp.company}</h4>
            <div className="text-sm text-green-300 mb-2">{exp.startDate} - {exp.endDate}</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {exp.highlights?.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
