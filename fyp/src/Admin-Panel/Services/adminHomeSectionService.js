import { errorToast } from "../../Utils/Toast";

// Get data of Home Section
export async function adminHomeSection() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminHomeSection`, {
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

// Upload Destination Data
export async function addNewDestination(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminHomeSection/addNewDestination`,
    {
      method: "POST",
      body: data,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "New Destination added successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => errorToast("Server Error", error));
}

// Upload Hotel Data
export async function addNewHotel(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminHomeSection/addNewHotel`,
    {
      method: "POST",
      body: data,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Featured Hotel added successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => errorToast("Server Error", error));
}

// Upload New Video Data
export async function addNewVideo(data) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminHomeSection/addNewVideo`,
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
      if (data["Result"] !== "Embed Id uploaded successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
