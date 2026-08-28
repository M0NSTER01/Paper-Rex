import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeveloperTemplate from '../components/Templates/Developer';
import CorporateTemplate from '../components/Templates/Corporate';
import CreativeTemplate from '../components/Templates/Creative';
import MinimalistTemplate from '../components/Templates/Minimalist';
import ModernTemplate from '../components/Templates/Modern';

export default function PublicPortfolio() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/portfolios/${id}`);
        setData(res.data);
        // Log analytics hit
        axios.post(`http://localhost:5000/api/portfolios/${id}/hit`).catch(console.error);
      } catch (err) {
        setError('Portfolio not found');
      }
    };
    fetchData();
  }, [id]);

  if (error) return <div className="text-center p-12 text-red-600">{error}</div>;
  if (!data) return <div className="text-center p-12">Loading...</div>;

  const content = data.content;

  return (
    <div>
      {/* Hide this print button when printing using standard CSS in index.css */}
      <button 
        onClick={() => window.print()}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 no-print"
        title="Export to PDF"
      >
        🖨 Export PDF
      </button>

      {data.template === 'developer' && <DeveloperTemplate data={content} />}
      {data.template === 'corporate' && <CorporateTemplate data={content} />}
      {data.template === 'creative' && <CreativeTemplate data={content} />}
      {data.template === 'minimalist' && <MinimalistTemplate data={content} />}
      {data.template === 'modern' && <ModernTemplate data={content} />}
      
      {/* Fallback */}
      {!['developer', 'corporate', 'creative', 'minimalist', 'modern'].includes(data.template) && 
        <DeveloperTemplate data={content} />
      }
    </div>
  );
}
