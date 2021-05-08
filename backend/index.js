// Import Express Framework
const express = require("express");

// Import Config File Server
const configServer = require("./server/config");

// Connect DB
const connect = require("./db");
connect();

const app = configServer(express());

// Listen Server
app.listen(app.get("port"), () => {
  console.log(`Server Connected http://localhost:${app.get("port")}`);
});
