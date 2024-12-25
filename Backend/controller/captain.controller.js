const blackListTokenModel = require("../models/blackListToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
module.exports.registerCaptain = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAreadyExsist = await captainModel.findOne({ email });

  if (isCaptainAreadyExsist) {
    return res.status(400).json({ message: "captain already exsist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,

    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.genetrateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;  
  const captain = await captainModel
    .findOne({ email: email })
    .select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.genetrateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async function (req, res, next) {
  return res.status(200).json({ captain: req.captain });
};
module.exports.logoutCaptain = async function (req, res, next) {
  const token = req.cookies.token || req.header.authorization?.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully!!" });
};
