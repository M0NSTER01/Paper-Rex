import React from 'react';

export default function CreativeTemplate({ data }) {
  if (!data || !data.basics) return <div>No data available</div>;

  return (
    <div className="bg-yellow-50 text-gray-900 font-sans min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 left-0 w-40 md:w-72 h-40 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto relative z-10 bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-xl">
        <header className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-2">
            {data.basics.name}
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-700">{data.basics.label}</h2>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm font-semibold text-pink-600">
            <span>{data.basics.email}</span>
            <span>{data.basics.phone}</span>
          </div>
        </header>

        <section className="mb-8 md:mb-12 bg-pink-50 p-4 md:p-6 rounded-2xl border-l-4 border-pink-500">
          <p className="text-base md:text-lg leading-relaxed italic text-gray-700">"{data.basics.summary}"</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-12">
            {data.experience && (
              <section>
                <h3 className="text-3xl font-bold text-violet-600 mb-6 flex items-center gap-2">
                  <span className="text-4xl">✨</span> Experience
                </h3>
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="mb-8 relative pl-6 border-l-2 border-violet-200">
                    <div className="absolute w-3 h-3 bg-violet-500 rounded-full -left-[7px] top-2"></div>
                    <h4 className="text-xl font-bold text-gray-800">{exp.position}</h4>
                    <div className="text-violet-600 font-semibold mb-2">{exp.company} <span className="text-gray-400 font-normal">| {exp.startDate} - {exp.endDate}</span></div>
                    <ul className="list-none space-y-2 text-gray-600">
                      {exp.highlights?.map((h, i) => <li key={i}>👉 {h}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div className="space-y-12">
            {data.skills && (
              <section>
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Superpowers</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="bg-gradient-to-r from-pink-100 to-violet-100 text-violet-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
