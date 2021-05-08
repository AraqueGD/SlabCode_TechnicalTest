// Import Module Mongoose DB Connection
const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  const uri =
    process.env.URI ||
    "mongodb+srv://araxx:root@slabcodetechnicaltest.36tl8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  await mongoose
    .connect(uri, {
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
