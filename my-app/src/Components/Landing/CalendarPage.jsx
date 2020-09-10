//@ts-check
import React, { useState, useEffect } from "react";
import "./CalendarPage.css";
import axios from "axios";
import Button from "../buttons/button.js";
import Scheduler from "../Scheduler/scheduler.js";
import Moment from 'react-moment'


function Calendar() {
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  // const [color, setColor] = useState("");
  const [events, setEvents] = useState([]);

  // const [ newDate, setNewDate ] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8080/events/all").then((res) => {
      console.log(res.data);
      setEvents(res.data);
    });
  }, []);

  const updateEvent = (ev) => {
    ev.preventDefault();
    
    axios.post("http://localhost:8080/updateEvent", {
      // Id: 1,
      Subject: subject,
      Location: location,
      StartTime: starttime,
      EndTime: endtime,
      // CategoryColor: color
      
    });
  };

  const [title, setTitle] = useState("");

  const getWeather = () => {
    const Http = new XMLHttpRequest();
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      title +
      "&appid=dd69af51f9afa40aa59c531c821b7cf0";
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      console.log("Response text before IF", Http.responseText);
      if (Http.responseText && JSON.parse(Http.responseText).weather) {
        console.log("Response text", Http.responseText);
        alert(
          "The weather today is " +
            JSON.parse(Http.responseText).weather[0].main
        );
      }
    };
  };

  return (
    <div className="Overall">
      <header className="App-header">Whenner</header>
      <aside>
   <a href="/" className="logout" onClick={null}>LOGOUT</a>
   
</aside>

      <h2 className="enterzipcode">Enter Zip Code</h2>
      <input
        className="ZipEnter"
        onChange={(event) => setTitle(event.target.value)}
      />
      <Button label="Want to check the weather?"  onclick={getWeather} />

      <main className="Customer">
        <form className="bio" onSubmit={updateEvent}>
          <div className="form-group">
            <label aria-label="bio" className="Text-Styles" >
            <h3>Event title</h3>
              <textarea
                onChange={(ev) => setSubject(ev.target.value)}
                className="form-control"
                rows={5}
              ></textarea><h3>Event location</h3>
              <textarea
                onChange={(ev) => setLocation(ev.target.value)}
                className="form-control"
                rows={5}
              ></textarea><h3>Event start time</h3>
              <textarea
                onChange={(ev) => setStarttime(ev.target.value)}
                className="form-control"
                rows={5}
              ></textarea>  <h3>Event end time</h3>
              <textarea
                onChange={(ev) => setEndtime(ev.target.value)}
                className="form-control"
                rows={5}
              ></textarea>      
                <input id="start-time" type="datetime-local" onChange={(e) => setStarttime(e.target.value) } id="meeting-time"
       name="meeting-time" value={starttime} />
                <input id="end-time" type="datetime-local" onChange={(e) => setEndtime(e.target.value) } id="meeting-time"
       name="meeting-time" value={endtime} />
                
               
            </label>
          </div>
          <button className="bioButton" type="submit">
            Submit Event
          </button>
          <Scheduler />
        </form>
      </main>
    </div>
  );
}

export default Calendar;