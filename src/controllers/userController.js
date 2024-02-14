var db = require("../db/models");

var User = db.User;
var SalonService = db.SalonService;
var Salon = db.Salon;
var Service = db.Service;
var Appointment = db.Appointment;

const UserService = require("../services/userService");
const UserError = require("../ErrorHandler/UserError");
const AuthService = require("../services/AuthService");

// GET
var getUsers = async (req, res, next) => {
  try {
    const [user, status] = await UserService.getAllUsers(req.query);
    return res.status(status).json(user);
  } catch (err) {
    next(err);
  }
};

var getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const [user, status] = await UserService.getUserById(userId);
    res.status(status).json(user);
  } catch (err) {
    next(err);
  }
};

// POST
var postUsers = async (req, res, next) => {
  try {
    const [user, status] = await UserService.createUser(req.body);
    return res.status(status).json(user);
  } catch (err) {
    next(err);
  }
};

// PUT
var putUsers = async (req, res, next) => {
  try {
    const updateRes = await UserService.updateUser(req.body, req.params);
    return res.status(200).json(updateRes);
  } catch (err) {
    next(err);
  }
};

// DELETE
var deleteUsers = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deleteRes = await UserService.deleteUser(userId);
    return res.status(202).json(deleteRes);
  } catch (err) {
    next(err);
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

var loginUsers = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [user, status] = await AuthService.login(email, password);
    return res.status(status).json(user);
  } catch (err) {
    next(err);
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
  loginUsers,
};
