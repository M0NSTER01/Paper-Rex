const fs = require('fs');
let file = 'frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

const modalHtml = `
      {/* Deployment Success Modal */}
      {deploySuccessUrl && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold font-geist mb-2 text-gray-900">Deployed Successfully!</h3>
            <p className="text-gray-500 mb-6 text-sm">Your portfolio is now live on Netlify.</p>
            <div className="space-y-3">
              <a 
                href={deploySuccessUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[var(--color-secondary)] transition-colors shadow-md hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5" /> Open Live Site
              </a>
              <button 
                onClick={() => setDeploySuccessUrl(null)}
                className="w-full py-3 px-4 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(/    <\/div>\s*  \);\s*\}\s*$/, modalHtml);
fs.writeFileSync(file, content);
