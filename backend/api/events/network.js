const express = require("express");
const router = express.Router();

// Import Controllers
const controller = require("./controllers");

// Responses
const { success, errorResponse } = require("../../routes/response");

router.get("/:day", (req, res) => {
  const day = req.params.day;
  controller
    .getEvents(day)
    .then((events) => {
      success(req, res, events, 200);
      res.json(events);
    })
    .catch((err) => {
      errorResponse(req, res, "Error Interno", 500, err);
    });
});

router.post("/", async (req, res) => {
  const {
    name,
    description,
    locate,
    color,
    date,
    startTime,
    endTime,
  } = req.body;
  const fullevent = await controller.postEvent(
    name,
    description,
    locate,
    color,
    date,
    startTime,
    endTime
  );
  res.json({ save: fullevent });
});

router.put("/:id", (req, res) => {
  const {
    name,
    description,
    locate,
    color,
    date,
    startTime,
    endTime,
  } = req.body;
  controller.putEvent(
    req.params.id,
    name,
    description,
    locate,
    color,
    date,
    startTime,
    endTime
  );

  res.json({ update: "Success" });
});

router.delete("/:id", (req, res) => {
  controller.deleteEvent(req.params.id);
  res.json({ delete: `Event id ${req.params.id} has been removed` });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  controller
    .getEvent(id)
    .then((event) => {
      success(req, res, event, 200);
      res.json(event);
    })
    .catch((err) => {
      errorResponse(req, res, "Error Interno", 500, err);
    });
});

module.exports = router;
