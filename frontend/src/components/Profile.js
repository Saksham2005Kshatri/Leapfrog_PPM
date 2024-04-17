import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Delete from "./Delete.js";
import Navbar from "./Navbar.js";
import { useAuth } from "../Authcontext.js";
import UpdateButton from "./UpdateButton.js";
import Header from "./Header.js";
import NotesArea from "./NotesArea.js";

const Profile = () => {
  const [data, setData] = useState([]);
  const [fullName, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [dob, setDob] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [profilePicture, setFile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated } = useAuth();

  const [notes, setNotes] = useState("");

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/${id}`);
      const userData = response.data;
      setData(userData);
      setFullname(userData.fullName);
      setGender(userData.gender);
      setPhoneNumber(userData.phoneNumber);
      setStreetAddress(userData.streetAddress);
      setCity(userData.city);
      setZipCode(userData.zipCode);
      setDob(userData.dob);
      setRegisteredDate(userData.registeredDate);
      setFile(userData.profilePicture); // Set profile picture URL
      setEmail(userData.email);
      setPassword(userData.password);
      console.log(userData);
      if ("profilePicture" in userData) {
        console.log("Profile Picture URL:", userData.profilePicture);
        setFile(userData.profilePicture);
      } else {
        console.log("Profile Picture URL not found in user data");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const imageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const detailStyle = {
    fontWeight: 200,
    margin: "2px 0",
  };

  const dob_format = new Date(data.dob);

  function getAge() {
    const dob_year = dob_format.getFullYear();
    const current_year = new Date().getFullYear();
    const age = current_year - dob_year;
    return age;
  }

  return (
    <>
      <Navbar />
      <Header />
      <Dashboard>
        <User>
          <img
            src={profilePicture.url}
            alt="profile"
            style={imageStyle}
            className="profilePicture"
          />
          <ProfileName>{data.fullName}</ProfileName>
          <Email>{data.email}</Email>
          {" | "}
          <Age>Age: {getAge()}</Age>
        </User>
        <Details>
          <Detail>
            <p style={detailStyle}>Gender: </p>
            {data.gender}
          </Detail>

          <Detail>
            <p style={detailStyle}>Date of Birth: </p>
            {dob_format.getFullYear() +
              "-" +
              dob_format.getMonth() +
              "-" +
              dob_format.getDay()}
          </Detail>
          <Detail>
            <p style={detailStyle}>Phone number: </p>
            {data.phoneNumber}
          </Detail>
          <Detail>
            <p style={detailStyle}>Street Address: </p>
            {data.streetAddress}
          </Detail>
          <Detail>
            <p style={detailStyle}>City: </p>
            {data.city}
          </Detail>
          <Detail>
            <p style={detailStyle}>Zip code: </p>
            {data.zipCode}
          </Detail>
          <Detail>
            <p style={detailStyle}>Registered date: </p>
            {data.registeredDate}
          </Detail>
        </Details>

        <NotesText>
          <label htmlFor="notes">Add a note:</label>
          <Note
            value={notes}
            id="notes"
            cols="30"
            rows="4"
            className="notes-textarea"
            onChange={(e) => setNotes(e.target.value)}
          ></Note>
          <SubmitNoteButton />
          <NotesArea />
        </NotesText>
      </Dashboard>
      <ButtonsWrapper>
        <ButtonsSection>
          {authenticated && <UpdateButton userId={id} />}
        </ButtonsSection>
        <ButtonsSection>{authenticated && <Delete />}</ButtonsSection>
      </ButtonsWrapper>
    </>
  );
};

const responsiveBreakpoint = "768px";

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 20px;

  @media (min-width: ${responsiveBreakpoint}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const User = styled.div`
  text-align: center;
  margin: 5px;
  border-style: inset;
  padding: 20px;
  border-radius: 30px;
  flex: 1;
  height: 300px;

  @media (min-width: ${responsiveBreakpoint}) {
    margin-bottom: 0;
  }
`;

const ProfileName = styled.h2`
  margin-top: 10px;
  font-size: 24px;
`;

const Email = styled.p`
  display: inline;
  font-weight: 200;
`;

const Age = styled.p`
  display: inline;
  font-weight: 200;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5px;
  height: 300px;
  border-style: outset;
  border-radius: 30px;
  padding: 20px;
`;

const Detail = styled.p`
  flex: 0 0 calc(33.33% - 20px); /* Each column takes up one-third of the width minus margins */
  margin: 5px 0;
`;

const NotesText = styled.div`
  margin: 10px;
  margin-top: 20px;
  flex: 1; /* Take up one-third of the width */
`;

const Note = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitNoteButton = styled.button`
  background-color: teal;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 25px;

  @media (min-width: ${responsiveBreakpoint}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 0;
  }
`;

const ButtonsSection = styled.div`
  margin-bottom: 20px;
  /* display: flex; */
  /* justify-content: center; */

  @media (min-width: ${responsiveBreakpoint}) {
    margin-bottom: 0;
  }
`;

export default Profile;
