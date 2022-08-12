import React, { useState } from "react";
import ResetPassword from "./ResetPassword";
import { validatePin } from "../../../Services/accountRecovery";

function EnterPin({ closeModal }) {
  const [pin, setPin] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { pin };

    const sendPin = async (data) => {
      const result = await validatePin(data);
      if (result) {
        setResetPassword(true);
      }
    };

    sendPin(data);
  };
  return (
    <>
      {resetPassword === false ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="login-heading">Account recovery</h3>
          <input
            type="text"
            maxLength={5}
            placeholder="Enter PIN"
            required
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      ) : (
        <ResetPassword closeModal={closeModal} />
      )}
    </>
  );
}

export default EnterPin;
