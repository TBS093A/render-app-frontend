import React, { useEffect, useState } from 'react';
import api from '../services/api'; // or a dedicated function

function FormRenders() {
  const [renders, setRenders] = useState([]);

  const fetchRenders = async () => {
    try {
      // GET /renders? (Your backend might differ.)
      // Must handle pagination if needed
      const res = await api.get('/renders', { params: { page: 1, limit: 10 } });
      setRenders(res.data.items || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load renders');
    }
  };

  useEffect(() => {
    fetchRenders();
  }, []);

  const handleDownload = (s3Key) => {
    // If the backend returns a direct S3 link, just open it:
    // window.open(downloadUrl, '_blank');

    // Otherwise, if you only have s3Key, you might need to build the S3 URL or call a backend endpoint that redirects.
    const s3Url = `https://YOUR_BUCKET.s3.amazonaws.com/${s3Key}`;
    window.open(s3Url, '_blank');
  };

  return (
    <div style={{ margin: '1rem' }}>
      <h2>Renders</h2>
      {renders.map((r) => (
        <div key={r.id} style={{ marginBottom: '0.5rem' }}>
          <strong>{r.name}</strong> (ID: {r.id}) &nbsp;
          {r.s3Key && (
            <button onClick={() => handleDownload(r.s3Key)}>Download ZIP</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormRenders;
