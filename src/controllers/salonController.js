const { Sequelize } = require("sequelize");
var db = require("../db/models");
var Salon = db.Salon;
var Service = db.Service;

//GET
var getSalons = async (req, res) => {
  try {
    const salon = await Salon.findAll({});
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
var getSalon = async (req, res) => {
  const { salonId } = req.params;
  try {
    const salon = await Salon.findOne({ where: { salonId }, include: Service });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//POST
var postSalons = async (req, res) => {
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
//**************************************************************************************************** */

var getServices = async (req, res) => {
  try {
    const services = await Service.findAll({ include: Salon });

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
  getsalonService,
};
