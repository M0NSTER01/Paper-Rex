const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Imports
content = content.replace(/(import \{ [^\}]+ \} from 'lucide-react';)/, "$1\nimport { QRCodeCanvas } from 'qrcode.react';");
if (!content.includes('Share2')) content = content.replace(/Trash2/, 'Trash2, Share2, Copy');

// 2. States for Modal
content = content.replace(/(const \[newPortfolioName, setNewPortfolioName\] = useState\(''\);)/, "$1\n  const [shareUrl, setShareUrl] = useState(null);\n  const [copied, setCopied] = useState(false);");

// 3. handleCopy function
const handleCopyFunc = `
  const handleCopy = () => {
    if(!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
`;
content = content.replace(/(const handleDelete = async)/, handleCopyFunc + '\n  $1');

// 4. Update Deploy link maps to include Share button
// Latest Deploy
const latestRegex = /<button onClick=\{\(\) => handleDeleteDeploy\(portfolio\.id, 0\)\}[\s\S]*?<\/button>/;
const latestReplacement = `<div className="flex items-center gap-1 opacity-0 group-hover/latest:opacity-100 transition-opacity">
                                <button onClick={() => setShareUrl(portfolio.data.liveUrl)} className="text-blue-300 hover:text-blue-600 transition-colors" title="Share latest deploy link">
                                  <Share2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDeleteDeploy(portfolio.id, 0)} className="text-blue-300 hover:text-red-500 transition-colors" title="Delete latest deploy link">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>`;
content = content.replace(latestRegex, latestReplacement);

// Previous Deploys
const prevRegex = /<button onClick=\{\(\) => handleDeleteDeploy\(portfolio\.id, i \+ 1\)\}[\s\S]*?<\/button>/;
const prevReplacement = `<div className="flex items-center gap-1 opacity-0 group-hover/dep:opacity-100 transition-opacity">
                                          <button onClick={() => setShareUrl(dep.url)} className="text-gray-300 hover:text-blue-500 transition-colors" title="Share this deploy link">
                                            <Share2 className="w-3 h-3" />
                                          </button>
                                          <button onClick={() => handleDeleteDeploy(portfolio.id, i + 1)} className="text-gray-300 hover:text-red-500 transition-colors" title="Delete this deploy link">
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>`;
content = content.replace(prevRegex, prevReplacement);

// 5. Add Share Modal
const shareModal = `
        {/* Share Modal */}
        {shareUrl && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-geist text-gray-900 flex items-center gap-2"><Share2 className="w-5 h-5"/> Share Deploy</h3>
                <button onClick={() => setShareUrl(null)} className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="flex flex-col items-center justify-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <QRCodeCanvas value={shareUrl} size={180} level={"H"} className="rounded-lg shadow-sm" />
                <p className="text-xs text-gray-500 mt-4 text-center">Scan to open on mobile</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live URL</label>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={shareUrl} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none" />
                  <button onClick={handleCopy} className="bg-[var(--color-primary)] text-white p-2.5 rounded-lg hover:bg-[var(--color-secondary)] transition shadow-sm" title="Copy to clipboard">
                    {copied ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
`;

content = content.replace(/(      <\/div>\s*    \);\s*\})\s*$/, shareModal + '\n$1');

fs.writeFileSync(file, content);
