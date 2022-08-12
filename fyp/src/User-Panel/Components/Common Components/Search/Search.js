import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import HandleCounters from "../Counter/HandleCounters";
import { warningToast } from "../../../../Utils/Toast";
import { generateRecommendations } from "../../../Services/recommendationsService";
import "./Search.css";

const Search = ({ loginState, setLoginOpen, setShow }) => {
  let history = useHistory();

  const [state, setState] = useState("hide");
  const [counter, setCounter] = useState([1, 0, 1]);

  const [counters, setCounters] = useState([
    { id: 1, value: 1 },
    { id: 2, value: 0 },
    { id: 3, value: 1 },
  ]);

  const [location, setLocation] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");

  const handleClick = () => {
    if (state === "show") {
      setState("hide");
    } else {
      setState("show");
    }
  };

  const handleCounter = (index, value) => {
    const newCounters = [...counter];
    newCounters[index] = value;
    setCounter(newCounters);
  };

  // Handle API Call
  const sendData = async (data) => {
    setShow(true);
    const result = await generateRecommendations(data);
    if (result) {
      history.push("/recommendations");
    }
  };

  // Handling search button
  const handleSearchClick = () => {
    if (location === "" || checkinDate === "" || checkoutDate === "") {
      warningToast("Kindly fill the form completely!");
    } else {
      if (loginState) {
        const data = {
          location,
          checkinDate,
          checkoutDate,
          counter,
          userId: localStorage.getItem("userID"),
        };

        sendData(data);
      } else {
        setLoginOpen(true);
      }
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="search-form-div">
          <label htmlFor="where">Where</label>
          <br />
          <input
            type="text"
            placeholder="Where to go?"
            maxLength={30}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <span className="overlayLine"></span>

        <div className="search-form-div">
          <label htmlFor="checkinDate">Checkin Date</label>
          <br />
          <input
            type="date"
            required
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
          />
        </div>
        <span className="overlayLine"></span>

        <div className="date search-form-div">
          <label htmlFor="checkoutDate">Checkout Date</label>
          <br />
          <input
            type="date"
            required
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
          />
        </div>
        <span className="overlayLine"></span>

        <div className="travelers search-form-div" onClick={handleClick}>
          <label htmlFor="travelers">Travelers and Rooms</label>
          <br />
          <p className="traveler-type">
            <span>Adults: {counter[0]}</span>&emsp;
            <span>Children: {counter[1]}</span>&emsp;
            <span>Rooms: {counter[2]}</span>
          </p>
        </div>

        {state === "show" && (
          <div className="travelers-count">
            <div className="travelers-labels">
              <span className="traveler">Adults</span>
              <span className="traveler">Children</span>
              <span className="traveler">Rooms</span>
            </div>
            <HandleCounters
              getCount={handleCounter}
              counters={counters}
              setCounters={setCounters}
            />
          </div>
        )}

        <button
          type="button"
          className="search-button"
          onClick={handleSearchClick}
        >
          Search <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
