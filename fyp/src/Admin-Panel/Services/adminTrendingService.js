import { errorToast } from "../../Utils/Toast";

export async function updateTrendingHotels() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminTrending`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Trending Hotels Updated.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
