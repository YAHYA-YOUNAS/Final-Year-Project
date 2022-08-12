import { useState, useEffect } from "react";
import Hotel from "../Hotel/Hotel";
import HotelDetails from "../Common Components/HotelDetails/HotelDetails";
import { getTrendingHotels } from "../../Services/trendingHotelsService";
import "./Trending.css";

const Trending = (props) => {
  const [hotels, setHotels] = useState([]);

  const getData = async () => {
    const result = await getTrendingHotels();
    if (result) {
      setHotels(result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { loginState, open, setOpen, hotel, setHotel } = props;

  return (
    <div className="trending-hotels">
      <h2 className="heading">Trending Hotels</h2>
      <div className="trending-section">
        {hotels.map((hotel, index) => (
          <Hotel
            key={index}
            loginState={loginState}
            data={hotel}
            open={open}
            setOpen={setOpen}
            setHotel={setHotel}
          />
        ))}
        <HotelDetails open={open} setOpen={setOpen} hotelData={hotel} />
      </div>
    </div>
  );
};

export default Trending;
