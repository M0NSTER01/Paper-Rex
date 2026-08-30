const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Trash2 to lucide-react imports
content = content.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, Trash2 } from 'lucide-react';");

// 2. Add handleDelete function
const deleteFunc = `
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio? This cannot be undone.")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(\`https://4zxl3477-5000.inc1.devtunnels.ms/api/portfolios/\${id}\`, {
        headers: { Authorization: \`Bearer \${token}\` }
      });
      setPortfolios(portfolios.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete portfolio');
    }
  };
`;
content = content.replace(/(const fetchPortfolios = useCallback\(async \(\) => \{)/, deleteFunc + '\n  $1');

// 3. Add Delete button in the UI
const buttonUI = `
                      <Link to={\`/portfolio/\${portfolio.id}\`} className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white py-2 rounded-md font-semibold text-sm transition shadow-sm">
                        <ExternalLink className="w-4 h-4" /> View
                      </Link>
                      <button onClick={() => handleDelete(portfolio.id)} className="flex justify-center items-center p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-md transition" title="Delete Portfolio">
                        <Trash2 className="w-4 h-4" />
                      </button>
`;

content = content.replace(/<Link to=\{`\/portfolio\/\$\{portfolio\.id\}`\}[\s\S]*?<\/Link>/, buttonUI);

fs.writeFileSync(file, content);
