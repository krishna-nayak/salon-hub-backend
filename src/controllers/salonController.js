// const { Sequelize, where } = require("sequelize");
var db = require("../db/models");
var Salon = db.Salon;
var Service = db.Service;
var User = db.User;

const stream = require("stream");
const { google } = require("googleapis");
const path = require("path");
const { where } = require("sequelize");

const KEYFILEPATH = path.join(__dirname, "../config/credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

//GET
var getSalons = async (req, res) => {
  try {
    const salon = await Salon.findAll({ include: [Service, User] });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
var getSalon = async (req, res) => {
  const { salonId } = req.params;
  try {
    const salon = await Salon.findOne({
      where: { salonId },
      include: [Service, User],
    });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//POST

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);

  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["17AIVPtxJUvA39djOhSXcHOo0sPuLExxH"],
    },
    fields: "id,name",
  });
  console.log("Uploaded file: " + JSON.stringify(data));
  return data;
};

var postSalons = async (req, res, next) => {
  const { name, address, city, openingHourStart, closeingHour, email } =
    req.body;

  const { files } = req;
  try {
    const userDeatil = await User.findOne({
      where: { email },
      include: [Salon],
    });

    if (!userDeatil) throw new Error("Email Not found");

    if (userDeatil.Salon)
      return res.status(500).json({ msg: "One User have only one store" });

    for (let f = 0; f < files.length; f++) {
      var upload_data = await uploadFile(files[f]);
    }

    const salon = await Salon.create({
      imageId: upload_data.id,
      ...{
        name,
        address,
        city,
        openingHourStart,
        closeingHour,
      },
    });

    // console.log(salon);
    await salon.setUser(userDeatil);

    return res.json(salon);
  } catch (err) {
    // console.log(err);
    next(err);
    // return res.status(500).json({ err: err.message });
  }
};

//PUT
var putSalons = async (req, res) => {
  const { name, address, city, openinghourstart, closeingHour } = req.body;
  const { salonId } = req.params;
  try {
    const salonDetails = await Salon.findOne({ where: { salonId } });
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
      { where: { salonId } }
    );
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//DELETE
var deleteSalons = async (req, res) => {
  const { salonId } = req.params;
  try {
    const salon = await Salon.destroy({ where: { salonId } });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//*************************************************************SalonService*************************************** */

var getServices = async (req, res) => {
  try {
    const { salon } = req.query;
    const arr = [];
    if (salon === "true") arr.push(Salon);
    const services = await Service.findAll({ include: arr });

    return res.json(services);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
var postService = async (req, res) => {
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
};

var postBulkService = async (req, res, next) => {
  const { salonId } = req.params;
  const { services } = req.body;
  // console.log(services);
  try {
    const salon = await Salon.findOne({ where: { salonId } });

    services.map(async (service) => {
      if (service?.serviceId === "" || service?.serviceId === null)
        throw new UserError("serviceId can't be null or empty");
      const serviceData = await Service.findOne({
        where: { serviceId: service.serviceId },
      });
      await salon.addService(serviceData, {
        through: {
          price: service.price,
          description: service?.description || "",
          duration: service?.duration || "30 min",
        },
      });
    });

    const result = await Salon.findOne({
      where: { salonId },
      include: Service,
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

var getsalonService = async (req, res) => {
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
};

module.exports = {
  getSalons,
  getSalon,
  postSalons,
  putSalons,
  deleteSalons,
  getServices,
  postService,
  postBulkService,
  getsalonService,
};
