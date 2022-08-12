import { errorToast } from "../../Utils/Toast";

export async function profileData(userId) {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data["User"];
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

export async function profileImage(data, userID) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/profileImage/${userID}`,
    {
      method: "PUT",
      body: data,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Image uploaded successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

export async function updateProfileData(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/profile/${data.userID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Your profile has been updated successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
