import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar.js";
import "../styles/home.css";

const UserTable = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    fetch(`http://localhost:8000/admins`)
      .then((response) => response.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedData = data
    .slice()
    .sort((a, b) => a.username.localeCompare(b.username));

  function objectLength(obj_data) {
    const number = Object.keys(obj_data).length;
    return number;
  }

  return (
    <>
      <Navbar />
      <AdminNumber>Admins: {objectLength(data)}</AdminNumber>
      <table id="patients">
        <tr>
          <th>Username</th>
          <th>Email</th>
        </tr>
        {sortedData.map((dataObj, key) => {
          return (
            <tr key={key} className="patient-block">
              <td>{dataObj.username}</td>
              <td>{dataObj.email}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

const AdminNumber = styled.h5`
  display: inline;
  color: #0077b6;
  margin: 10px;
`;

export default UserTable;
