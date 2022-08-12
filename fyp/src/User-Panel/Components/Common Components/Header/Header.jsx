import { useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import TitleBar from "./TitleBar";
import NavBar from "./NavBar";
import "./Header.css";

const Header = (props) => {
  const { loginState, setLoginState, clicked, setClicked } = props;

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const [click, setClick] = useState(false);

  return (
    <>
      <div className="responsive-icon" onClick={() => setClick(!click)}>
        <Hamburger size={27} color="#7ed957" />
      </div>
      <TitleBar
        click={click}
        clicked={clicked}
        setClicked={setClicked}
        loginState={loginState}
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        setLoginState={setLoginState}
        setLoginOpen={setLoginOpen}
        setSignupOpen={setSignupOpen}
      />
      <NavBar
        classes={click ? "responsive-navbar" : "navbar"}
        loginState={loginState}
      />
    </>
  );
};

export default Header;
