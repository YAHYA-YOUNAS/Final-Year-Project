import React, { useState, useEffect } from "react";
import {
  deleteFavoriteHotel,
  getFavoriteHotels,
} from "../../Services/favoriteService";
import HotelDetails from "../Common Components/HotelDetails/HotelDetails";
import "./Favorite.css";

function Favorite({ open, setOpen }) {
  const [hotels, setHotels] = useState([]);

  const getData = async () => {
    const result = await getFavoriteHotels(localStorage.getItem("userID"));
    if (result) {
      setHotels(result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (e, hotelId) => {
    e.stopPropagation();

    const removeFavorite = async (hotelId) => {
      const result = await deleteFavoriteHotel(hotelId);
      if (result) {
        setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
      }
    };

    removeFavorite(hotelId);
  };

  return (
    <div className="favorite-hotels">
      <h2 className="heading">Your Favorite Hotels</h2>
      <div className="favorite-hotel-section">
        {hotels.length > 0 &&
          hotels.map((hotel, index) => (
            <React.Fragment key={index}>
              <div
                className="favorite-hotel"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <div className="favorite-hotel-info">
                  <img src={hotel.image} alt="" />
                  <div>
                    <h3>{hotel.name}</h3>
                    <span>
                      <i
                        style={{
                          fontSize: "14pt",
                          fontWeight: "bold",
                          color: "orange",
                        }}
                        className="fa fa-map-marker"
                        arid-hidden="true"
                      />{" "}
                      {hotel.location}
                    </span>
                  </div>
                </div>

                <i
                  style={{
                    fontSize: "16pt",
                    fontWeight: "bold",
                    color: "red",
                  }}
                  onClick={(e) => handleClick(e, hotel._id)}
                  className="fa fa-times"
                  aria-hidden="true"
                />
              </div>
              <HotelDetails open={open} setOpen={setOpen} hotelData={hotel} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Favorite;
