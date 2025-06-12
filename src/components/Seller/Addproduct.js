import React, { useState } from "react";
import "../../styles.css";
import { useAppContext } from '../../context/AppContext';

const AddProduct = () => {
  const { baseURL} = useAppContext();
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: null,
    productQuantity: "",
    productImage: null
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
      console.log(formData);
      const requestBody = {
        productName: formData.productName,
        productCategory: formData.productCategory,
        productDescription: formData.productDescription,
        productPrice: formData.productPrice,
        productQuantity: formData.productQuantity,
        productImage: formData.productImage
      };

      console.log(requestBody);
      console.log(JSON.stringify(requestBody));

      const token = localStorage.getItem("token");

      const response = await fetch(`${baseURL}/seller`, {
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
          productName: "",
          productCategory: "",
          productDescription: "",
          productPrice: "",
          productImage: null
        });
      } else {
        let errorMessage = "Unknown error";
        console.log(response.status);
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
          name="productCategory"
          placeholder="Define category"
          className="ad-input"
          value={formData.productCategory}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="productImage"
          accept="image/*"
          className="ad-input-file"
          onChange={handleChange}
        />

        <input
          type="number"
          name="productPrice"
          placeholder="Price per Quintal (₹)"
          className="ad-input"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />

        <textarea
          name="productDescription"
          placeholder="Product Description"
          className="ad-textarea"
          value={formData.productDescription}
          onChange={handleChange}
          required
        />

        <button type="submit" className="ad-button" disabled={loading}>
          {loading ? "Submitting..." : "Add to Sale"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
