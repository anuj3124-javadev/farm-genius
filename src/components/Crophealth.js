import React, { useState } from 'react';
import '../styles.css';

const Crophealth = () => {
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    landSize: '',
    description: '',
  });

  const [images, setImages] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews[index] = URL.createObjectURL(file);
    setPreviews(newPreviews);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.some((img) => img === null)) {
      alert('Please upload all 3 images.');
      return;
    }

    setLoading(true);

    try {
      const base64Images = await Promise.all(images.map((img) => toBase64(img)));

      const payload = {
        ...formData,
        images: base64Images,
      };
      console.log(formData);
      const res = await fetch('https://your-api-url.com/api/crop-disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to submit data.');
    }

    setLoading(false);
  };

  return (
    <div className="cd-container">
      <h2 className="cd-h2">🌿 Crop Disease Checker</h2>
      <form onSubmit={handleSubmit} className="cd-form">
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name"
          value={formData.cropName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="landSize"
          placeholder="Land Size"
          value={formData.landSize}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <div className="cd-image-section">
          {[0, 1, 2].map((index) => (
            <div key={index} className="cd-image-box">
              <label>Image {index + 1}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                required
              />
              {previews[index] && (
                <img src={previews[index]} alt={`preview-${index}`} className="cd-preview-img" />
              )}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} className="cd-btn">
          {loading ? 'Analyzing...' : 'Analyze Crop'}
        </button>
      </form>

      {result && (
        <div className="cd-result">
          <h3>📋 Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Crophealth;
