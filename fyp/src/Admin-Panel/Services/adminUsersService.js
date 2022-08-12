import { errorToast } from "../../Utils/Toast";

export async function adminUsers() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
