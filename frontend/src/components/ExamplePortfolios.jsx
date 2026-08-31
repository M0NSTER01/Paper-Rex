import React from 'react';
import { ExternalLink } from 'lucide-react';

const examples = [
  { name: 'Redoyan Ul Haque', url: 'https://www.redoyanulhaque.me/' },
  { name: 'Majd Portfolio', url: 'https://majd-portfolio.framer.website/' },
  { name: 'Aabad Code', url: 'https://www.aaabadcode.com/' },
  { name: 'Sawad', url: 'https://sawad.framer.website/' },
  { name: 'Aayush Bharti', url: 'https://aayushbharti.in/' },
  { name: 'Akkila', url: 'https://akkila.dev/' },
  { name: 'Awrs', url: 'https://awrs.me/en' },
  { name: 'Aakarsh Dev', url: 'https://aakarsh-devhq.vercel.app/' }
];

export default function ExamplePortfolios() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-geist mb-4">Portfolios You Can Build</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-geist">
            Get inspired by these stunning portfolios. With Paper Rex, you can create highly professional, fast, and beautiful digital presences just like these.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {examples.map((example, idx) => (
            <a 
              key={idx} 
              href={example.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden border-b border-gray-100">
                <img 
                  src={`https://api.microlink.io/?url=${encodeURIComponent(example.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                  alt={`${example.name} preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://image.thum.io/get/width/600/crop/800/${example.url}`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 font-semibold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                    View Live <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 font-geist truncate">{example.name}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">{example.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
