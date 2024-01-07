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
// const SalonService = require("./db/models/salonservice");
// const Service = require("./db/models/service");
// const service = require("./db/models/service");
var db = require("./db/models");
var Service = db.Service;
var SalonService = db.salonService;
var Salon = db.Salon;
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

// GET SALON SERVICE
app.get("/test", async (req, res) => {
  try {
    const services = await Service.findAll({});

    return res.json({ services: services });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

app.post("/salon/:SalonId/service/:ServiceId", async (req, res) => {
  const { SalonId, ServiceId } = req.params;
  const { price, description, duration } = req.body;

  try {
    // const salon = await Salon.findOne({ where: { salonId } });
    // const service = await Service.findOne({ where: { serviceId } });
    const salonService = await SalonService.create({
      price,
      description,
      duration,
      SalonId,
      ServiceId,
    });

    return res.status(201).json(salonService);
  } catch (err) {
    // console.log(err);
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

app.get("/salonService/:SalonId", async (req, res) => {
  const { SalonId } = req.params;
  try {
    const result = await Salon.findAll({ include: Service });
    return res.json(result);
  } catch (err) {
    return res.json({ msg: err.msg });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on: http://localhost:${PORT}`);
});
