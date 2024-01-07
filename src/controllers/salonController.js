const { Sequelize } = require("sequelize");
var db = require("../db/models");
var Salon = db.Salon;

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
  const { salonid } = req.params;
  try {
    const salon = await Salon.findOne({ where: { salonid } });
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
};

//DELETE
var deleteSalons = async (req, res) => {
  const { salonid } = req.params;
  try {
    const salon = await Salon.destroy({ where: { salonid } });
    return res.json(salon);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
module.exports = {
  getSalons,
  getSalon,
  postSalons,
  putSalons,
  deleteSalons,
};
