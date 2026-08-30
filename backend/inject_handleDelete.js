const fs = require('fs');

let file = '../frontend/src/pages/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

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

content = content.replace(/(const fetchPortfolios = async \(token\) => \{)/, deleteFunc + '\n  $1');

fs.writeFileSync(file, content);
