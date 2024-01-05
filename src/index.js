const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// import { sequelize } from "./db/models";
const { sequelize, User } = require("./db/models");
const { where } = require("sequelize");
// const { User } = require("./db/models");

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

/* *********************************************************************************** */

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

/* *********************************************************************************** */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Server running on: http://localhost:${PORT}`);
});
