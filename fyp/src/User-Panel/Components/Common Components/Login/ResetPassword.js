import React, { useState } from "react";
import { successToast } from "../../../../Utils/Toast";
import { resetPassword } from "../../../Services/accountRecovery";

function ResetPassword({ closeModal }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { password, confirmPassword };

    const passwordReset = async (data) => {
      const result = await resetPassword(data);
      if (result) {
        closeModal();
        successToast(result["Result"]);
      }
    };

    passwordReset(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-heading">Reset Password</h3>
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
      <button type="submit" className="login-button">
        Submit
      </button>
    </form>
  );
}

export default ResetPassword;
