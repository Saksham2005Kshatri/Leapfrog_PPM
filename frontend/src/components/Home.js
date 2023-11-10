import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const url = "http://localhost:8000/";

  const fetchData = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const linkStyles = {
    textDecoration: "none",
    color: "#0077b6",
  };

  const numberStyle = {
    display: "inline",
    fontWeight: 200,
    color: "blue",
  };

  function objectLength(obj_data) {
    const number = Object.keys(obj_data).length;
    return number;
  }

  // sorting the data in alphabetical order
  const sortedData = data
    .slice()
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <>
      <Navbar />

      <PatientNumber>
        Patients: <p style={numberStyle}>{objectLength(data)}</p>
      </PatientNumber>

      <table id="patients">
        <tr>
          <th>Profile Picture</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>City</th>
          <th>Registered Date</th>
          <th>Visit Link</th>
        </tr>

        {sortedData.map((dataObj, key) => {
          return (
            <tr key={key} className="patient-block">
              <td>
                <ProfilePicture>
                  <img src={dataObj.profilePicture.url} alt="" />
                </ProfilePicture>
              </td>
              <td>{dataObj.fullName}</td>
              <td>{dataObj.gender}</td>
              <td>{dataObj.phoneNumber}</td>
              <td>{dataObj.city}</td>
              <td>{dataObj.registeredDate}</td>
              <td>
                <Link
                  key={dataObj._id}
                  to={`/user/${dataObj._id}`}
                  // style={linkStyles}
                >
                  Visit {dataObj.fullName}{" "}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </Link>
              </td>

              {/* </Link> */}
            </tr>
          );
        })}
      </table>
    </>
  );
};

const ProfilePicture = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  h5,
  h6 {
    text-align: center;
    margin: 5px 0;
  }
`;

const PatientNumber = styled.h5`
  display: inline;
  color: #0077b6;
  margin: 10px;
`;

export default Home;
