const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");


// Port
const port = process.env.PORT || 3000;

//SET UP MONGOOSE
const mongoose = require("mongoose");

//middleware
app.use(methodOverride("_method"));
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files middleware
app.use(express.static("public"));

// Mongoose Connection
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/bankruptcy";
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
);

// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

//index page
app.get("/", (req, res) => {
    res.render("posts/welcome.hbs");
});

//404 page
app.get("*", (req, res) => {
    res.render("error/index.hbs");
});

app.listen(port, () => {
    console.log("listening");
});

module.exports = app;
