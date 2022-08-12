import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import images from "../Common Components/ImportImages";
import { saveContact } from "../../Services/contactService";
import { successToast } from "../../../Utils/Toast";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Form handling
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      subject,
      message,
    };

    // API handling
    const storeContact = async (data) => {
      const result = await saveContact(data);
      if (result) {
        successToast(result["Result"]);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    };

    storeContact(data);
  };

  return (
    <div className="contact-page">
      <div className="contact-section">
        <img src={images.contact_image} alt="" />
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-heading">Get In Touch</h2>
          <input
            name="name"
            type="text"
            placeholder="Name"
            title="Only upper and lower case characters"
            pattern="^[a-zA-Z_ ]*$"
            required
            maxLength={30}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            title="Only upper,lower case and numeric characters"
            pattern="^[a-zA-Z0-9_ ]*$"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <br />
          <br />
          <textarea
            name="message"
            cols="30"
            rows="30"
            placeholder="Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <br />
          <br />
          <button className="send-mail-btn" type="submit">
            Send &emsp;
            <FaArrowRight className="arrow-right-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
