import React, { useState } from "react";
import { successToast } from "../../../Utils/Toast";
import { addFavoriteHotel } from "../../Services/favoriteService";

function Like({ hotelId }) {
  const ref = React.createRef();

  const [isActive, setActive] = useState(false);

  const addToFavorite = async (data) => {
    const result = await addFavoriteHotel(data);
    if (result) {
      successToast(result["Result"]);
    }
  };

  const onToggle = (e) => {
    e.stopPropagation();
    const data = { hotelId, userId: localStorage.getItem("userID") };
    if (ref.current && ref.current.classList.contains("fa-heart-o")) {
      addToFavorite(data);
    }
    setActive(!isActive);
  };

  const setClasses = (liked) => {
    let classes = "favorite-icon fa fa-heart";
    return liked ? classes : (classes += "-o");
  };

  return (
    <>
      <i
        ref={ref}
        title="Add to Favorites"
        style={{ fontSize: "15pt", fontWeight: "bold" }}
        onClick={onToggle}
        className={setClasses(isActive)}
        aria-hidden="true"
      />
    </>
  );
}

export default Like;
