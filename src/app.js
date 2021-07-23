const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

// console.log(__dirname) //short for directory name
// console.log(path.join(__dirname, '../public')) // breaking down path

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/* res.send() from about.html file
app.get('', (req, res) => {                  // req means request and res means respone
    res.send("<h1>Weather</h1>")
})

//from about.html file
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

// from help.html file
app.get('/help', (req, res) => {
    res.send({
        name: "SP",
        age: 27
    })
})
*/

// res.render() from .hbs file
app.get("", (req, res) => {
  res.render("index", {
    // route to index.hbs
    title: "Weather App",
    name: "Singh Pooja",
  });
});

// res.render() from about.hbs file
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About us",
    name: "Singh Pooja",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Singh Pooja",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Singh Pooja",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Address must be provided!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }

  //    else {
  //     console.log(req.query.address)
  //     res.send({
  //         forecast: 'It is raining',
  //         address: req.query.address
  //     })
  // }
});

app.get("/products", (req, res) => {
  // HTTP can send only response
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  // else
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  // always written last
  res.render("404", {
    title: "404",
    name: "Singh Pooja",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
