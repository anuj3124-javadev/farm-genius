import React, { useState } from "react";
import "../styles.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    landSize: "",
    photo: null,
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("product_name", formData.productName);
    payload.append("land_size", formData.landSize);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    payload.append("photo", formData.photo);

    try {
      const response = await fetch("https://new-api.productsscout.in/farmer/addCrop/", {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        alert("Crop submitted successfully!");
        console.log("Response:", result);
        // Optional: Reset form
        setFormData({
          productName: "",
          landSize: "",
          photo: null,
          price: "",
          description: "",
        });
      } else {
        const error = await response.json();
        alert("Submission failed: " + (error.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error submitting form: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ad-container">
      <form className="ad-form" onSubmit={handleSubmit}>
        <h2 className="ad-title">Add New Crop</h2>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          className="ad-input"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="landSize"
          placeholder="Land Size (in acres)"
          className="ad-input"
          value={formData.landSize}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="photo"
          accept="image/*"
          className="ad-input-file"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price per Quintal (₹)"
          className="ad-input"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          className="ad-textarea"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="ad-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Crop"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
