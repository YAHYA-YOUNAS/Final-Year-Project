import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import images from "../../Common Components/ImportImages";
import { registration } from "../../../Services/userRegisterService";
import { successToast, errorToast } from "../../../../Utils/Toast";
import "./Register.css";

function Register(props) {
  const { open, setLoginOpen, setSignupOpen } = props;
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onCloseModal = () => setSignupOpen(false);

  const switchLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  // Form handling
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      fName,
      lName,
      email,
      password,
      confirmPassword,
    };

    // API handling
    const registerUser = async (data) => {
      const result = await registration(data);
      if (result["Result"] === "Record saved successfully.") {
        switchLogin();
        successToast("Congratulations! You are registered successfully.");
      } else {
        errorToast(result["Result"]);
      }
    };

    registerUser(data);
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-section">
          <form className="register-form" onSubmit={handleSubmit}>
            <h3 className="register-heading"> Registration </h3>
            <input
              type="text"
              placeholder="First Name"
              title="Only upper and lower case characters"
              pattern="^[a-zA-Z_ ]*$"
              maxLength={20}
              required
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              title="Only upper and lower case characters"
              pattern="^[a-zA-Z_ ]*$"
              maxLength={20}
              required
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              title="No space, must contain at least one digit, one special character and length should be greater than 8 characters"
              pattern="(?!.*\s)[A-Za-z](?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;<>,.?/_₹]).{8,}"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              title="No space, must contain at least one digit, one special character and length should be greater than 8 characters"
              pattern="(?!.*\s)[A-Za-z](?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;<>,.?/_₹]).{8,}"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="register-button" type="submit">
              Register
            </button>
            <p className="login-link">
              Already have an account?
              <button onClick={switchLogin}> Login </button>
            </p>
          </form>
          <img className="register-image" src={images.register_image} alt="" />
        </div>
      </Modal>
    </div>
  );
}

export default Register;
