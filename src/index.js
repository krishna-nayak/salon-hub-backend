const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
var bodyParser = require("body-parser");
require("./db/models");
var userCtrl = require("./controllers/userController");
var salonCtrl = require("./controllers/salonController");
// import { sequelize } from "./db/models";
const { sequelize } = require("./db/models");

const { where } = require("sequelize");
// const { User } = require("./db/models");

const PORT = process.env.SERVER_PORT || 8080;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());

// For Users
app.get("/users", userCtrl.getUsers);
app.get("/users/:userId", userCtrl.getUser);
app.post("/users", userCtrl.postUsers);
app.put("/users/:userId", userCtrl.putUsers);
app.delete("/users/:userId", userCtrl.deleteUsers);

// For Salons
app.get("/salon", salonCtrl.getSalons);
app.get("/salon/:salonid", salonCtrl.getSalon);
app.post("/salon", salonCtrl.postSalons);
app.put("/salon/:salonid", salonCtrl.putSalons);
app.delete("/salon/:salonid", salonCtrl.deleteSalons);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on: http://localhost:${PORT}`);
});
