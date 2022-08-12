import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hotel from "../Hotel/Hotel";
import HotelDetails from "../Common Components/HotelDetails/HotelDetails";
import { getDestinationHotels } from "../../Services/destinationService";
import "../Common Components/Pagination/Pagination.css";

function Destination(props) {
  const { open, setOpen, loginState, hotel, setHotel } = props;

  const { cityname } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getDestinationHotels(cityname);
      if (result) {
        setData(result);
      }
    };
    getData();
  }, [cityname]);

  // Handle Pagination
  const dataLimit = 12;
  const pageLimit = 5;

  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  return (
    <div className="trending-hotels">
      <h2 className="heading">Hotels in {cityname}</h2>
      <div className="trending-section">
        {getPaginatedData().map((d, idx) => (
          <Hotel
            key={idx}
            data={d}
            loginState={loginState}
            open={open}
            setOpen={setOpen}
            setHotel={setHotel}
          />
        ))}
        <HotelDetails open={open} setOpen={setOpen} hotelData={hotel} />
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          &lt;
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Destination;
