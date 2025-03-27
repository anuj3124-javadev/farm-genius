import React, { useState } from "react";

const Ai = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [landSize, setLandSize] = useState("");
  const [seedRequirement, setSeedRequirement] = useState("");
  const [production, setProduction] = useState("");
  const [price, setPrice] = useState("");

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  return (
    <div className="ai-container">
      <h2 className="ai-title">Upload Images & Enter Details</h2>

      {/* Image Upload */}
      <label className="ai-upload">
        Click to Upload Images (Max 3)
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} hidden />
      </label>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="ai-image-preview">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index + 1}`} />
          ))}
        </div>
      )}

      {/* Description Section */}
      <div className="grid gap-4">
        <textarea
          placeholder="Enter image description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="ai-textarea"
        />

        <input
          type="text"
          placeholder="Land Size (in acres)"
          value={landSize}
          onChange={(e) => setLandSize(e.target.value)}
          className="ai-input"
        />

        <input
          type="text"
          placeholder="Seed Requirement (kg)"
          value={seedRequirement}
          onChange={(e) => setSeedRequirement(e.target.value)}
          className="ai-input"
        />

        <input
          type="text"
          placeholder="Production (in tons)"
          value={production}
          onChange={(e) => setProduction(e.target.value)}
          className="ai-input"
        />

        <input
          type="text"
          placeholder="Current Price (per kg)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="ai-input"
        />

        <button className="ai-button">Submit</button>
      </div>
    </div>
  );
};

export default Ai;
