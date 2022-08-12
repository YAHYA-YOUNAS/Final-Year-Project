import React, { useState } from "react";
import { warningToast } from "../../../../Utils/Toast";
import images from "../../../../User-Panel/Components/Common Components/ImportImages";
import "./UploadImage.css";

function UploadImage({
  adminImageUrl,
  adminID,
  handleImage,
  setDisableButton,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Profile Image Form handling
  const onFileChange = (event) => {
    setDisableButton(false);
    setSelectedFile(event.target.files[0]);
  };

  const handleImageSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedFile !== null) {
      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);
      formData.append("adminID", adminID);

      // Sending data to API
      setSelectedFile(null);
      handleImage(formData);
    } else {
      warningToast(
        "Kindly choose an image or you may be selecting the image already uploaded!"
      );
    }
  };
  return (
    <div className="upload-image-section">
      <form encType="multipart/form-data" onSubmit={handleImageSubmit}>
        <div className="update-upload-section">
          <div className="update-image-section">
            <label htmlFor="file">
              <div className="upload-img-text">
                {adminImageUrl !== "" ? "Update image" : "Choose an image"}
              </div>
              <img
                className="update-img"
                src={adminImageUrl !== "" ? adminImageUrl : images.user_dp}
                alt=""
              />
            </label>
            <input
              id="file"
              type="file"
              onChange={onFileChange}
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
            />
          </div>

          <button type="submit" style={{ border: "none", background: "none" }}>
            <i className="fa fa-upload update-img-icon" aria-hidden="true" />
          </button>
          {selectedFile !== null && (
            <p style={{ marginTop: "10px" }}>{selectedFile.name}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
