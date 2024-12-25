const express = require("express");
const { body, query } = require("express-validator");
const {
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide,
} = require("../controller/ride.controller");
const router = express.Router();
const { authUser, authCaptain } = require("../middleware/auth.middleware");
router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pick up address"),

  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid  destination address"),

  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid  Vehicle Type"),
  createRide
);
router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pick up address"),

  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid  destination address"),
  getFare
);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ide id"),
  confirmRide
);

router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride id "),
  endRide
);
module.exports = router;
