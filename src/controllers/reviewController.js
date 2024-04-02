var db = require("../db/models");
var User = db.User;
var Salon = db.Salon;
var Review = db.Review;

var writeReview = async function (req, res, next) {
  const { userId, salonId } = req.params;
  const { rating, comment } = req.body;

  try {
    const user = await User.findOne({ where: { userId } });
    if (!user) throw new Error(`User not found`);

    let review = await Review.findOne({ where: { userId, salonId } });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      review = await Review.create({ userId, salonId, rating, comment });
    }

    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

var getReview = async function (req, res, next) {
  try {
    const { userId, salonId } = req.params;

    if (userId === "null") res.status(200).json({});
    // Find the review for the given user ID and salon ID
    const review = await Review.findOne({ where: { userId, salonId } });

    // if (!review) throw new Error(`"Review not found"`);

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
var getAllSaloneReviews = async function (req, res, next) {
  try {
    const { salonId } = req.params;

    const reviews = await Review.findAll({
      where: { salonId },
      include: [{ model: User, attributes: ["fullName", "imageUrl"] }],
    });

    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

var getAllUserReviews = async function (req, res, next) {
  try {
    const { userId } = req.params;

    const reviews = await Review.findAll({ where: { userId } });

    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  writeReview,
  getAllUserReviews,
  getAllSaloneReviews,
  getReview,
};
