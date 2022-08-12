import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { adminDashboard } from "../../Services/adminDashboardService";
import "./Home.css";

function Home() {
  const [data, setData] = useState({
    users: 0,
    contacts: 0,
    feedbacks: 0,
    provinces: {},
    travelExperiences: {},
  });

  const getData = async () => {
    const result = await adminDashboard();
    if (result) {
      setData({
        users: result["Users"],
        contacts: result["Contacts"],
        feedbacks: result["Feedbacks"],
        provinces: result["Provinces"],
        travelExperiences: result["TravelExperiences"],
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const provincesData = [
    { name: "Punjab", value: data.provinces["Punjab"] },
    { name: "Sindh", value: data.provinces["Sindh"] },
    { name: "KPK", value: data.provinces["KPK"] },
    { name: "Balochistan", value: data.provinces["Balochistan"] },
  ];

  const travelExperiencesData = [
    { name: "1 year", value: data.travelExperiences["1 year"] },
    { name: "Less than 5 years", value: data.travelExperiences["Lt 5 years"] },
    {
      name: "Less than 10 years",
      value: data.travelExperiences["Lt 10 years"],
    },
    {
      name: "Less than 15 years",
      value: data.travelExperiences["Lt 15 years"],
    },
    { name: "Less than 20", value: data.travelExperiences["Lt 20 years"] },
    { name: "Above 20 years", value: data.travelExperiences["Gt 20 years"] },
  ];

  const cardsData = [
    {
      heading: "Registered Users",
      value: data.users,
    },
    {
      heading: "Contacts Received",
      value: data.contacts,
    },
    {
      heading: "Feedbacks Received",
      value: data.feedbacks,
    },
  ];

  const sectionsData = [
    {
      detail: "All the users who registered themselves in the user panel",
    },
    {
      detail:
        "All the contacts sent by both registers / unregistered users in the user panel",
    },
    {
      detail:
        "All the feedbacks submitted by both registers / unregistered users in the user panel",
    },
    {
      detail:
        "Perform sentimental analysis on any text and visualize how sentimental analysis model works",
    },
    {
      detail:
        "Information about hotels of cities, featured hotels, trending hotels, video section, and about section",
    },
  ];

  const sectionHeadings = [
    "Users",
    "Contacts",
    "Feedbacks",
    "Sentimental Stats",
    "Other Sections",
  ];
  const fontIcons = [
    "fa fa-user-o",
    "fa fa-phone",
    "fa fa-comments-o",
    "fa fa-bar-chart",
    "fa fa-list-alt",
  ];

  return (
    <div className="dashboard-home">
      <div className="content-title">
        <h3 style={{ textDecoration: "underline" }}>Hello Admin!</h3>
        <p>
          The place where you can visualize the charts, statistics, and analyze
          the information of users, contacts, feedbacks. You can also view, add,
          update, and delete the information.
        </p>
      </div>

      <div className="stats-cards">
        {cardsData.map((card, index) => (
          <div className="stats-card" key={index}>
            <h4>{card.heading}</h4>
            <span>{card.value}</span>
          </div>
        ))}
      </div>

      <div className="users-details-section">
        <div className="users-details">
          <h3>Users Details</h3>
          <div className="users-details-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={provincesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#FFC154"
                  label
                />
                <Pie
                  data={travelExperiencesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#47B39C"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="users-details-info">
            <p>Hover over the charts to view the statistics.</p>
            <p>Yellow represents users from states/regions of Pakistan.</p>
            <p>
              Green represents the users from different categories of travel
              experiences.
            </p>
          </div>
        </div>

        <div className="sections-showcase">
          <h3>Sections Overview</h3>

          {sectionsData.map((section, index) => (
            <div className="section-showcase" key={index}>
              <div className="section-details">
                <h4>
                  <i className={fontIcons[index]} aria-hidden="true" />
                  &nbsp; {sectionHeadings[index]}
                </h4>
                <span>{section.detail}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
