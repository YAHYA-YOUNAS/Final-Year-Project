import React, { useState, useEffect } from "react";
import images from "../../../User-Panel/Components/Common Components/ImportImages";
import { successToast } from "../../../Utils/Toast";
import {
  getAboutData,
  updateAboutData,
} from "../../Services/adminAboutService";
import "./AboutSection.css";

function AboutSection() {
  const [disableButton, setDisableButton] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = async () => {
    const result = await getAboutData();
    if (result) {
      setImgUrl(`${process.env.REACT_APP_SERVER_URL}${result["AboutImage"]}`);
      setAboutText(result["AboutText"]);
    }
  };

  // Form Handling
  const onFileChange = (event) => {
    setDisableButton(false);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setSelectedFile(event.target.files[0]);
  };

  // API Handling
  const updateAbout = async (data) => {
    const result = await updateAboutData(data);
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
      formData.append("aboutText", aboutText);

      updateAbout(formData);
    } else {
      formData.append("aboutText", aboutText);
      updateAbout(formData);
    }
  };

  return (
    <div className="about-update-section">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="about-update-form"
      >
        <h3 className="about-update-heading">Update</h3>
        <div className="update-sections">
          <div className="about-image-upload">
            <div className="update-about-img">
              <label htmlFor="file">
                <img
                  className="about-update-img"
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

              <button style={{ border: "none", background: "none" }}>
                <i
                  className="fa fa-upload about-update-icon"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="about-update-text">
            <textarea
              type="text"
              placeholder="Write about here..."
              className="update-about-input"
              rows="20"
              value={aboutText}
              onChange={(e) => {
                setAboutText(e.target.value);
                setDisableButton(false);
              }}
            />
            <button
              type="submit"
              className="about-update-btn"
              disabled={disableButton}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AboutSection;
