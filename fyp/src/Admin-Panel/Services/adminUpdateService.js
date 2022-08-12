import { errorToast } from "../../Utils/Toast";

export async function adminUpdateProfile(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminProfile/${data.adminId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Admin updated successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
