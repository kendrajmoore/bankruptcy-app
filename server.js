const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// Port
const port = process.env.PORT || 3000;

//SET UP MONGOOSE
const mongoose = require("mongoose");

//middleware
app.use(methodOverride("_method"));
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// static files middleware
// // static files middleware
app.use("/public", express.static(path.join(__dirname, "public")));

// Mongoose Connection
const mongoUri =
  process.env.MONGODB_URI || "mongodb://mongo_bankrupty:27017/bankruptcy";
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true }
);

//user routes
const usersController = require("./controllers/users.js");
app.use(usersController);

const budgetController = require("./controllers/budgets.js");
app.use("/budget", budgetController);

const bankruptcyController = require("./controllers/bankruptcy.js");
app.use("/bankruptcy", bankruptcyController);

// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

//index page
app.get("/", (req, res) => {
  res.render("homepage.hbs", { currentUser: req.user });
});

//404 page
app.get("*", (req, res) => {
  res.render("error.hbs");
});

app.listen(port, () => {
  console.log("listening");
});

module.exports = app;
