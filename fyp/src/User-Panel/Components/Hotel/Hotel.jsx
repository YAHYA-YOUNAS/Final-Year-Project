import React from "react";
import Like from "../Common Components/Like";
import "./Hotel.css";

function Hotel(props) {
  const facilitiesArray = ["fa fa-cutlery", "fa fa-wifi", "fa fa-product-hunt"];
  const { _id, name, image, location, rating, price } = props.data;

  const { loginState, setOpen, title, setHotel } = props;

  return (
    <div
      className="hotel-background"
      onClick={() => {
        setOpen(true);
        setHotel(props.data);
      }}
    >
      <div className="hotel-image-section">
        <img
          src={
            title === "featuredHotels"
              ? `${process.env.REACT_APP_SERVER_URL}${image}`
              : image
          }
          className="hotel-image"
          alt=""
        />
        {loginState && title !== "recommendedHotels" ? (
          <Like hotelId={_id} />
        ) : (
          ""
        )}

        <div className="hotel-ratings">
          {Array.from(
            {
              length: parseInt(rating / 2, 10),
            },
            (_, i) => (
              <span key={i} className="fa fa-star" />
            )
          )}

          {Array.from(
            {
              length: 5 - parseInt(rating / 2, 10),
            },
            (_, i) => (
              <span key={i} className="fa fa-star-o" />
            )
          )}
        </div>
      </div>

      <div className="hotel-short-info">
        <h4>
          {name.length > 40 ? `${name.substr(0, 40)}...` : name.substr(0, 40)}
        </h4>
        <i
          style={{ fontSize: "14pt", fontWeight: "bold", color: "orange" }}
          className="fa fa-map-marker"
          arid-hidden="true"
        />
        <span>
          {location.length > 55
            ? `${location.substr(0, 55)}...`
            : location.substr(0, 55)}
        </span>
      </div>
      <br />

      <div className="hotel-facilities-icons">
        {facilitiesArray.map((item, index) => (
          <i
            key={index}
            style={{
              fontSize: "15pt",
              fontWeight: "bold",
              color: "#1abc9c",
            }}
            className={item}
            aria-hidden="true"
          />
        ))}
        {/* <i
          style={{ fontSize: "14pt", fontWeight: "bold", color: "#1abc9c" }}
          className="fa fa-cutlery"
          aria-hidden="true"
        />

        <i
          style={{ fontSize: "14pt", fontWeight: "bold", color: "#1abc9c" }}
          className="fa fa-wifi"
          aria-hidden="true"
        />
        <i
          style={{ fontSize: "14pt", fontWeight: "bold", color: "#1abc9c" }}
          className="fa fa-product-hunt"
          aria-hidden="true"
        /> */}
        <button className="view-on-map-btn">View On Map</button>
      </div>
      <hr />

      <div className="hotel-price-tag">
        <h4>{"PKR " + parseInt(price, 10)}</h4>
        {/* <span>{discount + "%"}</span> */}
      </div>
    </div>
  );
}

export default Hotel;
