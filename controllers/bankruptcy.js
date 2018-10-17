const express = require("express");

const router = express.Router();

const Bankruptcy = require("../models/bankruptcy.js");

const User = require("../models/users.js");

// bankruptcy new
router.get("/bankruptcy/new", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        res.redirect("/user/login");
    } else {
        res.status(200).render("bankruptcy/new.hbs");
    }
});

module.exports = router;
