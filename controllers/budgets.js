const express = require("express");

const router = express.Router();

const Budget = require("../models/budgets.js");

const User = require("../models/users.js");

const ObjectId = require("mongoose").Types.ObjectId;

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

// About us page
router.get("/about", (req, res) => {
  res.render("about", { currentUser: req.user });
});

// new
router.get("/new", (req, res) => {
  const currentUser = req.user;
  if (currentUser === null) {
    res.redirect("/user/login");
  } else {
    res.status(200).render("budget/new.hbs");
  }
});
// });

//create

router.post("/", (req, res) => {
  const budget = new Budget(req.body);
  budget.save();
  res.redirect("/budget/" + budget._id);
});

//create

// router.post("/", (req, res) => {
//     const currentUser = req.user;
//     if (currentUser === null) {
//         return res.redirect("/user/login");
//     }
//     const post = new Budget(req.body);
//     budget.author = req.user._id;
//     budget.save().then(budget => {
//             return User.findById(req.user._id);
//         })
//         .then(user => {
//             user.budgets.unshift(budget);
//             user.save();
//             // REDIRECT TO THE NEW budget
//             res.redirect("/budget/" + budget._id);
//         })
//         .catch(err => {
//             console.log(err.message);
//         });
// });

// show
router.get("/:id", (req, res) => {
  const currentUser = req.user;
  if (!currentUser) {
    res.redirect("/user/login");
  }
  Budget.findById(req.params.id).then(budget => {
    res
      .render("budget/show.hbs", {
        budget: budget,
        currentUser: currentUser
      })
      .catch(err => {
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

//char

router.get("/:id/api", (req, res) => {
  Budget.findById(req.params.id).then(budget => {
    if (budget) {
      console.log(budget);
      res.send(budget);
    }
  });
});

module.exports = router;
