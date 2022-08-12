import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../../../User-Panel/Components/Common Components/ImportImages";
import { successToast, warningToast } from "../../../../Utils/Toast";
import { addNewDestination } from "../../../Services/adminHomeSectionService";
import "./AddNewDestination.css";

function AddNewDestination({ path }) {
  const [imgUrl, setImgUrl] = useState("");
  const [cityName, setCityName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setSelectedFile(event.target.files[0]);
  };

  const uploadNewDestination = async (data) => {
    const result = await addNewDestination(data);
    setSelectedFile(null);
    setCityName("");
    setImgUrl("");
    if (result) {
      successToast(result["Result"]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedFile !== null) {
      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);
      formData.append("cityname", cityName);

      // Sending data to API
      uploadNewDestination(formData);
    } else {
      warningToast("Kindly choose an image!");
    }
  };

  return (
    <div className="new-destination-section">
      <Link className="back-btn" to={`${path}/homeSection`}>
        <i className="fa fa-arrow-left" aria-hidden="true" />
      </Link>
      <h3 style={{ marginTop: "3%" }} className="add-new-section-heading">
        Add New Destination
      </h3>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="upload-content">
          <label htmlFor="file">
            <img
              className="destination-upload-img"
              src={imgUrl !== "" ? imgUrl : images.placeholder}
              alt=""
            />
            <input
              id="file"
              type="file"
              onChange={onFileChange}
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
            />
          </label>
          <div className="upload-text">
            <label htmlFor="destination-text">New Destination</label>
            <input
              id="destination-text"
              type="text"
              placeholder="City Name"
              value={cityName}
              maxLength={30}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="upload-new-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewDestination;
