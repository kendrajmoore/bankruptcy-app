const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
    res.render("signup.hbs");
});

router.post("/signup", (req, res) => {
    // Create User and JWT
    const user = new User(req.body);

    user.save().then(user => {
        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.SECRET,

            {
                expiresIn: "60 days"
            }
        );
        res.cookie("nToken", token, {
            maxAge: 900000,
            httpOnly: true
        });
        res.redirect("/");
    });
});

// LOGIN FORM
router.get("/login", (req, res) => {
    res.render("login.hbs");
});

// LOGIN
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, "username password")
        .then(user => {
            if (!user) {
                // User not found
                return res.status(401).send({ message: "Wrong Username" });
            }
            // Check the password
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    // Password does not match
                    return res.status(401).send({ message: "Wrong password" });
                }
                // Create a token
                const token = jwt.sign(
                    { _id: user._id, username: user.username },
                    process.env.SECRET,
                    { expiresIn: "60 days" }
                );
                // Set a cookie and redirect to root
                res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
                res.redirect("/");
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/logout", (req, res) => {
    res.clearCookie("nToken");
    res.redirect("/");
});

module.exports = router;
