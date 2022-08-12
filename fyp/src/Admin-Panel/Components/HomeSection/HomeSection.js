import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../Utils/Loader.gif";
import { successToast } from "../../../Utils/Toast";
import Hotel from "../../../User-Panel/Components/Hotel/Hotel";
import { adminHomeSection } from "../../Services/adminHomeSectionService";
import { updateDestinationHotels } from "../../Services/adminDestinationService";
import YoutubeEmbed from "../../../User-Panel/Components/Common Components/YoutubeEmbed/YoutubeEmbed";
import HotelDetails from "../../../User-Panel/Components/Common Components/HotelDetails/HotelDetails";
import "./HomeSection.css";

function HomeSection({
  path,
  open,
  setOpen,
  setHotel,
  hotel,
  loading,
  setLoading,
}) {
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await adminHomeSection();
    if (result) {
      setCities(result["CitiesData"]);
      setHotels(result["FeaturedHotelsData"]);
      setVideos(result["VideosData"]);
    }
  };

  // const hotelData = [
  //   {
  //     id: 1,
  //     name: "Hotel Mountain Lodge",
  //     image: images.hotel_image_1,
  //     location: "Satpara Road Sakrdu City view point",
  //     rating: 4,
  //     facilities: ["Cutlery", "Wifi", "Parking"],
  //     price: 5300,
  //     discount: -10,
  //   },
  //   {
  //     id: 2,
  //     name: "Hotel Summit Sakrdu",
  //     image: images.hotel_image_2,
  //     location: "Hotel Summit and Restaurant, Sakrdu",
  //     rating: 3,
  //     facilities: ["Cutlery", "Wifi", "Parking"],
  //     price: 3400,
  //     discount: -2,
  //   },
  //   {
  //     id: 3,
  //     name: "Continental Guest House",
  //     image: images.hotel_image_3,
  //     location:
  //       "Continental Guest House Sakrdu, Ali abad, near Alamdar chowk, Sakrdu",
  //     rating: 4,
  //     facilities: ["Cutlery", "Wifi", "Parking"],
  //     price: 6200,
  //     discount: -8,
  //   },
  //   {
  //     id: 4,
  //     name: "Hotel Deewanekhas Sakrdu",
  //     image: images.hotel_image_4,
  //     location: "Kazmi Bazar Near Governer House",
  //     rating: 3,
  //     facilities: ["Cutlery", "Wifi", "Parking"],
  //     price: 8200,
  //     discount: -4,
  //   },
  //   {
  //     id: 5,
  //     name: "Pearl Continental Hotel",
  //     image: images.hotel_image_5,
  //     location: "Islamabad Capital Territory",
  //     rating: 5,
  //     facilities: ["Cutlery", "Wifi", "Parking"],
  //     price: 4500,
  //     discount: -9,
  //   },
  // ];

  // const [hotels, setHotels] = useState(hotelData);

  // Handle Update Destination button
  const loaderStyles = {
    width: " 80px",
    height: "80px",
    margin: "2% 0 5% 45%",
  };

  const handleClick = () => {
    const reply = prompt(
      "Are you sure to update destination hotels? External API call may take several minutes to complete."
    );
    if (reply === "Yes" || reply === "yes") {
      setLoading(true);
      const updateData = async () => {
        const result = await updateDestinationHotels();
        if (result) {
          setLoading(false);
          successToast(result["Result"]);
        }
      };

      updateData();
    }
  };

  return (
    <div className="client-home-section">
      <div className="client-subsection">
        <div className="client-subsection-title">
          <h3 className="client-subsection-title-heading">
            Popular Destinations
          </h3>
          <button
            className="add-new-btn update-destinations"
            onClick={handleClick}
          >
            Update
          </button>
          <Link className="add-new-btn" to={`${path}/addNew/destination`}>
            Add New
          </Link>
        </div>

        {loading ? (
          <img style={loaderStyles} src={Loader} alt="" />
        ) : (
          <div className="city-section">
            {cities.length > 0 ? (
              cities.map((city) => (
                <div className="city" key={city._id}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textAlign: "center",
                    }}
                    to={`${path}/homeSection/${city.cityName}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}${city.imageUrl}`}
                      alt=""
                      className="city-img"
                    />
                    <h4 className="city-name">{city.cityName}</h4>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no_data_title">
                <h4>No Cities</h4>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="client-subsection">
        <div className="client-subsection-title">
          <h3 className="client-subsection-title-heading">Featured Hotels</h3>
          <Link className="add-new-btn" to={`${path}/addNew/hotel`}>
            Add New
          </Link>
        </div>
        <div className="hotel-featured-section">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <Hotel
                key={index}
                data={hotel}
                open={open}
                title={"featuredHotels"}
                setOpen={setOpen}
                setHotel={setHotel}
              />
            ))
          ) : (
            <div className="no_data_title">
              <h4>No Featured Hotels</h4>
            </div>
          )}
          <HotelDetails open={open} setOpen={setOpen} hotelData={hotel} />
        </div>
      </div>

      <div className="client-subsection">
        <div className="client-subsection-title">
          <h3 className="client-subsection-title-heading">Videos</h3>
          <Link className="add-new-btn" to={`${path}/addNew/video`}>
            Add New
          </Link>
        </div>
        <div className="video-section">
          {videos.length > 0 ? (
            videos.map((item) => (
              <div className="video" key={item._id}>
                <YoutubeEmbed embedId={item.embedId} />
              </div>
            ))
          ) : (
            <div className="no_data_title">
              <h4>No Videos</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
