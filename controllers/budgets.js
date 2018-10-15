const express = require('express');

const router = express.Router();

const Budget = require('../models/budgets.js');

// const User = require('../models.users.js');
// index;
router.get('/', (req, res) => {
  // const currentUser = req.user;
  // if (!currentUser) {
  //   res.redirect('/portlandia/user/login');
  // }
  Budget.find({})
        .then(budget => {
          res.status(200).json({ budget, message: 'Get the budget' });
        })
        .catch(err => {
          console.log(err.message);
        });
});
// new
router.get('/new', (req, res) => {
  // const currentUser = req.user;
  // if (currentUser === null) {
  //   res.redirect('/portlandia/user/login');
  // }
  res.status(200).render('budget/new.hbs');
});

//  create

router.post('/', (req, res) => {
  const character = new Character(req.body);
  character.save();
  res.status(200).json({
    character,
    message: 'You have submitted a new budget'
  });
});


// show
router.get('/:id', (req, res) => {
  // const currentUser = req.user;
  // if (currentUser === null) {
  //   res.redirect('/portlandia/user/login');
  // }
  Budget.findById(req.params.id).then(budget => {
    res.status(200)
            .json({
              budget,
              message: 'Here is the character that you selected'
            })
            .catch(err => {
              console.log(err.message);
            });
  });
});

//  Edit
router.get('/:id/edit', (req, res) => {
  Budget.findById(req.params.id, (err, budget) => {
    res.render('characters/edit.hbs', { budget });
  });
});

router.put('/:id', (req, res) => {
  // const currentUser = req.user;
  // if (currentUser === null) {
  //   res.redirect('/portlandia/user/login');
  // }
  Buget.findByIdAndUpdate(req.params.id, req.body, (err, budget) => {
    res.status(200).redirect('/');
  }).catch(err => {
      console.log(err.message);
    });
});
//  delete
router.delete('/:id', (req, res) => {
  // const currentUser = req.user;
  // if (currentUser === null) {
  //   res.redirect('/portlandia/user/login');
  // }
  Budget.findByIdAndRemove(req.params.id, (err, budget) => {
    res.status(200).json('Character deleted');
  }).catch(err => {
    console.log(err.message);
  });
});




module.exports = router;
