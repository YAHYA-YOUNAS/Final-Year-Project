import { errorToast } from "../../Utils/Toast";

export async function getImageUrl(userId) {
  return await fetch(
    `${process.env.REACT_APP_SERVER_URL}/userImageUrl/${userId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      errorToast("Server Error", error);
    });
}
