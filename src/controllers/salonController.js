// const { Sequelize, where } = require("sequelize");
var db = require("../db/models");
var Salon = db.Salon;
var Service = db.Service;
var User = db.User;
var SalonServiceModel = db.SalonService;
var Imagestore = db.Imagestore;
const { where } = require("sequelize");
const SalonService = require("../services/SalonService");

//this code is add file nae to Image
/*const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
*/

//GET
var getSalons = async (req, res, next) => {
  try {
    const salon = await SalonService.getAllSalons(req.query);
    return res.status(200).json({ result: salon });
  } catch (err) {
    next(err);
  }
};

var getSalon = async (req, res, next) => {
  const { salonId } = req.params;
  try {
    const salon = await SalonService.getSalonById(salonId);
    return res.status(200).json(salon);
  } catch (err) {
    next(err);
  }
};

//POST
var postSalons = async (req, res, next) => {
  const { files } = req;
  try {
    const salon = await SalonService.createSalon(req.body, files);
    return res.status(200).json(salon);
  } catch (err) {
    next(err);
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
    const salon = await SalonService.deleteSalon(salonId);
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
    next(err);
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

var deleteSalonService = async (req, res, next) => {
  const { serviceId, salonId } = req.params;
  try {
    const arr = await SalonServiceModel.destroy({
      where: {
        serviceId: serviceId,
        salonId: salonId,
      },
    });
    console.log(arr);
    res.status(200).send("delete service " + serviceId + " " + salonId);
  } catch (err) {
    // console.log(err);
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
//const uploaded = multer({ storage: storage });

var uploadImage = async (req, res, next) => {
  try {
    const { salonId } = req.params;
    const { files } = req;
    console.log(files);
    const images = await SalonService.uploadFile(files, salonId);

    return res.status(201).json({ name: "images", images });
  } catch (err) {
    next(err);
  }
};

var getImage = async (req, res, next) => {
  try {
    const { salonId } = req.params;
    const images = await Imagestore.findAll({ where: { salonId } });
    return res.status(201).json({ name: "images", images });
  } catch (err) {
    next(err);
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
  uploadImage,
  getImage,
  deleteSalonService,
  //uploaded: uploaded,
};
