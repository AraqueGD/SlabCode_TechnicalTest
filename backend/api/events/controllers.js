const { post, get, put, delEvent, Onevent } = require("./store");

const { CurrentYear, MonthNumber } = require("../../helpers/variables");

const getEvents = (day) => {
  const CurrentDate = new Date(CurrentYear, MonthNumber, day)
    .toISOString()
    .substr(0, 10);
  return new Promise((resolve) => {
    resolve(get(CurrentDate));
  });
};

const postEvent = (
  name,
  description,
  locate,
  color,
  date,
  startTime,
  endTime
) => {
  const eventDates = {
    name: name,
    description: description,
    locate: locate,
    color: color,
    date: date,
    startTime: startTime,
    endTime: endTime,
  };
  const fullevent = post(eventDates);
  return fullevent;
};

const putEvent = (
  id,
  name,
  description,
  locate,
  color,
  date,
  startTime,
  endTime
) => {
  const fullevent = {
    name: name,
    description: description,
    locate: locate,
    color: color,
    date: date,
    startTime: startTime,
    endTime: endTime,
  };
  const eventUpdate = put(id, fullevent);
  return eventUpdate;
};

const deleteEvent = (id) => {
  delEvent(id);
};

const getEvent = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("No existe ese ID");
      return false;
    }
    resolve(Onevent(id));
  });
};

module.exports = {
  getEvents,
  postEvent,
  putEvent,
  deleteEvent,
  getEvent,
};
