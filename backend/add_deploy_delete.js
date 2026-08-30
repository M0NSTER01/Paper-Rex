const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

const deleteDeployFunc = `
  const handleDeleteDeploy = async (portfolioId, index) => {
    if (!window.confirm("Delete this deployment link?")) return;
    const portfolio = portfolios.find(p => p.id === portfolioId);
    if (!portfolio) return;
    
    const newDeployments = [...portfolio.data.deployments];
    newDeployments.splice(index, 1);
    
    // If we delete the latest deploy (index 0), we should probably update liveUrl to the new index 0 (if exists)
    const newLiveUrl = newDeployments.length > 0 ? newDeployments[0].url : '';
    const newData = { ...portfolio.data, deployments: newDeployments, liveUrl: newLiveUrl };
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(\`https://4zxl3477-5000.inc1.devtunnels.ms/api/portfolios/\${portfolioId}\`, {
        data: newData,
        theme: portfolio.theme
      }, { headers: { Authorization: \`Bearer \${token}\` } });
      
      setPortfolios(portfolios.map(p => p.id === portfolioId ? { ...p, data: newData } : p));
    } catch (err) {
      console.error(err);
      alert('Failed to delete deployment');
    }
  };
`;
content = content.replace(/(const handleDelete = async)/, deleteDeployFunc + '\n  $1');

const prevDeploysRegex = /\{portfolio\.data\.deployments\.slice\(1\)\.map\(\(dep, i\) => \([\s\S]*?<\/a>\n\s*\)\)\}/;
const newPrevDeploys = `{portfolio.data.deployments.slice(1).map((dep, i) => (
                                    <div key={i} className="flex items-center justify-between group/dep">
                                      <a href={dep.url} target="_blank" rel="noreferrer" className="block truncate text-gray-400 hover:text-blue-500 transition-colors" title={dep.url}>
                                        {new Date(dep.date).toLocaleString()}
                                      </a>
                                      <button onClick={() => handleDeleteDeploy(portfolio.id, i + 1)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover/dep:opacity-100 transition-opacity" title="Delete this deploy link">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}`;

content = content.replace(prevDeploysRegex, newPrevDeploys);

const latestDeployRegex = /<a href=\{portfolio\.data\.liveUrl\} target="_blank"[\s\S]*?Latest Deploy \(Live on Netlify\)\n\s*<\/a>/;
const newLatestDeploy = `<div className="flex items-center justify-between bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 group/latest">
                            <a href={portfolio.data.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              Latest Deploy (Live on Netlify)
                            </a>
                            <button onClick={() => handleDeleteDeploy(portfolio.id, 0)} className="text-blue-300 hover:text-red-500 opacity-0 group-hover/latest:opacity-100 transition-opacity" title="Delete latest deploy link">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>`;
                          
content = content.replace(latestDeployRegex, newLatestDeploy);

fs.writeFileSync(file, content);
