import React from "react";
import { useParams } from "react-router-dom";
import AddNewDestination from "../AddNewDestination/AddNewDestination";
import AddNewHotel from "../AddNewHotel/AddNewHotel";
import AddNewVideo from "../AddNewVideo/AddNewVideo";
import "./AddNew.css";

function AddNew({ path }) {
  const { heading } = useParams();

  return (
    <div className="add-new-section">
      {heading === "destination" && <AddNewDestination path={path} />}
      {heading === "hotel" && <AddNewHotel path={path} />}
      {heading === "video" && <AddNewVideo path={path} />}
    </div>
  );
}

export default AddNew;
