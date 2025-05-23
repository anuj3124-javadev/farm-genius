// CropList.js
import React, { useEffect, useState } from "react";
import "../styles.css";

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://new-api.productsscout.in/farmer/crops", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch crops", err);
        setLoading(false);
      });
  }, );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      const response = await fetch(
        `https://new-api.productsscout.in/farmer/removeCrop/${id}/`,
        {
          method: "DELETE",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        }
      );

      if (response.ok) {
        alert("Crop deleted successfully!");
        setCrops((prev) => prev.filter((crop) => crop.id !== id));
      } else {
        alert("Failed to delete crop.");
      }
    } catch (err) {
      alert("Error deleting crop: " + err.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading crops...</p>;

  return (
    <div className="crop-list-container">
      <h2 className="crop-title">My Crops</h2>
      {crops.length === 0 ? (
        <p>No crops found.</p>
      ) : (
        crops.map((crop) => (
          <div key={crop.cropId} className="crop-card">
            <img src={crop.photo} alt={crop.cropName} className="crop-img" />
            <div className="crop-info">
              <h3>{crop.cropName}</h3>
              <p>Land Size: {crop.landArea} acres</p>
              <p>Price: ₹{crop.price} per quintal</p>
              <p>Quantity: {crop.quantity} quintals</p>
              <p>{crop.description}</p>
              <div className="crop-buttons">
                <button className="crop-btn detail-btn">Details</button>
                <button
                  className="crop-btn delete-btn"
                  onClick={() => handleDelete(crop.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CropList;
