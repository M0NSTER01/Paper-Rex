const fs = require('fs');

let file = 'frontend/src/pages/Auth.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { GoogleLogin }')) {
    content = content.replace("import { Mail, Lock, User, ArrowRight } from 'lucide-react';", "import { Mail, Lock, User, ArrowRight } from 'lucide-react';\nimport { GoogleLogin } from '@react-oauth/google';");
}

const handleGoogleSuccess = `
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('https://4zxl3477-5000.inc1.devtunnels.ms/api/auth/google', { token: credentialResponse.credential });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    }
  };
`;

content = content.replace("const handleSubmit = async", handleGoogleSuccess + "\n  const handleSubmit = async");

const regexMock = /<button[\s\S]*?onClick=\{\(e\) => \{ e\.preventDefault\(\); alert\("Mocked Google Login"\); \}\}[\s\S]*?<\/button>/;
const replacementMock = `<div className="flex justify-center w-full"><GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google login failed')} useOneTap /></div>`;

content = content.replace(regexMock, replacementMock);

fs.writeFileSync(file, content);
