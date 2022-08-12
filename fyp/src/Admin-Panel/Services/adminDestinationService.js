import { errorToast } from "../../Utils/Toast";

export async function updateDestinationHotels() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminDestination`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Destination Hotels Updated.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
