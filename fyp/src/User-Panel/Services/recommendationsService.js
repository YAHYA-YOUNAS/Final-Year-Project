import { errorToast } from "../../Utils/Toast";

export async function generateRecommendations(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/recommendations`, {
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

// Get recommended hotels
export async function getRecommendations(userId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/getRecommendations/${userId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Hotels found.") {
        errorToast(data["Result"]);
      } else {
        return data["Hotels"];
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
