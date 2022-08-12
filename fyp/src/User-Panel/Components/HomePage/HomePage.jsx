import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hotel from "../Hotel/Hotel";
import BackgroundImage from "../Common Components/BackgroundImage";
import images from "../Common Components/ImportImages";
import Search from "../Common Components/Search/Search";
import Feedback from "../Feedback/Feedback";
import Login from "../Common Components/Login/Login";
import Register from "../Common Components/Register/Register";
import LoadingOverlay from "react-loading-overlay";
import { getHomePageData } from "../../Services/homepageService";
import HotelDetails from "../Common Components/HotelDetails/HotelDetails";
import YoutubeEmbed from "../Common Components/YoutubeEmbed/YoutubeEmbed";
import "./HomePage.css";

const HomePage = (props) => {
  const { loginState, setLoginState, open, setOpen, hotel, setHotel } = props;

  const [show, setShow] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const [destinations, setDestinations] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [videos, setVideos] = useState([]);

  const getData = async () => {
    const result = await getHomePageData();
    if (result) {
      setDestinations(result["Destinations"]);
      setFeaturedHotels(result["FeaturedHotels"]);
      setVideos(result["Videos"]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  // Handle NavHashLink of Featured and Video Section
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }
  }, []);

  return (
    <>
      <div>
        <BackgroundImage />

        {show ? (
          <LoadingOverlay
            className="overlay-loader"
            active={show}
            spinner
            text="Generating Recommendations..."
          />
        ) : (
          <Search
            loginState={loginState}
            setLoginOpen={setLoginOpen}
            setShow={setShow}
          />
        )}
      </div>

      <Login
        open={loginOpen}
        setLoginState={setLoginState}
        setLoginOpen={setLoginOpen}
        setSignupOpen={setSignupOpen}
      />

      <Register
        open={signupOpen}
        setLoginOpen={setLoginOpen}
        setSignupOpen={setSignupOpen}
      />

      <div id="destination-section" className="cities-container">
        <h2 className="heading">POPULAR DESTINATIONS</h2>
        <div className="cities-section">
          {destinations.map((destination) => (
            <div className="cities-images" key={destination._id}>
              <Link
                to={`/destination/${destination.cityName}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${destination.imageUrl}`}
                  alt=""
                />
                <p>{destination.cityName}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div id="featured-section" className="hotels-container">
        <h2 className="heading">FEATURED HOTELS</h2>
        <div className="hotels-section">
          {featuredHotels.map((hotel, index) => (
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

      <div id="video-section" className="videos-container">
        <h2 className="heading">VIDEOS</h2>
        <div className="videos-section">
          {videos.map((video) => (
            <div className="videos" key={video._id}>
              <YoutubeEmbed embedId={video.embedId} />
            </div>
          ))}
        </div>
      </div>

      <div className="wallpaper-section">
        <img className="wallpaper" src={images.wallpaper} alt="" />
        <div className="feedback-section">
          <h1>Feedback</h1>
          <h3>How much you like our service? Share your experience with us!</h3>
          <Feedback />
        </div>
      </div>
    </>
  );
};

export default HomePage;
