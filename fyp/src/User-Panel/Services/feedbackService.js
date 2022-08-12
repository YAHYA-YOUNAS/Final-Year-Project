import { errorToast } from "../../Utils/Toast";

export async function saveFeedback(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "We're very thankful for your kind feedback.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
