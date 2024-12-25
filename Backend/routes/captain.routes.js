const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controller/captain.controller");
const { authCaptain } = require("../middleware/auth.middleware");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 character long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long."),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 character long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 character long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Capicity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long."),
  ],
  captainController.loginCaptain
);

router.get("/profile", authCaptain, captainController.getCaptainProfile);
router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
