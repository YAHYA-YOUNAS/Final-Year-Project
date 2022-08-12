import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "../Home/Home";
import User from "../User/User";
import Users from "../Users/Users";
import Profile from "../Profile/Profile";
import Contacts from "../Contacts/Contacts";
import Feedbacks from "../Feedbacks/Feedbacks";
import HomeSection from "../HomeSection/HomeSection";
import Header from "../Common Components/Header/Header";
import AddNew from "../Common Components/AddNew/AddNew";
import AboutSection from "../AboutSection/AboutSection";
import LeftPane from "../Common Components/LeftPane/LeftPane";
import Destination from "../HomeSection/Destination/Destination";
import TrendingSection from "../TrendingSection/TrendingSection";
import SentimentalStats from "../SentimentalStats/SentimentalStats";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(false);

  const [clicked, setClicked] = useState(false);
  const { url } = useRouteMatch();

  return (
    <>
      <Header path={url} clicked={clicked} setClicked={setClicked} />
      <div onClick={() => setClicked(false)}>
        <Switch>
          <Route exact path={`${url}/`}>
            <Home />
          </Route>

          <Route path={`${url}/dashboard`}>
            <Home />
          </Route>

          <Route path={`${url}/profile`}>
            <Profile />
          </Route>

          <Route path={`${url}/users`}>
            <Users path={url} />
          </Route>

          <Route path={`${url}/user/:userId`}>
            <User path={url} />
          </Route>

          <Route path={`${url}/contactsSection`}>
            <Contacts />
          </Route>

          <Route path={`${url}/feedbacksSection`}>
            <Feedbacks />
          </Route>

          <Route path={`${url}/homeSection/:cityname`}>
            <Destination
              path={url}
              open={open}
              setOpen={setOpen}
              setHotel={setHotel}
              hotel={hotel}
            />
          </Route>

          <Route path={`${url}/homeSection`}>
            <HomeSection
              path={url}
              hotel={hotel}
              open={open}
              setOpen={setOpen}
              setHotel={setHotel}
              loading={loading}
              setLoading={setLoading}
            />
          </Route>

          <Route path={`${url}/addNew/:heading`}>
            <AddNew path={url} />
          </Route>

          <Route path={`${url}/aboutSection`}>
            <AboutSection />
          </Route>

          <Route path={`${url}/trendingSection`}>
            <TrendingSection
              hotel={hotel}
              open={open}
              setOpen={setOpen}
              setHotel={setHotel}
              loading={loading}
              setLoading={setLoading}
            />
          </Route>

          <Route path={`${url}/sentimentalStatistics`}>
            <SentimentalStats />
          </Route>
        </Switch>
      </div>

      <LeftPane path={url} />
    </>
  );
}
