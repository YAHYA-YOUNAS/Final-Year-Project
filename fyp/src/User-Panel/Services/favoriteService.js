import { errorToast } from "../../Utils/Toast";

export async function addFavoriteHotel(data) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/addFavoriteHotel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Hotel added to favorites.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

// Get Favorite Hotels
export async function getFavoriteHotels(userId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/favoriteHotels/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result" !== "Hotels found!"]) {
        errorToast(data["Result"]);
      } else {
        return data["Hotels"];
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

// Delete Favorite Hotel
export async function deleteFavoriteHotel(hotelId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/removeFavoriteHotel/${hotelId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result" !== "Hotel Removed from Favorites."]) {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
