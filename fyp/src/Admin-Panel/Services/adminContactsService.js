import { errorToast } from "../../Utils/Toast";

export async function adminContacts() {
  return await fetch(`${process.env.REACT_APP_SERVER_URL}/adminContacts`, {
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

// Delete a Contact
export async function adminDeleteContact(contactId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/adminDeleteContact/${contactId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data["Result"] !== "Contact deleted successfully.") {
        errorToast(data["Result"]);
      } else {
        return data;
      }
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
