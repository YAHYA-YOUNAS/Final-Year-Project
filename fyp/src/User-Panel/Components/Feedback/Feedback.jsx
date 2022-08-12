import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import images from "../Common Components/ImportImages";
import { saveFeedback } from "../../Services/feedbackService";
import { successToast } from "../../../Utils/Toast";
import "./Feedback.css";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [open, setOpen] = useState(false);

  const onOpenModel = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Form handling
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      feedback,
    };

    // API handling
    const storeFeedback = async (data) => {
      const result = await saveFeedback(data);
      if (result) {
        successToast(result["Result"]);
        setName("");
        setEmail("");
        setFeedback("");
        onCloseModal();
      }
    };

    storeFeedback(data);
  };

  return (
    <>
      <div>
        <button className="feedback-btn" onClick={onOpenModel}>
          Give Feedback
        </button>

        <Modal open={open} onClose={onCloseModal} center>
          <div className="modal-section">
            <form className="feedback-form" onSubmit={handleSubmit}>
              <h3 className="feedback-heading">Feedback</h3>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                title="Only upper and lower case characters"
                pattern="^[a-zA-Z_ ]*$"
                value={name}
                maxLength={30}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                name="feedback"
                id="feedback"
                cols="30"
                rows="30"
                placeholder="Your Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <button
                className="feedback-button"
                id="submit"
                name="submit"
                type="submit"
              >
                Send
              </button>
            </form>
            <img
              className="feedback-image"
              src={images.feedback_image}
              alt=""
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Feedback;
