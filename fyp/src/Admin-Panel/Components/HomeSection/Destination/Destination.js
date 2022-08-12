import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Hotel from "../../../../User-Panel/Components/Hotel/Hotel";
import "../../../../User-Panel/Components/Common Components/Pagination/Pagination.css";
import { getDestinationHotels } from "../../../../User-Panel/Services/destinationService";
import HotelDetails from "../../../../User-Panel/Components/Common Components/HotelDetails/HotelDetails";
import "./Destination.css";

function Destination({ path, open, setOpen, setHotel, hotel }) {
  const [dataLimit] = useState(12);
  const [pageLimit] = useState(5);
  const [data, setData] = useState([]);

  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const { cityname } = useParams();

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
    <div className="destination-hotels">
      <Link className="back-btn" to={`${path}/homeSection`}>
        <i className="fa fa-arrow-left" aria-hidden="true" />
      </Link>

      <h3
        style={{ marginTop: "3%" }}
        className="client-subsection-title-heading"
      >
        Hotels in {cityname}
      </h3>

      <div className="hotel-featured-section">
        {getPaginatedData().map((d, idx) => (
          <Hotel
            key={idx}
            data={d}
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
