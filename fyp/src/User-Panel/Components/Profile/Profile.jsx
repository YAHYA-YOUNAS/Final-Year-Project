import React, { useState, useEffect } from "react";
import images from "../Common Components/ImportImages";
import {
  profileData,
  profileImage,
  updateProfileData,
} from "../../Services/profileService";
import { successToast, warningToast } from "../../../Utils/Toast";
import "./Profile.css";

function Profile({ loginState }) {
  const [disableButton, setDisableButton] = useState(true);
  const [userID] = useState(localStorage.getItem("userID"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [travelExperience, setTravelExperience] = useState(0);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Profile Image Form handling
  const onFileChange = (event) => {
    setDisableButton(false);
    setSelectedFile(event.target.files[0]);
  };

  const userImage = async (formData, userID) => {
    const result = await profileImage(formData, userID);
    if (result) {
      setImageUrl(`${process.env.REACT_APP_SERVER_URL}${result["ImageUrl"]}`);
    }
  };

  const handleImageSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedFile !== null) {
      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);

      // Sending data to API
      setSelectedFile(null);
      userImage(formData, userID);
    } else {
      warningToast("Kindly choose an image!");
    }
  };

  // Profile Form Handling
  useEffect(() => {
    userData(userID);
  }, [userID]);

  const userData = async (userID) => {
    const data = await profileData(userID);
    setFirstName(data["fName"]);
    setLastName(data["lName"]);
    setEmail(data["email"]);
    if (
      data["travelExperience"] &&
      data["address"] &&
      data["city"] &&
      data["province"] &&
      data["country"]
    ) {
      setTravelExperience(data["travelExperience"]);
      setAddress(data["address"]);
      setCity(data["city"]);
      setProvince(data["province"]);
      setCountry(data["country"]);
    }
    if (data["imageUrl"]) {
      setImageUrl(data["imageUrl"]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userID,
      firstName,
      lastName,
      email,
      travelExperience,
      address,
      city,
      province,
      country,
    };

    const updateData = async (data) => {
      const result = await updateProfileData(data);
      if (result) {
        successToast(result["Result"]);
      }
    };

    updateData(data);
  };

  return (
    <React.Fragment>
      {loginState ? (
        <div className="profile-page">
          <div className="profile-section">
            <div className="image-section">
              <img
                src={imageUrl !== "" ? imageUrl : images.user_dp}
                alt="Avatar"
              />
              <div className="avatar-middle">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleImageSubmit}
                >
                  <label htmlFor="user-image">
                    <input
                      id="user-image"
                      type="file"
                      onChange={onFileChange}
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                    />
                    <div className="txt-image-upload">Choose an Image</div>
                    <button type="submit" className="btn-image-upload">
                      Upload
                    </button>
                  </label>
                </form>
              </div>
              {selectedFile !== null && (
                <p style={{ marginTop: "10px" }}>{selectedFile.name}</p>
              )}
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <h2 className="profile-heading">Profile Settings</h2>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                maxLength={20}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setDisableButton(false);
                }}
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                maxLength={20}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setDisableButton(false);
                }}
              />
              <br />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDisableButton(false);
                }}
              />
              <br />
              <br />
              <input
                type="number"
                placeholder="Travel Experience (years)"
                min={0}
                max={100}
                value={travelExperience}
                onChange={(e) => {
                  setTravelExperience(e.target.value);
                  setDisableButton(false);
                }}
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setDisableButton(false);
                }}
              />

              <br />
              <br />
              <input
                type="text"
                placeholder="City"
                value={city}
                maxLength={30}
                onChange={(e) => {
                  setCity(e.target.value);
                  setDisableButton(false);
                }}
              />
              <br />
              <br />
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setDisableButton(false);
                }}
              >
                <option value="Select province" hidden>
                  Select province
                </option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
                <option value="Balochistan">Balochistan</option>
              </select>
              <br />
              <br />
              <input
                type="text"
                placeholder="Country"
                value={country}
                maxLength={30}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setDisableButton(false);
                }}
              />
              <br />
              <br />
              <button
                type="submit"
                className="profile-btn"
                disabled={disableButton}
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      ) : (
        (window.location.href = "/")
      )}
    </React.Fragment>
  );
}

export default Profile;
