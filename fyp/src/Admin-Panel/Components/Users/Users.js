import React, { useState, useEffect } from "react";
import InfoTable from "../Common Components/InfoTable/InfoTable";
import { adminUsers } from "../../Services/adminUsersService";
import { adminDeleteUser } from "../../Services/adminUserService";
import "./Users.css";

function Users({ path }) {
  const [userData, setUserData] = useState([]);
  const labels = ["ID", "Full Name", "Email"];

  // Fetch Data from API
  const getUsers = async () => {
    const result = await adminUsers();
    if (result) {
      setUserData(result["Users"]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Delete a user
  const handleDeleteUser = async (id) => {
    const result = await adminDeleteUser(id);
    if (result) {
      setUserData(userData.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="users-section">
      <InfoTable
        title="Users"
        labels={labels}
        data={userData}
        path={path}
        handleDelete={handleDeleteUser}
      />
    </div>
  );
}

export default Users;
