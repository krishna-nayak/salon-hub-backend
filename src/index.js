const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// import { sequelize } from "./db/models";
const { sequelize, User, Salon } = require("./db/models");

const { where } = require("sequelize");
// const { User } = require("./db/models");

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

/* *********************************************************************************** */
// For Users
// GET ALL USER
app.get("/users", async (req, res) => {
  try {
    const user = await User.findAll();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { userId } });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Add new User (CREATE)
app.post("/users", async (req, res) => {
  const { fullName, email, role, password } = req.body;
  try {
    const user = await User.create({ fullName, email, role, password });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Update user Data
app.put("/users/:userId", async (req, res) => {
  const { fullName, email, role } = req.body;
  const { userId } = req.params;
  try {
    const userDetails = await User.findOne({ where: { userId } });
    // console.log(fullName ? fullName : userDetails.fullName);
    const user = await User.update(
      {
        fullName: fullName ? fullName : userDetails.fullName,
        email: email ? email : userDetails.email,
        role: role ? role : userDetails.role,
      },
      { where: { userId } }
    );
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Delete User details
app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.destroy({ where: { userId } });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/* *********************************************************************************** */
// For Salons
// GET ALL USER
app.get("/salon", async (req, res) => {
  try {
    const salon = await Salon.findAll();
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/salon/:salonid", async (req, res) => {
  const { salonid } = req.params;
  try {
    const salon = await Salon.findOne({ where: { salonid } });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Add new salon (CREATE)
app.post("/salon", async (req, res) => {
  const { name, address, city, openinghourstart, closeingHour } = req.body;
  try {
    const salon = await Salon.create({
      name,
      address,
      city,
      openinghourstart,
      closeingHour,
    });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Update salon Data
app.put("/salon/:salonid", async (req, res) => {
  const { name, address, city, openinghourstart, closeingHour } = req.body;
  const { salonid } = req.params;
  try {
    const salonDetails = await Salon.findOne({ where: { salonid } });
    const salon = await Salon.update(
      {
        name: name ? name : salonDetails.name,
        address: address ? address : salonDetails.address,
        city: city ? city : salonDetails.city,
        openinghourstart: openinghourstart
          ? openinghourstart
          : salonDetails.openinghourstart,
        closeingHour: closeingHour ? closeingHour : salonDetails.closeingHour,
      },
      { where: { salonid } }
    );
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Delete Salon details
app.delete("/salon/:salonid", async (req, res) => {
  const { salonid } = req.params;
  try {
    const salon = await Salon.destroy({ where: { salonid } });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
/* *********************************************************************************** */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on: http://localhost:${PORT}`);
});
