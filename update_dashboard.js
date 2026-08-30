const fs = require('fs');

let content = fs.readFileSync('frontend/src/pages/Dashboard.jsx', 'utf8');

const newExtractionLogic = `
  const [extractedData, setExtractedData] = useState(null);

  const processFile = async (file) => {
    if (!file) return;
    setModalStep('extracting');
    setProgress(10);
    
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      // Simulate progress while waiting
      const interval = setInterval(() => {
        setProgress(p => Math.min(p + 15, 90));
      }, 500);

      const res = await axios.post('http://localhost:5000/api/extract-resume', formData, {
        headers: { 
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      clearInterval(interval);
      setProgress(100);
      setExtractedData(res.data);
      
      setTimeout(() => {
        setModalStep('theme');
      }, 800);
    } catch (err) {
      console.error("Extraction failed", err);
      alert("Failed to extract data. Make sure the backend has a valid Gemini API Key.");
      setShowNewModal(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleCreateNew = async (theme) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/portfolios', 
        { 
          name: newPortfolioName || 'Untitled Portfolio', 
          theme: theme || 'Minimalist',
          data: extractedData 
        },
        { headers: { Authorization: \`Bearer \${token}\` } }
      );
      navigate(\`/editor?id=\${res.data.id}\`);
    } catch (err) {
      console.error(err);
      alert('Error creating portfolio');
    }
  };
`;

// Replace simulateExtraction and old handleDrop, handleFileChange, handleCreateNew
content = content.replace(/const handleCreateNew = async.*?};/s, '');
content = content.replace(/const simulateExtraction =.*?};/s, '');
content = content.replace(/const handleDrop =.*?}, \[\]\);/s, '');
content = content.replace(/const handleFileChange =.*?};/s, '');
content = content.replace(/const handleDrag = useCallback.*?}, \[\]\);/s, `const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);\n\n` + newExtractionLogic);

fs.writeFileSync('frontend/src/pages/Dashboard.jsx', content);
console.log('Updated Dashboard.jsx logic');
