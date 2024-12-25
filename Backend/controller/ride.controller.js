const { validationResult } = require("express-validator");
const {
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide,
} = require("../services/ride.service");
const {
  getCaptainsInTheRadius,
  getAddressCoordinates,
} = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination, vehicleType } = req.body;
    const { user } = req;

    const ride = await createRide({
      user,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);

    const pickupCoordinates = await getAddressCoordinates(pickup);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    // const captainsInRadius = await getCaptainsInTheRadius(
    //   22.7180544,
    //   75.8775808,
    //   2
    // );
    ride.otp = "";

    const rideDetails = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideDetails,
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
    // return res.status(200).json({
    //   auto: 1072,
    //   car: 1614,
    //   motorcycle: 841,
    // });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await confirmRide(rideId, req.captain._id);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await startRide({ rideId, otp, captain: req.captain });
    res.status(200).json(ride);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("!errors.isEmpty()");

    return res.status(500).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await endRide({ rideId: rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    console.log("!errors.isEmpty()");
    return res.status(200).json(ride);
  } catch (error) {
    console.log("Error in ", error);
    return res.status(500).json({ message: error.message });
  }
};
