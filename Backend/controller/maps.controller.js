const { validationResult } = require("express-validator");
const {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
} = require("../services/maps.service");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinates(address);
    res.status(200).json(coordinates);

    // res.status(200).json({message:"dummy Address coordinates"});
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found.", error: error });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
    // res.status(200).json({message:"dummy distance and time"});
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);

    //sending dummmy data
  //   res.status(200).json([
  //     {
  //         "description": "Mandleshwar, Madhya Pradesh, India",
  //         "matched_substrings": [
  //             {
  //                 "length": 11,
  //                 "offset": 0
  //             }
  //         ],
  //         "place_id": "ChIJlYRKb1-IYjkRE9bKdYEoXrk",
  //         "reference": "ChIJlYRKb1-IYjkRE9bKdYEoXrk",
  //         "structured_formatting": {
  //             "main_text": "Mandleshwar",
  //             "main_text_matched_substrings": [
  //                 {
  //                     "length": 11,
  //                     "offset": 0
  //                 }
  //             ],
  //             "secondary_text": "Madhya Pradesh, India"
  //         },
  //         "terms": [
  //             {
  //                 "offset": 0,
  //                 "value": "Mandleshwar"
  //             },
  //             {
  //                 "offset": 13,
  //                 "value": "Madhya Pradesh"
  //             },
  //             {
  //                 "offset": 29,
  //                 "value": "India"
  //             }
  //         ],
  //         "types": [
  //             "locality",
  //             "geocode",
  //             "political"
  //         ]
  //     },
  //     {
  //         "description": "Mandleshwar Dam, Maheshwar, Madhya Pradesh, India",
  //         "matched_substrings": [
  //             {
  //                 "length": 11,
  //                 "offset": 0
  //             }
  //         ],
  //         "place_id": "ChIJY4-gsjF9YjkR4LxS8wkcm9g",
  //         "reference": "ChIJY4-gsjF9YjkR4LxS8wkcm9g",
  //         "structured_formatting": {
  //             "main_text": "Mandleshwar Dam",
  //             "main_text_matched_substrings": [
  //                 {
  //                     "length": 11,
  //                     "offset": 0
  //                 }
  //             ],
  //             "secondary_text": "Maheshwar, Madhya Pradesh, India"
  //         },
  //         "terms": [
  //             {
  //                 "offset": 0,
  //                 "value": "Mandleshwar Dam"
  //             },
  //             {
  //                 "offset": 17,
  //                 "value": "Maheshwar"
  //             },
  //             {
  //                 "offset": 28,
  //                 "value": "Madhya Pradesh"
  //             },
  //             {
  //                 "offset": 44,
  //                 "value": "India"
  //             }
  //         ],
  //         "types": [
  //             "point_of_interest",
  //             "establishment"
  //         ]
  //     },
  //     {
  //         "description": "Mandleshwar Road, Gangaliya Khedi, Madhya Pradesh, India",
  //         "matched_substrings": [
  //             {
  //                 "length": 11,
  //                 "offset": 0
  //             }
  //         ],
  //         "place_id": "EjhNYW5kbGVzaHdhciBSb2FkLCBHYW5nYWxpeWEgS2hlZGksIE1hZGh5YSBQcmFkZXNoLCBJbmRpYSIuKiwKFAoSCYuJ0tzB92I5EYmaVoAW0CYREhQKEgmPA2uSovdiOREQWkAdxt58BA",
  //         "reference": "EjhNYW5kbGVzaHdhciBSb2FkLCBHYW5nYWxpeWEgS2hlZGksIE1hZGh5YSBQcmFkZXNoLCBJbmRpYSIuKiwKFAoSCYuJ0tzB92I5EYmaVoAW0CYREhQKEgmPA2uSovdiOREQWkAdxt58BA",
  //         "structured_formatting": {
  //             "main_text": "Mandleshwar Road",
  //             "main_text_matched_substrings": [
  //                 {
  //                     "length": 11,
  //                     "offset": 0
  //                 }
  //             ],
  //             "secondary_text": "Gangaliya Khedi, Madhya Pradesh, India"
  //         },
  //         "terms": [
  //             {
  //                 "offset": 0,
  //                 "value": "Mandleshwar Road"
  //             },
  //             {
  //                 "offset": 18,
  //                 "value": "Gangaliya Khedi"
  //             },
  //             {
  //                 "offset": 35,
  //                 "value": "Madhya Pradesh"
  //             },
  //             {
  //                 "offset": 51,
  //                 "value": "India"
  //             }
  //         ],
  //         "types": [
  //             "route",
  //             "geocode"
  //         ]
  //     },
  //     {
  //         "description": "Mandleshwar District Court, Thangoan, Mandleshwar, Madhya Pradesh, India",
  //         "matched_substrings": [
  //             {
  //                 "length": 11,
  //                 "offset": 0
  //             }
  //         ],
  //         "place_id": "ChIJ_wqN8S5jYjkRwZJVhsE9gKY",
  //         "reference": "ChIJ_wqN8S5jYjkRwZJVhsE9gKY",
  //         "structured_formatting": {
  //             "main_text": "Mandleshwar District Court",
  //             "main_text_matched_substrings": [
  //                 {
  //                     "length": 11,
  //                     "offset": 0
  //                 }
  //             ],
  //             "secondary_text": "Thangoan, Mandleshwar, Madhya Pradesh, India"
  //         },
  //         "terms": [
  //             {
  //                 "offset": 0,
  //                 "value": "Mandleshwar District Court"
  //             },
  //             {
  //                 "offset": 28,
  //                 "value": "Thangoan"
  //             },
  //             {
  //                 "offset": 38,
  //                 "value": "Mandleshwar"
  //             },
  //             {
  //                 "offset": 51,
  //                 "value": "Madhya Pradesh"
  //             },
  //             {
  //                 "offset": 67,
  //                 "value": "India"
  //             }
  //         ],
  //         "types": [
  //             "point_of_interest",
  //             "establishment",
  //             "courthouse"
  //         ]
  //     },
  //     {
  //         "description": "Mandleshwar Temple, Shiroda, Goa, India",
  //         "matched_substrings": [
  //             {
  //                 "length": 11,
  //                 "offset": 0
  //             }
  //         ],
  //         "place_id": "ChIJqdImO86xvzsRCF6jekNex8s",
  //         "reference": "ChIJqdImO86xvzsRCF6jekNex8s",
  //         "structured_formatting": {
  //             "main_text": "Mandleshwar Temple",
  //             "main_text_matched_substrings": [
  //                 {
  //                     "length": 11,
  //                     "offset": 0
  //                 }
  //             ],
  //             "secondary_text": "Shiroda, Goa, India"
  //         },
  //         "terms": [
  //             {
  //                 "offset": 0,
  //                 "value": "Mandleshwar Temple"
  //             },
  //             {
  //                 "offset": 20,
  //                 "value": "Shiroda"
  //             },
  //             {
  //                 "offset": 29,
  //                 "value": "Goa"
  //             },
  //             {
  //                 "offset": 34,
  //                 "value": "India"
  //             }
  //         ],
  //         "types": [
  //             "point_of_interest",
  //             "establishment",
  //             "hindu_temple",
  //             "place_of_worship"
  //         ]
  //     }
  // ]);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Unable to find place" });
  }
};
