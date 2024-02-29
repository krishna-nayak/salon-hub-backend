var db = require("../db/models");
var Salon = db.Salon;
var Service = db.Service;
var User = db.User;

const stream = require("stream");
const { google } = require("googleapis");
const path = require("path");
const UserError = require("../ErrorHandler/UserError");

const KEYFILEPATH = path.join(__dirname, "../config/credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

class SalonService {
  static async getAllSalons({ city, name, locality }) {
    const obj = {};
    if (city) obj.city = city;
    if (name) obj.name = name;
    if (locality) obj.locality = locality;

    const salon = await Salon.findAll({
      where: obj,
      include: [Service, User],
    });
    return salon;
  }

  static async getSalonById(salonId) {
    const salon = await Salon.findOne({
      where: { salonId },
      include: [Service, User],
    });

    if (!salon) {
      const message = "Salon not found";
      const extraDetails = "No such salon exists with id: " + salonId;
      throw new UserError(message, 404, extraDetails);
    }

    return salon;
  }

  static async uploadFile(fileObject) {
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
  }

  static async createSalon(body, files) {
    const { name, address, city, openingHourStart, closeingHour, email } = body;

    const userDeatil = await User.findOne({
      where: { email },
      include: [Salon],
    });

    if (!userDeatil)
      throw new UserError(
        "Email Not found",
        400,
        "Please enter a valid email address"
      );

    if (userDeatil.Salon)
      throw new UserError(
        "Salon is already exists",
        409,
        "No dublicte salon can formed"
      );

    // for (let f = 0; f < files?.length; f++) {
    //   var upload_data = await SalonService.uploadFile(files[f]);
    // }

    await User.update(
      { ...userDeatil, role: "SHOPKEEPER" },
      { where: { email } }
    );

    const salon = await Salon.create({
      // imageId: upload_data.id,
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

    return salon;
  }

  static async updateSalon(body, salonId) {
    const { name, address, city, openinghourstart, closeingHour } = body;
    const salonDetails = await SalonService.getSalonById(salonId);
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
    return salon;
  }

  static async deleteSalon(salonId) {
    await SalonService.getSalonById(salonId);
    await Salon.destroy({ where: { salonId } });
    return {
      message: "Salon id " + salonId + " data DELETED",
      id: salonId,
    };
  }
}

module.exports = SalonService;
