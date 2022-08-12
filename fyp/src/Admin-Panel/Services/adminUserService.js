import { errorToast } from "../../Utils/Toast";

// Get Data of a User
export async function adminUser(userId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminUser/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data["User"];
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

// Update a User's Profile
export async function adminUpdateUser(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminUser/${data.userId}`,
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
      if (data["Result"] !== "User updated successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}

// Delete a User
export async function adminDeleteUser(userId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminUser/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "User deleted successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
