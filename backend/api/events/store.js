const EventSchema = require("./model");

const getEvents = async (newDate) => {
  const events = await EventSchema.find({
    date: { $eq: newDate },
  });
  return events;
};

const postEvent = async (event) => {
  const fullevent = new EventSchema(event);
  await fullevent.save();
  return fullevent;
};

const putEvent = async (id, fullevent) => {
  const eventUpdate = await EventSchema.findOneAndUpdate(
    { _id: id },
    fullevent
  );
  return eventUpdate;
};

const deleteEvent = async (id) => {
  await EventSchema.findByIdAndDelete(id);
};

const Onevent = async (id) => {
  const event = await EventSchema.findById(id);
  return event;
};

module.exports = {
  post: postEvent,
  get: getEvents,
  put: putEvent,
  delEvent: deleteEvent,
  Onevent,
};
