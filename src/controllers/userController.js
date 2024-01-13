const { Sequelize } = require("sequelize");
var db = require("../db/models");
var User = db.User;
var SalonService = db.SalonService;
var Salon = db.Salon;
var Service = db.Service;
var Appointment = db.Appointment;
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

//************************************************Appointment************************************************************ */
var getAppointment = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await User.findOne({
      where: { userId },
      include: [
        {
          model: SalonService,
          through: Appointment,
          include: [Service, Salon],
        },
      ],
    });
    //console.log(result);
    return res.json(result);
  } catch (err) {
    return res.json({ msg: err.msg });
  }
};

var postAppointment = async (req, res) => {
  const { userId, salonServiceId } = req.params;
  const { date, status, notes } = req.body;

  try {
    const user = await User.findOne({ where: { userId } });
    console.log(user);
    const salonService = await SalonService.findOne({
      where: { salonServiceId },
    });

    await user.addSalonService(salonService, {
      through: { date, status, notes },
    });

    const result = await User.findAll({ include: SalonService });

    return res.status(201).json(result);
  } catch (err) {
    // console.log(err);
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  postUsers,
  putUsers,
  deleteUsers,
  getAppointment,
  postAppointment,
};
