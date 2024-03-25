import React, { useState, useEffect } from "react";
import "./css/Logo.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faGift,
  faTruck,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Logo() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
        const response = await axios.get(
          "http://localhost:5000/api/logo/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
            },
          }
        );
        // console.log("Fetched user data:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="top">
      <div className="logo-container">
        <div className="one-two">
          <div className="one">
            {userData &&
              userData.image && ( // Check if userData and userData.image exist
                <div className="profile-photo">
                  <img
                    src={`http://localhost:5000/${userData.image.filePath}`} // Assuming this is the correct property containing the image path
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
              )}
          </div>
          <div className="two">
            {userData ? (
              <>
                <div className="customer-name">
                  <div>Good Morning,</div>
                  <div>{userData.username}</div>
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
        <div className="three">
          <FontAwesomeIcon icon={faPhone} className="phone-icon" />
          <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
          <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
        </div>
      </div>

      <div className="MDS">
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ textAlign: "center", marginBottom: "-15px" }}>
            <h2>MDS MEMBER</h2>
          </div>
          <div style={{ fontSize: "12px", marginBottom: "-10px" }}>
            <p>Monthly Reward System</p>
          </div>
        </div>
        <div className="MDS-icon">
          <div className="MDS-layout">
            <div className="MDS-info">
              <FontAwesomeIcon icon={faGift} className="MDS-gift" />
              <div className="zero">0</div>
            </div>
            <div>Reward</div>
          </div>
          <div className="MDS-layout">
            <div className="MDS-info">
              <FontAwesomeIcon icon={faTruck} className="MDS-gift" />
              <div className="zero">0</div>
            </div>
            <div>Orders</div>
          </div>
          <div className="MDS-layout">
            <div className="MDS-info">
              <FontAwesomeIcon icon={faWallet} className="MDS-gift" />
              <div className="zero">0</div>
            </div>
            <div>Balance</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logo;

// import React, { useState, useEffect } from "react";
// import "./css/Logo.css";
// import axios from "axios";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPhone,
//   faEnvelope,
//   faGift,
//   faTruck,
//   faWallet,
// } from "@fortawesome/free-solid-svg-icons";

// import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// function Logo() {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
//         const response = await axios.get(
//           "http://localhost:5000/api/logo/user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
//             },
//           }
//         );
//         console.log("Fetched user data:", response.data);
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <div className="top">
//       <div className="logo-container">
//         <div className="one-two">
//           <div className="one">B</div>
//           <div className="two">
//             {userData ? (
//               <>
//                 <div>Good Morning,</div>
//                 <div>{userData.username}</div>
//               </>
//             ) : (
//               <div>Loading...</div>
//             )}

//             {userData && (
//               <div className="profile-photo">
//                 <img src={userData.profilePhoto} alt="Profile" />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="three">
//           <FontAwesomeIcon icon={faPhone} className="phone-icon" />
//           <FontAwesomeIcon icon={faEnvelope} className="envelope-icon" />
//           <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
//         </div>
//       </div>

//       <div className="MDS">
//         <div style={{ textAlign: "center", color: "white" }}>
//           <div style={{ textAlign: "center", marginBottom: "-15px" }}>
//             <h2>MDS MEMBER</h2>
//           </div>
//           <div style={{ fontSize: "12px", marginBottom: "-10px" }}>
//             <p>Monthly Reward System</p>
//           </div>
//         </div>
//         <div className="MDS-icon">
//           <div className="MDS-layout">
//             <div className="MDS-info">
//               <FontAwesomeIcon icon={faGift} className="MDS-gift" />
//               <div className="zero">0</div>
//             </div>
//             <div>Reward</div>
//           </div>
//           <div className="MDS-layout">
//             <div className="MDS-info">
//               <FontAwesomeIcon icon={faTruck} className="MDS-gift" />
//               <div className="zero">0</div>
//             </div>
//             <div>Orders</div>
//           </div>
//           <div className="MDS-layout">
//             <div className="MDS-info">
//               <FontAwesomeIcon icon={faWallet} className="MDS-gift" />
//               <div className="zero">0</div>
//             </div>
//             <div>Balance</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Logo;
