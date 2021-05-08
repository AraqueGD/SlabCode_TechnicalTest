// Import Module Mongoose DB Connection
const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  await mongoose
    .connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.error("Error al Conectar con la Base de Datos", err);
    });
};
module.exports = connect;
