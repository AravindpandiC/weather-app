const request = require("postman-request");

const mapapi = (location, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=e381ae6a01a7e1ab334c46b0cde62f7a&query=" +
    location +
    "&output=json&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network unavailable");
    } else if (!body.data || body.data.length == 0) {
      callback("Invalid location address");
    } else {
      const value = {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
      };
      callback(undefined, value);
    }
  });
};

module.exports = mapapi;
