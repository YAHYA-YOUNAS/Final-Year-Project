import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { loggedInData } from "../../../Services/adminHeaderService";
import images from "../../../../User-Panel/Components/Common Components/ImportImages";
import "./Header.css";

export default function Header({ path, clicked, setClicked }) {
  let history = useHistory();

  const [adminName, setAdminName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("AdminID");
    history.push("/");
    // window.location.href = path;
  };

  useEffect(() => {
    const getData = async () => {
      const result = await loggedInData(localStorage.getItem("AdminID"));
      if (result) {
        setAdminName(result["AdminName"]);
        if (result["ImageUrl"]) {
          setImageUrl(result["ImageUrl"]);
        }
      }
    };
    getData();
  }, [setAdminName]);

  return (
    <>
      <div className="admin-header">
        <div
          className="admin-profile-section"
          onClick={() => setClicked(!clicked)}
        >
          <img src={imageUrl !== "" ? imageUrl : images.user_dp} alt="" />
          <h4>{adminName !== "" ? adminName : "Admin"}</h4>
        </div>
        {clicked && (
          <div className="admin-header-dropdown">
            <Link to={`${path}/profile`} className="admin-dropdown-link">
              Profile
            </Link>
            <Link
              to={path}
              className="admin-dropdown-link"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
