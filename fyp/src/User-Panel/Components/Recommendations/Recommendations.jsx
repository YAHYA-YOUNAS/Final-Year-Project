import React, { useEffect, useState } from "react";
import Hotel from "../Hotel/Hotel";
import Loader from "../../../Utils/Loader.gif";
import HotelDetails from "../Common Components/HotelDetails/HotelDetails";
import { getRecommendations } from "../../Services/recommendationsService";
import "./Recommendations.css";

function Recommendations(props) {
  const { loginState, open, setOpen, hotel, setHotel } = props;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await getRecommendations(localStorage.getItem("userID"));
      if (result) {
        setLoading(false);
        setData(result[0]);
      }
    };

    getData();
  }, []);

  const loaderStyles = {
    width: "100px",
    height: "100px",
    margin: "5% 0 5% 45%",
  };

  return (
    <>
      <div className="recommend-hotels">
        <h2 className="heading">Recommended Hotels</h2>
        {loading ? (
          <img style={loaderStyles} src={Loader} alt="" />
        ) : (
          <div className="recommend-section">
            {data.map((d, idx) => (
              <Hotel
                key={idx}
                loginState={loginState}
                data={d}
                title="recommendedHotels"
                open={open}
                setOpen={setOpen}
                setHotel={setHotel}
              />
            ))}
            <HotelDetails open={open} setOpen={setOpen} hotelData={hotel} />
          </div>
        )}
      </div>
    </>
  );
}

export default Recommendations;
