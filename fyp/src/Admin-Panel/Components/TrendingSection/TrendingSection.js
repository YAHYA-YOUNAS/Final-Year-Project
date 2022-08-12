import React, { useState, useEffect } from "react";
import Loader from "../../../Utils/Loader.gif";
import { successToast } from "../../../Utils/Toast";
import Hotel from "../../../User-Panel/Components/Hotel/Hotel";
import { updateTrendingHotels } from "../../Services/adminTrendingService";
import { getTrendingHotels } from "../../../User-Panel/Services/trendingHotelsService";
import HotelDetails from "../../../User-Panel/Components/Common Components/HotelDetails/HotelDetails";
import "./TrendingSection.css";

function TrendingSection({
  open,
  setOpen,
  setHotel,
  hotel,
  loading,
  setLoading,
}) {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getTrendingHotels();
      if (result) {
        setLoading(false);
        setHotels(result);
      }
    };
    getData();
  }, [setLoading]);

  const handleClick = () => {
    setLoading(true);
    const updateData = async () => {
      const result = await updateTrendingHotels();
      if (result) {
        setLoading(false);
        successToast(result["Result"]);
      }
    };

    updateData();
  };

  const loaderStyles = {
    width: " 80px",
    height: "80px",
    margin: "2% 0 5% 45%",
  };

  return (
    <div className="client-trending-hotels">
      <div className="client-subsection-title">
        <h3 className="client-subsection-title-heading">Trending Hotels</h3>
        <button className="add-new-btn" onClick={handleClick}>
          Update
        </button>
      </div>

      {loading ? (
        <img style={loaderStyles} src={Loader} alt="" />
      ) : (
        <div className="hotel-trending-section">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <Hotel
                key={index}
                data={hotel}
                open={open}
                setOpen={setOpen}
                setHotel={setHotel}
              />
            ))
          ) : (
            <div className="no_hotels_title">
              <h4>No Trending Hotels</h4>
            </div>
          )}
          <HotelDetails open={open} setOpen={setOpen} hotelData={hotel} />
        </div>
      )}
    </div>
  );
}

export default TrendingSection;
