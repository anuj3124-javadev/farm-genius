import React, { useState } from "react";
import "../styles.css";
import { useAppContext } from '../context/AppContext';

const AddProduct = () => {
  const { baseURL} = useAppContext();
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
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
    
    try {
      const requestBody = {
        cropName: formData.cropName,
        quantity: formData.quantity,
        photo: formData.photo,
        price: formData.price,
        description: formData.description,
      };

      let token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/farmer/addCrop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });


      if (response.ok) {
        const result = await response.json();
        alert("Crop submitted successfully!");
        console.log("Response:", result);
        setFormData({
          cropName: "",
          quantity: "",
          photo: null,
          price: "",
          description: "",
        });
      } else {
        let errorMessage = "Unknown error";
        console.log(response.status);
        console.log(await response.json());
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
          name="cropName"
          placeholder="Product Name"
          className="ad-input"
          value={formData.cropName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="quantity"
          placeholder="Quantity (e.g. 10 Quintals)"
          className="ad-input"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="photo"
          accept="image/*"
          className="ad-input-file"
          onChange={handleChange}
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
