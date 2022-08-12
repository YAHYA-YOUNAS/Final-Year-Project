import { errorToast } from "../../Utils/Toast";

export async function registration(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
