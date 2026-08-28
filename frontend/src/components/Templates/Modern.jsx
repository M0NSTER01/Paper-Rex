import React from 'react';

export default function ModernTemplate({ data }) {
  if (!data || !data.basics) return <div>No data available</div>;

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
            <div className="w-20 md:w-24 h-20 md:h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              {data.basics.name.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold">{data.basics.name}</h1>
            <h2 className="text-indigo-600 font-medium mb-4">{data.basics.label}</h2>
            <div className="text-sm text-gray-500 space-y-2">
              <p>{data.basics.email}</p>
              <p>{data.basics.phone}</p>
            </div>
          </div>

          {data.skills && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-lg font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold mb-4">About Me</h3>
            <p className="text-gray-600 leading-relaxed">{data.basics.summary}</p>
          </div>

          {data.experience && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-xl font-bold mb-6">Experience</h3>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-500 before:rounded-full">
                    <h4 className="font-bold">{exp.position}</h4>
                    <div className="text-sm text-indigo-600 mb-2">{exp.company} • <span className="text-gray-400">{exp.startDate} - {exp.endDate}</span></div>
                    <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                      {exp.highlights?.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
