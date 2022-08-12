import { errorToast } from "../../Utils/Toast";

export async function loggedInData(adminId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminHeader/${adminId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Admin found.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
