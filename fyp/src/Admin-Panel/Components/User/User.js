import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import images from "../../../User-Panel/Components/Common Components/ImportImages";
import { successToast } from "../../../Utils/Toast";
import { adminUser, adminUpdateUser } from "../../Services/adminUserService";
import "./User.css";

function User({ path }) {
  const [disableButton, setDisableButton] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [travelExperience, setTravelExperience] = useState(0);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");

  const [userData, setUserData] = useState({});

  const { userId } = useParams();

  // Profile Form Handling (Display User Data)
  useEffect(() => {
    const getUserData = async () => {
      const result = await adminUser(userId);
      if (result) {
        setUserData(result);
      }
    };
    getUserData();
  }, [userId]);

  // Update User's Information
  const handleSubmit = (event) => {
    event.preventDefault();
    const userUpdateData = {
      userId,
      firstName,
      lastName,
      email,
      travelExperience,
      address,
      city,
      province,
      country,
    };

    const userUpdateInfo = async (userUpdateData) => {
      const result = await adminUpdateUser(userUpdateData);
      if (result) {
        successToast(result["Result"]);
      }
    };

    userUpdateInfo(userUpdateData);
  };

  return (
    <div className="edit-user">
      <Link className="back-btn" to={`${path}/users`}>
        <i className="fa fa-arrow-left" aria-hidden="true" />
      </Link>
      <h3 style={{ marginTop: "3%" }} className="edit-user-title">
        Edit User
      </h3>
      <div className="edit-user-section">
        <div className="edit-user-left">
          <div className="user-container">
            <img
              src={
                userData.imageUrl !== "" ? userData.imageUrl : images.user_dp
              }
              alt=""
              className="user-avatar"
            />
            <div className="show-user-name-email">
              <span>{`${userData.fName} ${userData.lName}`}</span>
              <span>{userData.email}</span>
            </div>
          </div>
          <div className="user-information">
            <h4>User Details</h4>
            <div className="user-info-field">
              <label>Address:</label>
              <span> {userData.address} </span>
            </div>
            <div className="user-info-field">
              <label>Travel Experience (years):</label>
              <span>
                {" "}
                {userData.travelExperience > 0 && userData.travelExperience}
              </span>
            </div>
            <div className="user-info-field">
              <label>City:</label>
              <span> {userData.city} </span>
            </div>
            <div className="user-info-field">
              <label>Province:</label>
              <span> {userData.province} </span>
            </div>
            <div className="user-info-field">
              <label>Country:</label>
              <span> {userData.country} </span>
            </div>
          </div>
        </div>

        <div className="edit-user-right">
          <h3 style={{ fontFamily: "verdana", marginLeft: "20px" }}>Update</h3>

          <form className="user-update-form" onSubmit={handleSubmit}>
            <div className="update-user-information">
              <div className="user-update-item">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="user-update-input"
                  maxLength={20}
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>

              <div className="user-update-item">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="user-update-input"
                  required
                  maxLength={20}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>

              <div className="user-update-item">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="user-update-input"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>

              <div className="user-update-item">
                <label>Travel Experience (years)</label>
                <input
                  type="number"
                  placeholder="Travel Experience"
                  className="user-update-input"
                  min={0}
                  max={100}
                  required
                  value={travelExperience}
                  onChange={(e) => {
                    setTravelExperience(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>

              <div className="user-update-item">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="user-update-input"
                  value={address}
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>

              <div className="user-update-item">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="user-update-input"
                  value={city}
                  maxLength={30}
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>

              <div className="user-update-item">
                <label>Province</label>
                <select
                  className="user-update-input"
                  value={province}
                  required
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
              </div>

              <div className="user-update-item">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  className="user-update-input"
                  value={country}
                  maxLength={30}
                  required
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setDisableButton(false);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="user-update-button"
              disabled={disableButton}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
