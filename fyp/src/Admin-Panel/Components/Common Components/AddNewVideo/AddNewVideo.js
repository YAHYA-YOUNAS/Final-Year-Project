import React, { useState } from "react";
import { Link } from "react-router-dom";
import { successToast } from "../../../../Utils/Toast";
import { addNewVideo } from "../../../Services/adminHomeSectionService";

function AddNewVideo({ path }) {
  const [embedId, setEmbedId] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      embedId,
    };

    const sendEmbedId = async (data) => {
      const result = await addNewVideo(data);
      setEmbedId("");
      if (result) {
        successToast(result["Result"]);
      }
    };

    sendEmbedId(data);
  };

  return (
    <div className="new-video-section">
      <Link className="back-btn" to={`${path}/homeSection`}>
        <i className="fa fa-arrow-left" aria-hidden="true" />
      </Link>

      <h3 style={{ marginTop: "3%" }} className="add-new-section-heading">
        Add New Video
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="upload-content">
          <div className="upload-text">
            <label htmlFor="video-text">Embed Id of New Video</label>
            <input
              id="video-text"
              type="text"
              placeholder="Embed Id"
              maxLength={30}
              value={embedId}
              onChange={(e) => setEmbedId(e.target.value)}
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

export default AddNewVideo;
