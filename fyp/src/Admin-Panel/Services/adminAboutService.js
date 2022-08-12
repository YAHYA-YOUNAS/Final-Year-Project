import { errorToast } from "../../Utils/Toast";

// Get About Data
export async function getAboutData() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminAbout`, {
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

// Update About Section
export async function updateAboutData(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminAbout`, {
    method: "PUT",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "About data updated successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
