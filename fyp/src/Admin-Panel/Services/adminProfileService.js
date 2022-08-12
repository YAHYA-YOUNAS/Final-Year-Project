import { errorToast } from "../../Utils/Toast";

export async function adminProfile(adminId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminProfile/${adminId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

export async function adminProfileImage(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminProfileImage`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Image uploaded successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => errorToast("Server Error", error));
}
