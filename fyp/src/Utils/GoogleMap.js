import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function GoogleMap({ google, latitude, longitude }) {
  const styles = {
    width: "400px",
    height: "350px",
  };
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };
  return (
    <div>
      <Map
        google={google}
        style={styles}
        containerStyle={containerStyle}
        center={{
          lat: latitude,
          lng: longitude,
        }}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
        zoom={15}
        // disableDefaultUI={true}
      >
        <Marker
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(GoogleMap);
