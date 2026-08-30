const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{portfolio\.data\?\.liveUrl && \([\s\S]*?Live on Netlify\n\s*<\/a>\n\s*<\/div>\n\s*\)\}/;

const replacement = `{portfolio.data?.liveUrl && (
                        <div className="mb-4 space-y-2">
                          <a href={portfolio.data.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md hover:bg-blue-100 transition border border-blue-100">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            Latest Deploy (Live on Netlify)
                          </a>
                          
                          {portfolio.data?.deployments && portfolio.data.deployments.length > 1 && (
                            <div className="mt-2 text-xs text-gray-500">
                              <p className="font-semibold mb-1">Previous Deploys:</p>
                              <div className="max-h-24 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                {portfolio.data.deployments.slice(1).map((dep, i) => (
                                  <a key={i} href={dep.url} target="_blank" rel="noreferrer" className="block truncate text-gray-400 hover:text-blue-500 transition-colors" title={dep.url}>
                                    {new Date(dep.date).toLocaleString()}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content);
