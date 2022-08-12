import { useState } from "react";
import { useEffect } from "react";
import { getAboutData } from "../../Services/aboutService";
import "./About.css";

const About = () => {
  const [aboutText, setAboutText] = useState("");
  const [aboutImgUrl, setAboutImgUrl] = useState("");

  const getAbout = async () => {
    const result = await getAboutData();
    if (result) {
      setAboutText(result["AboutText"]);
      setAboutImgUrl(
        `${process.env.REACT_APP_SERVER_URL}${result["AboutImage"]}`
      );
    }
  };

  useEffect(() => {
    getAbout();
  });

  return (
    <div className="about-section">
      <img className="about-image" src={aboutImgUrl} alt="" />
      <p className="about-text">{aboutText}</p>
    </div>
  );
};

export default About;
