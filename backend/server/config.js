// Import Dependences Settings
const express = require("express");
const cors = require("cors");
const errorhandler = require("errorhandler");
require("dotenv").config();

// Import Routes
const router = require("../routes/routes");

const config = (app) => {
  // Settings
  app.set("port", process.env.PORT || 3000);

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Routes
  router(app);

  // errorHandlers
  if (app.get("env") === "deveploment") {
    app.use(errorhandler);
  }

  return app;
};

module.exports = config;
