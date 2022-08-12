import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import images from "../../Common Components/ImportImages";
import { login } from "../../../Services/userLoginService";
import ForgotPassword from "./ForgotPassword";
import "./Login.css";

function Login(props) {
  const { open, setLoginOpen, setSignupOpen, setLoginState } = props;
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCloseModal = () => {
    setClick(false);
    setLoginOpen(false);
  };

  const switchSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  // Form Handling
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    // API handling
    const userData = async (data) => {
      const result = await login(data);
      if (result) {
        setLoginState(true);
        onCloseModal();
      }
    };

    userData(data);
  };

  const handleForgotPassword = () => {
    setClick(true);
  };

  return (
    <>
      <div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="modal-section">
            {click === false ? (
              <form className="login-form" onSubmit={handleSubmit}>
                <h3 className="login-heading">Login</h3>
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "inherit",
                  }}
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
                <button className="login-button" type="submit">
                  Login
                </button>
                <p className="register-link">
                  No account? <button onClick={switchSignup}>Register</button>
                </p>
              </form>
            ) : (
              <ForgotPassword setClick={setClick} closeModal={onCloseModal} />
            )}

            <img className="login-image" src={images.login_image} alt="" />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Login;
