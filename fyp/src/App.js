import React, { useState } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import ScrollButton from "./Utils/ScrollButton";
import About from "./User-Panel/Components/About/About";
import Hotel from "./User-Panel/Components/Hotel/Hotel";
import Contact from "./User-Panel/Components/Contact/Contact";
import Profile from "./User-Panel/Components/Profile/Profile";
import Trending from "./User-Panel/Components/Trending/Trending";
import NotFound from "./User-Panel/Components/NotFound/NotFound";
import HomePage from "./User-Panel/Components/HomePage/HomePage";
import Favorite from "./User-Panel/Components/Favorite/Favorite";
import Destination from "./User-Panel/Components/HomePage/Destination";
import AdminLogin from "./Admin-Panel/Components/AdminLogin/AdminLogin";
import Header from "./User-Panel/Components/Common Components/Header/Header";
import Footer from "./User-Panel/Components/Common Components/Footer/Footer";
import Recommendations from "./User-Panel/Components/Recommendations/Recommendations";
import PrivacyPolicy from "./User-Panel/Components/Common Components/Footer/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./User-Panel/Components/Common Components/Footer/TermsAndConditions/TermsAndConditions";
import "./App.css";

function App() {
  const [clicked, setClicked] = useState(false);

  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});

  // const [isloggedIn, setisloggedIn] = useState(() => {
  //   const saved = localStorage.getItem("userLogged");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || false;
  // });

  const [isloggedIn, setisloggedIn] = useState(() => {
    const saved = localStorage.getItem("userID");
    return saved || false;
  });

  // const setLoginState = () => {
  //   const userLogged = localStorage.getItem("userID");
  //   if (userLogged) {
  //     setisloggedIn(true);
  //   } else {
  //     setisloggedIn(false);
  //   }
  // };

  const pathArray = ["/admin", "/not-found"];
  const path = useRouteMatch(pathArray.map((route) => route));

  return (
    <>
      {!path && (
        <>
          <ScrollButton />
          <Header
            loginState={isloggedIn}
            setLoginState={setisloggedIn}
            clicked={clicked}
            setClicked={setClicked}
          />
        </>
      )}
      <div onClick={() => setClicked(false)}>
        <Switch>
          <Route exact path="/">
            <HomePage
              loginState={isloggedIn}
              setLoginState={setisloggedIn}
              open={open}
              setOpen={setOpen}
              hotel={hotel}
              setHotel={setHotel}
            />
          </Route>

          <Route path="/destination/:cityname">
            <Destination
              loginState={isloggedIn}
              open={open}
              setOpen={setOpen}
              hotel={hotel}
              setHotel={setHotel}
            />
          </Route>

          <Route path="/hotel">
            <Hotel />
          </Route>

          <Route path="/trending">
            <Trending
              loginState={isloggedIn}
              open={open}
              setOpen={setOpen}
              hotel={hotel}
              setHotel={setHotel}
            />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/favorite">
            <Favorite open={open} setOpen={setOpen} />
          </Route>

          <Route path="/recommendations">
            <Recommendations
              loginState={isloggedIn}
              open={open}
              setOpen={setOpen}
              hotel={hotel}
              setHotel={setHotel}
            />
          </Route>

          <Route path="/profile">
            <Profile loginState={isloggedIn} />
          </Route>

          <Route path="/privacyPolicy">
            <PrivacyPolicy />
          </Route>

          <Route path="/termsAndConditions">
            <TermsAndConditions />
          </Route>

          <Route path="/admin">
            <AdminLogin />
          </Route>

          <Route path="/not-found">
            <NotFound />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </div>
      {!path && <Footer />}
    </>
  );
}

export default App;
