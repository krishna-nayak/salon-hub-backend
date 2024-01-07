const { Sequelize } = require("sequelize");
var db = require("../db/models");
var User = db.User;

// GET
var getUsers = async (req, res) => {
  try {
    const user = await User.findAll({});
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
var getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { userId } });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// POST
var postUsers = async (req, res) => {
  const { fullName, email, role, password } = req.body;
  try {
    const user = await User.create({ fullName, email, role, password });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
// PUT
var putUsers = async (req, res) => {
  const { fullName, email, role } = req.body;
  const { userId } = req.params;
  try {
    const userDetails = await User.findOne({ where: { userId } });
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
};

// DELETE
var deleteUsers = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.destroy({ where: { userId } });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
module.exports = {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUsers,
};
