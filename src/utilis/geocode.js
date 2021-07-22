const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicmlyb3JvIiwiYSI6ImNrcjJhbWtldDBpZ2UybnJ4aHN6Nm9hMXIifQ.6AOoxJv9Fh7aYEI-bB4S5A&limit=1";

  request({ url, json: true }, (error, { body }) => {
    // shorthand property because url is identical to url
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.message) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
