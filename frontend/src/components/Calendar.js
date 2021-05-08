import React, { useState, useEffect } from "react";
import {
  CurrentYear,
  CurrentMonth,
  days,
  CurrentDay,
} from "../helpers/scripts";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const getEvents = async (day) => {
    if (day) {
      let config = {
        method: "get",
        url: `http://localhost:5000/api/events/${day.target.innerHTML}`,
      };
      try {
        await axios(config).then((res) => {
          const allEvents = res.data.body;
          setEvents(allEvents);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  const getEventsRefresh = async (day) => {
    let config = {
      method: "get",
      url: `http://localhost:5000/api/events/${day}`,
    };
    try {
      await axios(config).then((res) => {
        const allEvents = res.data.body;
        setEvents(allEvents);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (id, date) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    const day = date.substr(8, 10);
    getEventsRefresh(day);
  };
  return (
    <div>
      <h1 className="title">Calendar Interactive</h1>
      <div className="calendar">
        <div className="calendar__info">
          <div className="calendar__prev">&#9664;</div>
          <div className="calendar__month">{CurrentMonth}</div>
          <div className="calendar__year">{CurrentYear.toString()}</div>
          <div className="calendar__next">&#9654;</div>
        </div>
        <div className="calendar__week">
          <div className="calendar__day calendar__item">Mon</div>
          <div className="calendar__day calendar__item">Tue</div>
          <div className="calendar__day calendar__item">Wed</div>
          <div className="calendar__day calendar__item">Thu</div>
          <div className="calendar__day calendar__item">Fri</div>
          <div className="calendar__day calendar__item">Sat</div>
          <div className="calendar__day calendar__item">Sun</div>
        </div>
        <div className="calendar__dates" id="dates">
          {days.map((day, key) =>
            day === CurrentDay ? (
              <div
                className="calendar__date calendar__item calendar__today"
                onClick={(day) => getEvents(day)}
                key={key}
              >
                {day}
              </div>
            ) : (
              <div
                className="calendar__date calendar__item"
                key={key}
                onClick={(day) => getEvents(day)}
              >
                {day}
              </div>
            )
          )}
        </div>
        <Link to="/create" className="btn btn-primary d-block">
          Create
        </Link>

        <div className="row">
          {events.length ? (
            events.map((event) => (
              <div className="col-md-4 p-2" key={event._id}>
                <div className="card-header d-flex justify-content-between">
                  <h5 style={{ color: event.color }}>{event.name}</h5>
                  <Link
                    className="btn btn-secondary ml-4"
                    to={`/edit/${event._id}`}
                  >
                    Edit
                  </Link>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-danger d-block w-100"
                    onClick={() => onDelete(event._id, event.date)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center mt-4">No events today!</h1>
          )}
        </div>
      </div>
    </div>
  );
}
