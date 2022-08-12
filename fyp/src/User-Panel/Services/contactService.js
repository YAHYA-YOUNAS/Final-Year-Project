import { errorToast } from "../../Utils/Toast";

export async function saveContact(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Thank you for getting in touch!") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
