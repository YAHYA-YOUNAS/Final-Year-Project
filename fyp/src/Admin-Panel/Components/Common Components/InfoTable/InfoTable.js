import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./InfoTable.css";

function InfoTable(props) {
  const { title, labels, data, handleDelete, path } = props;
  const [readMoreSubject, setReadMoreSubject] = useState(false);
  const [readMoreMessage, setReadMoreMessage] = useState(false);
  const [readMoreFeedback, setReadMoreFeedback] = useState(false);

  const moreLess = (param) => {
    if (param === "subject") {
      return (
        <a
          href="true"
          className="read-more-link"
          onClick={(e) => {
            e.preventDefault();
            setReadMoreSubject(!readMoreSubject);
          }}
        >
          <span>{readMoreSubject ? "<Less" : "More>"}</span>
        </a>
      );
    } else if (param === "message") {
      return (
        <a
          href="true"
          className="read-more-link"
          onClick={(e) => {
            e.preventDefault();
            setReadMoreMessage(!readMoreMessage);
          }}
        >
          <span>{readMoreMessage ? "<Less" : "More>"}</span>
        </a>
      );
    } else if (param === "feedback") {
      return (
        <a
          href="true"
          className="read-more-link"
          onClick={(e) => {
            e.preventDefault();
            setReadMoreFeedback(!readMoreFeedback);
          }}
        >
          <span>{readMoreFeedback ? "<Less" : "More>"}</span>
        </a>
      );
    }
  };

  return (
    <table className="info-table" cellSpacing={0}>
      <thead>
        <tr className="info-table-headings">
          {labels.map((label, index) => (
            <th className="info-table-label" key={index}>
              {label}
            </th>
          ))}
          <th />
        </tr>
      </thead>

      <tbody className="info-table-rows">
        {data.length > 0 ? (
          data.map((item) => (
            <tr className="info-table-row" key={item._id}>
              {title === "Users" && (
                <>
                  <td>{item._id}</td>
                  <td>{`${item.fName} ${item.lName}`}</td>
                  <td>{item.email}</td>
                </>
              )}

              {title === "Contacts" && (
                <>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {!readMoreSubject &&
                      `${item.subject.substring(
                        0,
                        item.subject.length / 4
                      )}...`}
                    {readMoreSubject && item.subject}
                    &nbsp;
                    {moreLess("subject")}
                  </td>
                  <td>
                    {!readMoreMessage &&
                      `${item.message.substring(
                        0,
                        item.message.length / 4
                      )}...`}
                    {readMoreMessage && item.message}
                    &nbsp;
                    {moreLess("message")}
                  </td>
                </>
              )}

              {title === "Feedbacks" && (
                <>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {!readMoreFeedback &&
                      `${item.feedback.substring(
                        0,
                        item.feedback.length / 4
                      )}...`}
                    {readMoreFeedback && item.feedback}
                    &nbsp;
                    {moreLess("feedback")}
                  </td>
                </>
              )}

              <td className="info-table-action-label">
                {title === "Users" && (
                  <Link to={path + "/user/" + item._id}>
                    <i className="fa fa-edit" aria-hidden="true" />
                  </Link>
                )}

                <i
                  className="fa fa-trash-o info-table-delete-icon"
                  aria-hidden="true"
                  onClick={() => handleDelete(item._id)}
                />
              </td>
            </tr>
          ))
        ) : (
          <>
            <tr className="info-table-no-data-title">
              <td colSpan={7}>No {title}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

InfoTable.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default InfoTable;
