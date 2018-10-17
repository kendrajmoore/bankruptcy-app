const express = require("express");

const router = express.Router();

const Bankruptcy = require("../models/bankruptcy.js");

const User = require("../models/users.js");

// bankruptcy new
router.get("/new", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        res.redirect("/user/login");
    } else {
        res.status(200).render("bankruptcy/new.hbs");
    }
});

router.post("/", (req, res) => {
    const bankruptcy = new Bankruptcy(req.body);
    bankruptcy.save();
    if (req.body.incomeBankruptcy < 40000) {
        res.render("bankruptcy/incomeadvice.hbs", {});
    } else if (
        req.body.mortageBankruptcy > 3000 ||
        req.body.rentBankruptcy > 3000
    ) {
        res.render("bankruptcy/housingadvice.hbs", {});
    } else if (
        req.body.legalBankruptcy > 5000 ||
        req.body.medicalBankruptcy > 5000
    ) {
        res.render("bankruptcy/medicaladvice.hbs", {});
    } else if (req.body.totalSavingBankruptcy < 5000) {
        res.render("bankruptcy/savingadvice.hbs", {});
    } else {
        res.render("bankruptcy/financialadvise.hbs");
    }
    // res.redirect("/budget");
});

module.exports = router;
