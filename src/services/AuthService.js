const UserError = require("../ErrorHandler/UserError");
var db = require("../db/models");

var User = db.User;
var Salon = db.Salon;

class AuthService {
  static async login(email, password) {
    const user = await User.findOne({ where: { email }, include: [Salon] });
    if (!user) {
      const msg = "User not found";
      const extra = "Please check your email address: NO such email exist";
      throw new UserError(msg, 401, extra);
    }
    if (user.password !== password) {
      const msg = "Password is incorrect";
      const extra = "Please use the correct Password";
      throw new UserError(msg, 401, extra);
    }
    return [user, 200];
  }
}

module.exports = AuthService;
