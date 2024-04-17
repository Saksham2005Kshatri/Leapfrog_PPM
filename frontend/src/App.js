import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";

import UpdateForm from "./components/UpdateForm";
import Signup from "./components/Signup";

import UserTable from "./components/UserTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admins" element={<UserTable />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/user/:id/edit" element={<UpdateForm />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
