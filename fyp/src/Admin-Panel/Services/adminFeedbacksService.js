import { errorToast } from "../../Utils/Toast";

export async function adminFeedbacks() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminFeedbacks`, {
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

// Delete a Feedback
export async function adminDeleteFeedback(feedbackId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminDeleteFeedback/${feedbackId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Feedback deleted successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
