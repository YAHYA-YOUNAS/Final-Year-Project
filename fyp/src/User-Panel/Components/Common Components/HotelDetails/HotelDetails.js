import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import GoogleMap from "../../../../Utils/GoogleMap";
import "./HotelDetails.css";

function HotelDetails({ open, setOpen, hotelData }) {
  const onCloseModal = () => {
    setOpen(false);
  };

  const bg = {
    overlay: {
      opacity: 0.3,
    },
  };

  return (
    <>
      <div>
        <Modal
          styles={bg}
          open={open}
          onClose={onCloseModal}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="modal-section">
            <div className="hotel-information">
              <div className="hotel-map">
                <GoogleMap
                  latitude={hotelData.latitude}
                  longitude={hotelData.longitude}
                />
              </div>

              <div className="hotel-display-info">
                <h2>{hotelData.name}</h2>
                <div className="hotel-ratings" style={{ paddingLeft: "5px" }}>
                  {Array.from(
                    { length: parseInt(hotelData.rating / 2, 10) },
                    (_, i) => (
                      <span key={i} className="fa fa-star" />
                    )
                  )}

                  {Array.from(
                    { length: 5 - parseInt(hotelData.rating / 2, 10) },
                    (_, i) => (
                      <span key={i} className="fa fa-star-o" />
                    )
                  )}
                </div>
                <i
                  style={{
                    fontSize: "14pt",
                    fontWeight: "bold",
                    color: "orange",
                    paddingLeft: "5px",
                  }}
                  className="fa fa-map-marker"
                  arid-hidden="true"
                />{" "}
                <span>{hotelData.location}</span>
                <p>
                  {hotelData.facilities?.map((facility, index) => (
                    <span key={index}> {facility} </span>
                  ))}
                </p>
                <h3>{`PKR ${parseInt(hotelData.price, 10)}`}</h3>
                <p>
                  Link to book hotel:{" "}
                  <Link to={{ pathname: hotelData.link }} target="_blank">
                    {hotelData.link}
                  </Link>
                </p>
                <img src={hotelData.image} alt="" />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default HotelDetails;
