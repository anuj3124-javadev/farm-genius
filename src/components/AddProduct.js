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
    payload.append("cropName", formData.productName);
    payload.append("landArea", formData.landSize);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    payload.append("photo", formData.photo);
  
    console.log("Payload content:");
    for (let [key, value] of payload.entries()) {
      console.log(key, value);
    }
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("https://new-api.productsscout.in/farmer/addCrop/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: Do NOT set 'Content-Type' when using FormData
        },
        body: payload,
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Crop submitted successfully!");
        console.log("Response:", result);
        setFormData({
          productName: "",
          landSize: "",
          photo: null,
          price: "",
          description: "",
        });
      } else {
        let errorMessage = "Unknown error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = "Server did not return JSON";
        }
        alert("Submission failed: " + errorMessage);
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
          // required
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
