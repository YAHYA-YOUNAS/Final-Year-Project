import React, { useState } from "react";
import { Link } from "react-router-dom";
import { successToast, warningToast } from "../../../../Utils/Toast";
import { addNewHotel } from "../../../Services/adminHomeSectionService";
import images from "../../../../User-Panel/Components/Common Components/ImportImages";
import "./AddNewHotel.css";

function AddNewHotel({ path }) {
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0.0);
  const [facilities, setFacilities] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle Image Upload
  const onFileChange = (event) => {
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setSelectedFile(event.target.files[0]);
  };

  // Handle Checkboxes
  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFacilities([...facilities, value]);
    } else {
      setFacilities(facilities.filter((e) => e !== value));
    }
  };

  const uploadNewHotel = async (data) => {
    const result = await addNewHotel(data);
    setImgUrl("");
    setSelectedFile(null);
    setName("");
    setLocation("");
    setRating(0.0);
    setFacilities([]);
    setPrice(0);
    setDiscount(0);
    setLatitude(0.0);
    setLongitude(0.0);
    setLink("");

    if (result) {
      successToast(result["Result"]);
    }
  };

  // Handle Form
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedFile !== null) {
      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);
      formData.append("name", name);
      formData.append("location", location);
      formData.append("rating", rating);
      formData.append("facilities", facilities);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("link", link);

      // Sending data to API
      uploadNewHotel(formData);
    } else {
      warningToast("Kindly choose an image!");
    }
  };

  // Clear the checkboxes
  const [key, setKey] = useState(0);

  const clearClickHandler = () => setKey((k) => k + 1);
  return (
    <div className="new-hotel-section">
      <Link className="back-btn" to={`${path}/homeSection`}>
        <i className="fa fa-arrow-left" aria-hidden="true" />
      </Link>
      <h3 style={{ marginTop: "3%" }} className="add-new-section-heading">
        Add New Hotel
      </h3>
      <div className="new-hotel-info">
        <form
          className="new-hotel-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="upload-content">
            <label htmlFor="file">
              <img
                className="add-new-hotel-image"
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

            <div>{selectedFile !== null && selectedFile.name}</div>
          </div>

          <div className="new-hotel-add-info">
            <div className="hotel-info-item">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                maxLength={50}
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="hotel-info-item">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="hotel-info-item">
              <label htmlFor="rating">Rating</label>
              <input
                id="rating"
                type="number"
                placeholder="Rating"
                min={0}
                max={10}
                step="any"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div className="hotel-info-item" key={key}>
              <label>Facilities</label>
              <input
                type="checkbox"
                value={"Food"}
                defaultChecked={false}
                onChange={handleChange}
              />
              <span> Food </span>
              <input
                type="checkbox"
                value={"Wifi"}
                defaultChecked={false}
                onChange={handleChange}
              />
              <span> Wifi </span>
              <input
                type="checkbox"
                value={"Parking"}
                defaultChecked={false}
                onChange={handleChange}
              />
              <span> Parking </span>
            </div>

            <div className="hotel-info-item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Price"
                min={0}
                max={50000}
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="hotel-info-item">
              <label htmlFor="discount">Discount</label>
              <input
                id="discount"
                type="number"
                placeholder="Discount"
                value={discount}
                min={-99}
                max={0}
                required
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="hotel-info-item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="number"
                placeholder="Latitude"
                step="any"
                value={latitude}
                required
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>

            <div className="hotel-info-item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="number"
                placeholder="Longitude"
                step="any"
                value={longitude}
                required
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>

            <div style={{ height: "fit-content" }} className="hotel-info-item">
              <label htmlFor="link">Booking Link</label>
              <input
                id="link"
                type="text"
                placeholder="Booking Link"
                value={link}
                required
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="add-new-hotel-btn"
              onClick={clearClickHandler}
            >
              Add Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewHotel;
