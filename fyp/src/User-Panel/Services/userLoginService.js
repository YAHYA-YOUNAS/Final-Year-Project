import { errorToast } from "../../Utils/Toast";

export async function login(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Logged in successfully.") {
        errorToast(data["Result"]);
      } else {
        localStorage.setItem("userID", data["UserID"]);
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
