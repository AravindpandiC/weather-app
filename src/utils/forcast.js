const request = require("postman-request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=44fc98d95d6b5f283a78cc3a0ae0ed2d&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network issue");
    } else if (body.error) {
      callback("Invalid location");
    } else {
      callback(
        undefined,
        "The weather condition is " +
          body.current.weather_descriptions +
          ". The current temperatue is " +
          body.current.temperature +
          " and feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forcast;
