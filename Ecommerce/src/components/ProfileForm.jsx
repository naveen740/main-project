import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/ProfileForm.css"; // Import your CSS file for styling

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    whatsappNumber: "",
    city: "",
    state: "",
    billingDetails: "",
    shippingDetails: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const formDataObject = new FormData();

      formDataObject.append("companyName", formData.companyName);
      formDataObject.append("whatsappNumber", formData.whatsappNumber);
      formDataObject.append("city", formData.city);
      formDataObject.append("state", formData.state);
      formDataObject.append("billingDetails", formData.billingDetails);
      formDataObject.append("shippingDetails", formData.shippingDetails);
      formDataObject.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/profile-form",
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile form submitted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting profile form");
    }
  };

  return (
    <div className="profile-form-container">
      {" "}
      {/* Changed class name */}
      <h2 className="profile-form-title">Profile Form</h2>{" "}
      {/* Changed class name */}
      <form onSubmit={handleSubmit} className="profile-form">
        {" "}
        {/* Changed class name */}
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="profile-form-input"
          />
        </label>
        <br />
        <label>
          WhatsApp Number:
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="profile-form-input"
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="profile-form-input"
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="profile-form-input"
          />
        </label>
        <br />
        <label>
          Billing Details:
          <textarea
            name="billingDetails"
            value={formData.billingDetails}
            onChange={handleChange}
            className="profile-form-textarea"
          />
        </label>
        <br />
        <label>
          Shipping Details:
          <textarea
            name="shippingDetails"
            value={formData.shippingDetails}
            onChange={handleChange}
            className="profile-form-textarea"
          />
        </label>
        <br />
        <div className="profile-form-file-container">
          {" "}
          {/* Changed class name */}
          <label htmlFor="image" className="profile-form-upload-button">
            {" "}
            {/* Changed class name */}
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="profile-form-custom-file-input"
            onChange={handleImageChange}
          />
          {image && (
            <span className="profile-form-file-name">{image.name}</span>
          )}
        </div>
        <br />
        <button type="submit" className="profile-form-submit-button">
          Submit
        </button>{" "}
        {/* Changed class name */}
      </form>
    </div>
  );
};

export default ProfileForm;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProfileForm = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     whatsappNumber: "",
//     city: "",
//     state: "",
//     billingDetails: "",
//     shippingDetails: "",
//   });
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       console.log(token);
//       const formDataObject = new FormData();

//       formDataObject.append("companyName", formData.companyName);
//       formDataObject.append("whatsappNumber", formData.whatsappNumber);
//       formDataObject.append("city", formData.city);
//       formDataObject.append("state", formData.state);
//       formDataObject.append("billingDetails", formData.billingDetails);
//       formDataObject.append("shippingDetails", formData.shippingDetails);
//       formDataObject.append("image", image);

//       const response = await axios.post(
//         "http://localhost:5000/api/profile-form",
//         formDataObject,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Profile form submitted successfully");
//       navigate("/home");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting profile form");
//     }
//   };

//   return (
//     <div>
//       <h2>Profile Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Company Name:
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           WhatsApp Number:
//           <input
//             type="text"
//             name="whatsappNumber"
//             value={formData.whatsappNumber}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           City:
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           State:
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Billing Details:
//           <textarea
//             name="billingDetails"
//             value={formData.billingDetails}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Shipping Details:
//           <textarea
//             name="shippingDetails"
//             value={formData.shippingDetails}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <div className="file-input-container">
//           <label htmlFor="image" className="upload-button">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             className="custom-file-input"
//             onChange={handleImageChange}
//           />
//           {image && <span className="file-name">{image.name}</span>}
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;

// import React, { useState } from "react";
// import axios from "axios";

// const ProfileForm = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     whatsappNumber: "",
//     city: "",
//     state: "",
//     billingDetails: "",
//     shippingDetails: "",
//   });
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       console.log(token);
//       const formData = new FormData();

//       formData.append("companyName", formData.companyName);
//       formData.append("whatsappNumber", formData.whatsappNumber);
//       formData.append("city", formData.city);
//       formData.append("state", formData.state);
//       formData.append("billingDetails", formData.billingDetails);
//       formData.append("shippingDetails", formData.shippingDetails);
//       formData.append("image", image);

//       const response = await axios.post(
//         "http://localhost:5000/api/profile-form",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Profile form submitted successfully");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting profile form");
//     }
//   };

//   return (
//     <div>
//       <h2>Profile Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Company Name:
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           WhatsApp Number:
//           <input
//             type="text"
//             name="whatsappNumber"
//             value={formData.whatsappNumber}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           City:
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           State:
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Billing Details:
//           <textarea
//             name="billingDetails"
//             value={formData.billingDetails}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Shipping Details:
//           <textarea
//             name="shippingDetails"
//             value={formData.shippingDetails}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <div className="file-input-container">
//           <label htmlFor="image" className="upload-button">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             className="custom-file-input"
//             onChange={handleImageChange}
//           />
//           {image && <span className="file-name">{image.name}</span>}
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;

// import React, { useState } from "react";
// import axios from "axios";

// const ProfileForm = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     whatsappNumber: "",
//     city: "",
//     state: "",
//     billingDetails: "",
//     shippingDetails: "",
//   });
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const imageData = new FormData();
//       imageData.append("image", image);

//       const imageResponse = await axios.post(
//         "http://localhost:5000/api/upload",
//         imageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const imageUrl = imageResponse.data.url;

//       const profileData = { ...formData, image: imageUrl };

//       await axios.post("http://localhost:5000/api/profile-form", profileData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Profile form submitted successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Profile Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Company Name:
//           <input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           WhatsApp Number:
//           <input
//             type="text"
//             name="whatsappNumber"
//             value={formData.whatsappNumber}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           City:
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           State:
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Billing Details:
//           <textarea
//             name="billingDetails"
//             value={formData.billingDetails}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Shipping Details:
//           <textarea
//             name="shippingDetails"
//             value={formData.shippingDetails}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <div className="file-input-container">
//           <label htmlFor="image" className="upload-button">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             className="custom-file-input"
//             onChange={handleImageChange}
//           />
//           {image && <span className="file-name">{image.name}</span>}
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
