const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/Editor.jsx', 'utf8');

// Add handlePhotoUpload logic
const photoUploadLogic = `
  const handlePhotoUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/upload-image', formData, {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setData(prev => ({
        ...prev,
        intro: { ...prev.intro, photoUrl: res.data.photoUrl }
      }));
    } catch (err) {
      console.error('Failed to upload photo', err);
      alert('Failed to upload profile photo');
    }
  };
`;

if (!content.includes('handlePhotoUpload')) {
    content = content.replace('const handleSave = async', photoUploadLogic + '\n  const handleSave = async');
}

// Add UI component in Intro section
const photoUI = `
                <div className="flex items-center gap-4">
                  {data.intro?.photoUrl ? (
                    <div className="relative group w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                      <img src={data.intro.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                      <button onClick={() => setData({...data, intro: {...data.intro, photoUrl: ''}})} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4"/></button>
                    </div>
                  ) : (
                    <label className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-gray-400 transition">
                      <Plus className="w-6 h-6" />
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Profile Photo</label>
                    <p className="text-xs text-gray-400">Upload a professional headshot for your portfolio.</p>
                  </div>
                </div>
`;

if (!content.includes('Profile Photo')) {
    content = content.replace('<div className="space-y-4">\n                <div>\n                  <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>', '<div className="space-y-4">\n' + photoUI + '                <div>\n                  <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>');
}

fs.writeFileSync('frontend/src/pages/Editor.jsx', content);
console.log('Editor updated for photo upload');
