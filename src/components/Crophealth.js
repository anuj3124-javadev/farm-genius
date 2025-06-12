import React, { useState } from 'react';
import '../styles.css';
import { useAppContext } from '../context/AppContext';

const Crophealth = () => {
  const { baseURL} = useAppContext();
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

  // Simulated image upload function — replace with your real uploader
  const uploadImageAndGetURL = async (file) => {
    // Replace this with real upload logic (e.g., Cloudinary)
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeURL = `https://your-image-host.com/${file.name}`;
        resolve(fakeURL);
      }, 1000);
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (images.some((img) => img === null)) {
    alert('Please upload all 3 images.');
    return;
  }

  setLoading(true);

  try {
    // Upload images and get URLs
    const imageUrls = await Promise.all(images.map(uploadImageAndGetURL));

    const payload = {
      ...formData,
      images: imageUrls,
    };

    const res = await fetch(`${baseURL}/public/health`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text(); // get raw response first

    if (!res.ok) {
      console.error('❌ API call failed:', {
        status: res.status,
        statusText: res.statusText,
        responseText,
        payloadSent: payload,
      });
      throw new Error(`Request failed with status ${res.status}: ${res.statusText}`);
    }

    // Try to parse JSON response
    try {
      const data = JSON.parse(responseText);
      setResult(data);
      console.log('✅ Success:', data);
    } catch (jsonErr) {
      console.error('⚠️ Could not parse JSON:', responseText);
      alert('Received unexpected response format from the server.');
    }

  } catch (err) {
    console.error('🚨 Error during submission:', err);
    alert('Something went wrong. Check console for details.');
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
