// ✅ Crophealth.js
import React, { useState } from 'react';
import '../styles.css';

const Crophealth = () => {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [cropName, setCropName] = useState('');
  const [landSize, setLandSize] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((img, i) => formData.append('images', img));
    formData.append('cropName', cropName);
    formData.append('landSize', landSize);
    formData.append('description', description);

    try {
      const res = await fetch('http://ml.productsscout.xyz/api/crop-details-chatbot/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ch-container">
      <h2>Crop Health Analysis</h2>
      <form onSubmit={handleSubmit} className="ch-input-form">
        <label>Upload Crop Images (Max 3):</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <div className="ch-preview-container">
          {preview.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt={`preview-${idx}`} className="ch-image-preview" />
          ))}
        </div>

        <input
          type="text"
          placeholder="Crop Name"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Land Size (in acres/hectares)"
          value={landSize}
          onChange={(e) => setLandSize(e.target.value)}
        />
        <textarea
          placeholder="Description or notes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Analyze Crop Health</button>
      </form>

      {result && (
        <div className="ch-result">
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Crophealth;