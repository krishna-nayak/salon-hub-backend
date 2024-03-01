var db = require("../db/models");

var User = db.User;
var SalonService = db.SalonService;
var Salon = db.Salon;
var Service = db.Service;
var Appointment = db.Appointment;

const UserService = require("../services/UserService");
const UserError = require("../ErrorHandler/UserError");
const AuthService = require("../services/AuthService");
const { where } = require("sequelize");

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
var getUserAppointment = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await Appointment.findAll({
      where: { userId },
      include: [User, { model: SalonService, include: [Salon, Service] }],
    });

    const send_data = [];
    for (let i of results) {
      const obj = Object.assign(
        {},
        {
          username: i?.User.fullName,
          price: i.SalonService.price,
          status: i.status,
          time: i.time,
          duration: i.duration,
          notes: i.notes,
          date: i.date,
          service_name: i?.SalonService?.Service?.service_type,
          salon: {
            name: i?.SalonService?.Salon.name,
            city: i?.SalonService?.Salon.city,
            address: i?.SalonService?.Salon.address,
          },
        }
      );

      send_data.push(obj);
    }
    return res.json(send_data);
  } catch (err) {
    return res.json({ msg: err.msg });
  }
};

var getSalonAppointment = async (req, res) => {
  const { salonId } = req.params;

  try {
    const result = await Appointment.findAll({
      include: [{ model: User }, { model: SalonService, where: { salonId } }],
    });
    return res.json(result);
  } catch (err) {
    return res.json({ msg: err.msg });
  }
};

var postAppointment = async (req, res, next) => {
  const { userId } = req.params;
  const { date, status, time, duration, notes, salonServiceIdArr } = req.body;

  try {
    const user = await User.findOne({ where: { userId } });
    if (!user) throw new Error(`User not found`);

    salonServiceIdArr?.map(async (salonServiceId) => {
      const salonService = await SalonService.findOne({
        where: { salonServiceId },
      });

      if (!salonService) return;
      await Appointment.create({
        salonServiceId: salonServiceId,
        userId: userId,
        date: date,
        status: "pending",
        notes,
        time,
        duration,
      });
    });

    const result = await User.findOne({
      where: { userId },
      // include: [SalonService],
    });

    return res.status(201).json(result);
  } catch (err) {
    // console.log(err);
    console.log(err);
    next(err);
    // return res.status(500).json({ msg: err.message });
  }
};

// TODO: delete ApointmentService

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
  getUserAppointment,
  getSalonAppointment,
  postAppointment,
  loginUsers,
};
