import React, { useState } from "react";
import EnterPin from "./EnterPin";
import { accountRecovery } from "../../../Services/accountRecovery";
import { successToast } from "../../../../Utils/Toast";

function ForgotPassword({ setClick, closeModal }) {
  const [email, setEmail] = useState("");
  const [enterPin, setEnterPin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email };

    const recoverAccount = async (data) => {
      const result = await accountRecovery(data);
      if (result) {
        successToast("Pin has been sent to your email address.");
        setEnterPin(true);
      }
    };

    recoverAccount(data);
  };

  return (
    <>
      {enterPin === false ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="login-heading">Account recovery</h3>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="login-button">
            Submit
          </button>

          <p style={{ margin: "4% auto" }} className="register-link">
            <button onClick={() => setClick(false)}>Login</button>
          </p>
        </form>
      ) : (
        <EnterPin closeModal={closeModal} />
      )}
    </>
  );
}

export default ForgotPassword;
