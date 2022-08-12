import React, { useState, useEffect } from "react";
import InfoTable from "../Common Components/InfoTable/InfoTable";
import {
  adminContacts,
  adminDeleteContact,
} from "../../Services/adminContactsService";
import "./Contacts.css";

function Contacts() {
  const [contactsData, setContactsData] = useState([]);
  const labels = ["ID", "Name", "Email", "Subject", "Message"];

  // Fetch Data from API
  const getContacts = async () => {
    const result = await adminContacts();
    if (result) {
      setContactsData(result["Contacts"]);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  // Delete a user
  const handleDeleteContact = async (id) => {
    const result = await adminDeleteContact(id);
    if (result) {
      setContactsData(contactsData.filter((contact) => contact._id !== id));
    }
  };

  return (
    <div className="contacts-section">
      <InfoTable
        title="Contacts"
        labels={labels}
        data={contactsData}
        handleDelete={handleDeleteContact}
      />
    </div>
  );
}

export default Contacts;
