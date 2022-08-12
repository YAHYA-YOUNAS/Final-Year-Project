import { errorToast } from "../../Utils/Toast";

export async function sendSentence(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminSentimentAnalysis`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Sentimental Analysis done.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
