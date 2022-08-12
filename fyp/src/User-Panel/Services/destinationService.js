import { errorToast } from "../../Utils/Toast";

export async function getDestinationHotels(cityname) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/destinationHotels/${cityname}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Destination Hotels found.") {
        errorToast(data["Result"]);
      } else {
        return data["Hotels"];
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
