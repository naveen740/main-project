import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/EditProfilePage.css";

const EditProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    companyName: "",
    whatsappNumber: "",
    city: "",
    state: "",
    billingDetails: "",
    shippingDetails: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/editProfile/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
            },
          }
        );
        setUserData(response.data);
        setFormData({
          username: response.data.username,
          companyName: response.data.companyName,
          whatsappNumber: response.data.whatsappNumber,
          city: response.data.city,
          state: response.data.state,
          billingDetails: response.data.billingDetails, // Update to billingDetails
          shippingDetails: response.data.shippingDetails,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/editProfile/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
          },
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div className="user-profile">
        <div className="user-details">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            WhatsApp Number:
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Billing Address:
            <input
              type="text"
              name="billingAddress"
              value={formData.billingDetails}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Shipping Address:
            <input
              type="text"
              name="shippingAddress"
              value={formData.shippingDetails}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
        </div>
      </div>
      {isEditing ? (
        <button className="save-button" onClick={handleSaveChanges}>
          Save
        </button>
      ) : (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default EditProfilePage;
