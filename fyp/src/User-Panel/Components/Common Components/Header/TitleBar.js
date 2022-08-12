import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import images from "../ImportImages";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { getImageUrl } from "../../../Services/TitleBarService";

function TitleBar(props) {
  let history = useHistory();
  const {
    click,
    clicked,
    setClicked,
    loginState,
    setLoginState,
    signupOpen,
    loginOpen,
    setLoginOpen,
    setSignupOpen,
  } = props;

  const [imageUrl, setImageUrl] = useState("");

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("userLogged");
    localStorage.removeItem("userID");
    setLoginState(false);
    history.push("/");
    // window.location.href = "/";
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getImageUrl(localStorage.getItem("userID"));
      if (result) {
        setImageUrl(result["ImageUrl"]);
      }
    };

    loginState && getData();
  }, [loginState]);

  return (
    <div className={click ? "responsive-title-bar" : "title-bar"}>
      <Link to="/">
        <img
          className={click ? "responsive-logo" : "logo"}
          src={images.logo}
          alt=""
        />
      </Link>
      {loginState ? (
        <>
          {clicked && (
            <div className={click ? "responsive-user-options" : "user-options"}>
              <Link to="/favorite">Favorites</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
          <img
            className={click ? "responsive-user-dp" : "user-dp"}
            src={imageUrl !== "" ? imageUrl : images.user_dp}
            alt=""
            onClick={() => setClicked(!clicked)}
          />
        </>
      ) : (
        <div
          className={click ? "responsive-signup-register" : "signup-register"}
        >
          <button className="nav-link" onClick={() => setLoginOpen(true)}>
            Login
          </button>
          <button className="nav-link" onClick={() => setSignupOpen(true)}>
            Register
          </button>
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
        </div>
      )}
    </div>
  );
}

export default TitleBar;
