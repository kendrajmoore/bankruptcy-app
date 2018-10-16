const express = require("express");

const router = express.Router();

const Budget = require("../models/budgets.js");

const User = require("../models/users.js");

//index;
router.get("/", (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
        return res.redirect("/user/login");
    }
    Budget.find({})
        .then(budget => {
            res.render("budget/index.hbs", { budget, currentUser });
        })
        .catch(err => {
            res.status(400).send(err.message);
            console.log(err.message);
        });
});

// new
router.get("/new", (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        res.redirect("/user/login");
    } else {
        res.status(200).render("budget/new.hbs");
    }
});
// });

//  create

router.post("/", (req, res) => {
    const budget = new Budget(req.body);
    budget.save();
    res.redirect("/budget");
});

// show
router.get("/:id", (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        res.redirect("/user/login");
    }
    Budget.findById(req.params.id).then(budget => {
        res.render("budget/show.hbs", {
            budget: budget,
            currentUser: currentUser
        }).catch(err => {
            res.status(400).send(err.message);
            console.log(err.message);
        });
    });
});

//  Edit
router.get("/:id/edit", (req, res) => {
    Budget.findById(req.params.id, (err, budget) => {
        res.render("budget/edit.hbs", { budget });
    });
});

router.put("/:id", (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        res.redirect("/user/login");
    }
    Buget.findByIdAndUpdate(req.params.id, req.body, (err, budget) => {
        res.status(200).redirect("/");
    }).catch(err => {
        res.status(400).send(error.message);
        console.log(err.message);
    });
});
//  delete
router.delete("/:id", (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        res.redirect("/user/login");
    }
    Budget.findByIdAndRemove(req.params.id, (err, budget) => {
        res.status(200).redirect("/budget");
    }).catch(err => {
        res.status(400).send(error.message);
        console.log(err.message);
    });
});

module.exports = router;
