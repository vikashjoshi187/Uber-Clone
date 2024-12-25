const axios = require("axios");
const captainModel =require("../models/captain.model")
module.exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);

    if (response.data.status == "OK") {
      const location = response.data.results[0].geometry.location;

      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure the environment variable is correctly named
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status == "OK") {
      if (data.rows[0]?.elements[0].status == "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0]?.elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw new Error("Failed to fetch distance and time. Please try again.");
  }
};
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw Error("Query is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status == "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find();
  // const captains = await captainModel.find({
  //   location: {
  //     $geoWithin: {
  //       $centerSphere: [[ltd,lng], radius / 6371],
  //     },
  //   },
  // });
 
  
  return captains;
};
