var db = require("../db/models");

var User = db.User;
var SalonService = db.SalonService;
var Salon = db.Salon;
var Service = db.Service;
var Appointment = db.Appointment;
const { v4: uuidv4 } = require("uuid");
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
      order: [["date", "DESC"]],
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
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONFIRM_EMAIL,
    pass: process.env.CONFIRM_PASSWORD, //add  your CONFIRM_EMAIL and CONFIRM_PASSWORD (not password but [app passkey] of EMAIL that u will get after enableing 2 way verification for your EMAIL  ) in env file
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP server connection error:", error);
  } else {
    console.log("SMTP server connection successful");
  }
});

var postAppointment = async (req, res, next) => {
  const { userId } = req.params;
  const { date, status, time, duration, notes, salonServiceIdArr } = req.body;

  try {
    const user = await User.findOne({ where: { userId } });
    if (!user) throw new Error(`User not found`);

    await Promise.all(
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
      })
    );
    //******************************************************All changes are need to be done here only***************************************************** */
    const uid = uuidv4();
    const formattedDate = date.split("-").reverse().join(""); // Format date as YYYYMMDD
    const formattedTime = time.replace(":", "") + "00"; // Format time as HHmmss
    const icalEventContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ACME/DesktopCalendar//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uuidv4()} // Unique identifier for the event
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "")}Z
DTSTART:${formattedDate}T${formattedTime}
DURATION:PT${duration}H
SUMMARY:Appointment
DESCRIPTION:${notes}
END:VEVENT
END:VCALENDAR`;
    //*********************************************************************************************************************************** */
    const mailOptions = {
      from: '"SALON_HUB_BOOKIFY" <process.env.CONFIRM_EMAIL>',
      to: user.email,
      subject: "Appointment Confirmation ✅",
      text: `Your appointment has been confirmed. Date: ${date}, Time: ${time}, Duration: ${duration}`,
      icalEvent: {
        filename: "invitation.ics",
        method: "request",
        content: icalEventContent,
      },
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
      } else {
        //console.log(user.email);
        console.log("Email sent:", info.response);
      }
    });

    const result = await User.findOne({
      where: { userId },
    });

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    next(err);
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
