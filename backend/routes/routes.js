// Import Networking API
const events = require("../api/events/network");

const router = (server) => {
  server.use("/api/events", events);
};

module.exports = router;
