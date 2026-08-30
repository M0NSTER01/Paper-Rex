const fs = require('fs');

let file = '../frontend/src/pages/Editor.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add QRCodeCanvas import
content = content.replace(/(import axios from 'axios';)/, "$1\nimport { QRCodeCanvas } from 'qrcode.react';");

// 2. Add State for Share Modal
const stateRegex = /const \[saved, setSaved\] = useState\(false\);/;
content = content.replace(stateRegex, "const [saved, setSaved] = useState(false);\n  const [showShareModal, setShowShareModal] = useState(false);\n  const [copied, setCopied] = useState(false);");

// 3. Add Share Button
const buttonRegex = /<button onClick=\{handleDeploy\}/;
const shareButton = `
            {data.liveUrl && (
              <button onClick={() => setShowShareModal(true)} className="flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-100 transition shadow-sm">
                <Share2 className="w-4 h-4" /> Share
              </button>
            )}
            <button onClick={handleDeploy}`;
content = content.replace(buttonRegex, shareButton);

// 4. Add Share Modal
const copyFunc = `
  const handleCopy = () => {
    navigator.clipboard.writeText(data.liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
`;
// Wait, I can just inline handleCopy in the modal, but better to put it right before return
content = content.replace(/(return \()/, copyFunc + '\n  $1');

const shareModal = `
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-geist text-gray-900 flex items-center gap-2"><Share2 className="w-5 h-5"/> Share Portfolio</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <QRCodeCanvas value={data.liveUrl} size={180} level={"H"} className="rounded-lg shadow-sm" />
              <p className="text-xs text-gray-500 mt-4 text-center">Scan to open on mobile</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live URL</label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={data.liveUrl} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none" />
                <button onClick={handleCopy} className="bg-[var(--color-primary)] text-white p-2.5 rounded-lg hover:bg-[var(--color-secondary)] transition shadow-sm" title="Copy to clipboard">
                  {copied ? <span className="material-symbols-outlined text-xl">check</span> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(/(    <\/div>\s*  \);\s*\}\s*$)/, shareModal + '\n$1');

fs.writeFileSync(file, content);
