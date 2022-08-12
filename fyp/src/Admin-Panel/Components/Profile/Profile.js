import React, { useState, useEffect } from "react";
import {
  adminProfile,
  adminProfileImage,
} from "../../Services/adminProfileService";
import { adminUpdateProfile } from "../../Services/adminUpdateService";
import UploadImage from "../Common Components/UploadImage/UploadImage";
import { successToast } from "../../../Utils/Toast";
import "./Profile.css";

function Profile() {
  const [disableButton, setDisableButton] = useState(true);
  const [adminId] = useState(localStorage.getItem("AdminID"));
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [adminImageUrl, setAdminImageUrl] = useState("");

  // Profile Image API handling
  const adminImage = async (formData) => {
    const result = await adminProfileImage(formData);
    if (result) {
      setAdminImageUrl(
        `${process.env.REACT_APP_SERVER_URL}${result["AdminImageUrl"]}`
      );
    }
  };

  // Profile Form Handling (Display Admin Data)
  useEffect(() => {
    const adminData = async () => {
      const data = await adminProfile(localStorage.getItem("AdminID"));
      setAdminName(data["AdminName"]);
      setAdminEmail(data["AdminEmail"]);
      setAdminPassword(data["AdminPassword"]);
      if (data["AdminImageUrl"]) {
        setAdminImageUrl(data["AdminImageUrl"]);
      }
    };

    adminData();
  }, []);

  // Update Admin Information
  const handleSubmit = (event) => {
    event.preventDefault();

    const adminData = {
      adminId,
      adminName,
      adminEmail,
      adminPassword,
    };

    const adminUpdateInfo = async (adminData) => {
      const result = await adminUpdateProfile(adminData);
      if (result) {
        successToast(result["Result"]);
      }
    };

    adminUpdateInfo(adminData);
  };

  return (
    <div className="admin-profile">
      <div className="admin-update-profile">
        <UploadImage
          adminImageUrl={adminImageUrl}
          handleImage={adminImage}
          setDisableButton={setDisableButton}
          adminID={adminId}
        />

        <form className="admin-profile-form" onSubmit={handleSubmit}>
          <div className="update-admin-information">
            <div className="admin-update-item">
              <label>ID</label>
              <input
                type="text"
                className="admin-update-input"
                value={adminId}
                readOnly
              />
            </div>

            <div className="admin-update-item">
              <label>Name</label>
              <input
                type="text"
                placeholder="Admin Name"
                className="admin-update-input"
                value={adminName}
                maxLength={20}
                onChange={(e) => {
                  setAdminName(e.target.value);
                  setDisableButton(false);
                }}
              />
            </div>

            <div className="admin-update-item">
              <label>Email</label>
              <input
                type="email"
                placeholder="Admin Email"
                className="admin-update-input"
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                  setDisableButton(false);
                }}
              />
            </div>

            <div className="admin-update-item">
              <label>Password</label>
              <input
                type="text"
                placeholder="Admin Password"
                className="admin-update-input"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setDisableButton(false);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="admin-profile-btn"
            disabled={disableButton}
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
