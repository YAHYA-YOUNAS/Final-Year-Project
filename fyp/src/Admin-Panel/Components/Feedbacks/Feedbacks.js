import React, { useEffect, useState } from "react";
import InfoTable from "../Common Components/InfoTable/InfoTable";
import {
  adminFeedbacks,
  adminDeleteFeedback,
} from "../../Services/adminFeedbacksService";
import "./Feedbacks.css";

function Feedbacks() {
  const [feedbacksData, setFeedbacksData] = useState([]);
  const labels = ["ID", "Name", "Email", "Feedback"];

  // Fetch Data from API
  const getFeedbacks = async () => {
    const result = await adminFeedbacks();
    if (result) {
      setFeedbacksData(result["Feedbacks"]);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  // Delete a user
  const handleDeleteFeedback = async (id) => {
    const result = await adminDeleteFeedback(id);
    if (result) {
      setFeedbacksData(feedbacksData.filter((feedback) => feedback._id !== id));
    }
  };

  return (
    <div className="feedbacks-section">
      <InfoTable
        title="Feedbacks"
        labels={labels}
        data={feedbacksData}
        handleDelete={handleDeleteFeedback}
      />
    </div>
  );
}

export default Feedbacks;
