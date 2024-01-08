const express = require("express");
require("dotenv").config();
const cors = require("cors");
var bodyParser = require("body-parser");
require("./db/models");
var userCtrl = require("./controllers/userController");
var salonCtrl = require("./controllers/salonController");

const { sequelize } = require("./db/models");

const { where } = require("sequelize");
var db = require("./db/models");
var Service = db.Service;
var Salon = db.Salon;

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
    const services = await Service.findAll({ include: Salon });

    return res.json(services);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

app.post("/salon/:salonId/service/:serviceId", async (req, res) => {
  const { salonId, serviceId } = req.params;
  const { price, description, duration } = req.body;

  try {
    const salon = await Salon.findOne({ where: { salonId } });
    const service = await Service.findOne({ where: { serviceId } });

    await salon.addService(service, {
      through: { price, description, duration },
    });

    const result = await Salon.findAll({ include: Service });

    return res.status(201).json(result);
  } catch (err) {
    // console.log(err);
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

app.get("/salonService/:salonId", async (req, res) => {
  const { salonId } = req.params;
  try {
    const result = await Salon.findOne({
      where: { salonId },
      include: Service,
    });
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
