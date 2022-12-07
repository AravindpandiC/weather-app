const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const request = require("postman-request");
const mapapi = require("./utils/mapapi");
const forcast = require("./utils/forcast");

// Defining paths
const indexPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup path and handelbars
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);
app.use(express.static(indexPath));

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather",
    footermsg: "Created by Aravind",
    name: "Aravind",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Aravind",
    footermsg: "Thanks for visiting",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "What you need",
    footermsg: "Awaiting for your response",
  });
});

//Weather app
app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.send("Error please provide the address");
  }

  const address = request.query.address;
  mapapi(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return response.send({
        error,
      });
    }

    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return response.send({
          error,
        });
      }

      response.send([
        {
          location,
          forcast: forcastData,
          address,
        },
      ]);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    footermsg: "Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    footermsg: "Help page not found",
  });
});

app.listen(8080, () => {
  console.log("Server started with port 8080");
});
