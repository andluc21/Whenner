//@ts-check
import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.png';
import "./CalendarPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <h1 className="Text-Styles3">Whenner</h1>
      <a href="http://localhost:8080/auth/example">Click here to login</a>
      <p>Leading provider of Scheduling</p>
      <Link to="/calendar">Go to Calendar</Link>
  <main>    <img src={logo} alt="Logo"></img></main>
    </div>
  );
};

export default LandingPage;