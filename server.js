const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
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

// static files middleware
app.use(express.static("public"));

// Mongoose Connection
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/bankruptcy";
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
);

//USER AUTH
var checkAuth = (req, res, next) => {
    if (
        typeof req.cookies.nToken === "undefined" ||
        req.cookies.nToken === null
    ) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);

//user routes
const usersController = require("./controllers/users.js");
app.use("/user", usersController);

const budgetController = require("./controllers/budgets.js");
app.use("/budget", budgetController);

// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

//index page
app.get("/", (req, res) => {
    res.render("homepage.hbs");
});

//404 page
app.get("*", (req, res) => {
    res.render("error.hbs");
});

app.listen(port, () => {
    console.log("listening");
});

module.exports = app;
