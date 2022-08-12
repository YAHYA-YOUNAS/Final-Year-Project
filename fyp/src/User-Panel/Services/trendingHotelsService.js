import { errorToast } from "../../Utils/Toast";

export async function getTrendingHotels() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/trendingHotels`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Trending Hotels found.") {
        errorToast(data["Result"]);
      } else {
        return data["Hotels"];
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
