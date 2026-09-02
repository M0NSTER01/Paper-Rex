const fs = require('fs');
let c = fs.readFileSync('src/pages/Editor.jsx', 'utf8');

const enhanceFn = `  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceSummary = async () => {
    try {
      setIsEnhancing(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(\`\${import.meta.env.VITE_BACKEND_URL}/api/enhance-summary\`, { data }, {
        headers: { 'Authorization': \`Bearer \${token}\` }
      });
      if (res.data.enhancedSummary) {
        setData(prev => ({
          ...prev,
          intro: { ...prev.intro, summary: res.data.enhancedSummary }
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to enhance summary');
    } finally {
      setIsEnhancing(false);
    }
  };

  const calculateCompletion`;

c = c.replace('  const calculateCompletion', enhanceFn);

const labelTarget = `<label className="block text-xs font-semibold text-gray-500 mb-1">Summary</label>`;
const labelReplacement = `<div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-500">Summary</label>
                    <button onClick={handleEnhanceSummary} disabled={isEnhancing} className="text-xs text-[var(--color-primary)] font-semibold flex items-center gap-1 hover:underline disabled:opacity-50">
                      {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className="material-symbols-outlined text-[14px]">auto_awesome</span>}
                      {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                    </button>
                  </div>`;

c = c.replace(labelTarget, labelReplacement);

fs.writeFileSync('src/pages/Editor.jsx', c);
console.log('Fixed Editor.jsx summary enhance');
