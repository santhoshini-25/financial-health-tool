import React, { useState } from 'react';
import axios from 'axios';

function Upload({ onInsights }) {  // Accept callback from App.js
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('Manufacturing');  // Default industry

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('industry', industry);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData);  // Backend endpoint
      onInsights(response.data);  // Pass data back to App.js
      alert('Upload successful! Check insights below.');
    } catch (error) {
      console.error(error);
      alert('Upload failed. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Upload Financial Data</h2>
      <input type="file" accept=".csv,.xlsx,.pdf" onChange={(e) => setFile(e.target.files[0])} />
      <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Retail">Retail</option>
        {/* Add more industries */}
      </select>
      <button onClick={handleUpload}>Upload and Analyze</button>
    </div>
  );
}

export default Upload;