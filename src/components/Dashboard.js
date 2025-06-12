import React, { useEffect, useState } from 'react';
import "../styles.css";
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [showEditPic, setShowEditPic] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [role, setRole] = useState("");
  
  const { baseURL} = useAppContext();

  const getEndpointByRole = (role) => {
    if (role === "farmer") return `${baseURL}/farmer`;
    if (role === "buyer") return `${baseURL}/buyer`;
    if (role === "seller") return `${baseURL}/seller`;
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Try each role endpoint until success
      const roles = ["farmer", "buyer", "seller"];
      for (let r of roles) {
        try {
          const res = await fetch(getEndpointByRole(r), {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUserData(data);
            setRole(r);
            break;
          }
        } catch (error) {
          console.error(`Error fetching ${r} data:`, error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    const fileInput = document.getElementById("profile-upload");
    const file = fileInput?.files[0];
    if (!file || !role) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(getEndpointByRole(role), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setShowEditPic(false);
        setPreviewImage(null);
      }
    } catch (err) {
      console.error("Profile picture update failed", err);
    }
  };

  const handleProfileUpdate = async () => {
    const name = document.getElementById("update-name").value;
    const email = document.getElementById("update-email").value;
    const phone = document.getElementById("update-phone").value;
    const bio = document.getElementById("update-bio").value;

    const formData = {
      farmerName: name,
      farmerEmail: email,
      farmerPhone: phone,
      bio: bio
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(getEndpointByRole(role), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(getEndpointByRole(role), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      console.error("Error deleting profile", err);
    }
  };

  return (
    <div className="da-dashboard-container">
      <div className="da-main-content">
        <div className="da-settings-header">
          <h1>Settings</h1>
          <p>Update your profile and details</p>
        </div>

        <div className="da-dashboard-body">
          <div className="da-profile-card">
            <img
              src={previewImage || userData?.farmerProfilePic || userData?.buyerProfilePic || userData?.sellerProfilePic || "https://via.placeholder.com/100"}
              alt="User"
              className={`da-profile-img ${showEditPic ? "da-profile-img-active" : ""}`}
              onClick={() => setShowEditPic(!showEditPic)}
            />
            <h2 className="da-profile-name">{userData?.farmerName || userData?.buyerName || userData?.sellerName || "Your Name"}</h2>
            <p className="da-profile-subtext">{role.toUpperCase()}</p>

            {showEditPic && (
              <div className="da-edit-area">
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="da-profile-upload"
                  onChange={handleImageChange}
                />
                <button className="da-update-btn" onClick={handleImageUpload}>
                  Save Profile Picture
                </button>
              </div>
            )}

            <button className="da-delete-btn" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </div>

          <div className="da-form-section">
            <div className="da-ad-input">
              <label>Name</label>
              <input id="update-name" type="text" defaultValue={userData?.farmerName || userData?.buyerName || userData?.sellerName || ""} />
            </div>
            <div className="da-ad-input">
              <label>Email</label>
              <input id="update-email" type="email" defaultValue={userData?.farmerEmail || userData?.buyerEmail || userData?.sellerEmail || ""} />
            </div>
            <div className="da-ad-input">
              <label>Phone</label>
              <input id="update-phone" type="text" defaultValue={userData?.farmerContact || userData?.buyerContact || userData?.sellerContact || ""} />
            </div>
            <div className="da-ad-input">
              <label>Bio</label>
              <textarea id="update-bio" defaultValue={userData?.bio || ""}></textarea>
            </div>
            <button className="da-update-btn" onClick={handleProfileUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
