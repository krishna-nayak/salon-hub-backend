const express = require("express");
require("dotenv").config();
const cors = require("cors");
var bodyParser = require("body-parser");
const multer = require("multer");

require("./db/models");
var userCtrl = require("./controllers/userController");
var salonCtrl = require("./controllers/salonController");
var serviceCtrl = require("./controllers/salonController");
const { sequelize } = require("./db/models");

const serverless = require("serverless-http");
const { where } = require("sequelize");
var db = require("./db/models");

const errorHandler = require("./middleware/ErrorHandler");

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const upload = multer();

// console.log(__dirname);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());

// Middleware
app.post("/login", userCtrl.loginUsers);

// For Users
app.get("/users", userCtrl.getUsers);
app.get("/users/:userId", userCtrl.getUser);
app.post("/users", userCtrl.postUsers);
app.put("/users/:userId", userCtrl.putUsers);
app.delete("/users/:userId", userCtrl.deleteUsers);

// For Salons
app.post("/salon", upload.any(), salonCtrl.postSalons);
app.get("/salon", salonCtrl.getSalons);
app.get("/salon/:salonId", salonCtrl.getSalon);
app.put("/salon/:salonId", salonCtrl.putSalons);
app.delete("/salon/:salonId", salonCtrl.deleteSalons);

// GET SALON SERVICE
app.get("/services", serviceCtrl.getServices);
// app.post("/salon/:salonId/service/:serviceId", serviceCtrl.postService);
app.post("/salon/:salonId/services", serviceCtrl.postBulkService);
app.get("/salonService/:salonId", serviceCtrl.getsalonService);

app.get("/appointment/:userId", userCtrl.getAppointment);

app.post("/appointment/:userId/salonService", userCtrl.postAppointment);
// ERROR MiddleWare
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on: http://localhost:${PORT}`);
});

module.exports.handler = serverless(app);
