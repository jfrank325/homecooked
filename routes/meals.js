const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const User = require('../models/User');
const Reviews = require('../models/Reviews');

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

// router.get('/create', loginCheck, (req, res) => {
//   res.render('meals/meal-form', { loggedIn: req.user });
// });

router.get('/meals', (req, res, next) => {
  Meal.find()
    .then(meals => {
      res.render('meals/list.hbs', { meals, user: req.user });
    })
    .catch(err => {
      next(err);
    });
});

// router.post('/meals', loginCheck, (req, res, next) => {
//   const { name, description, mealtype, price, date, time } = req.body;
//   Meal.create({
//     name,
//     description,
//     mealtype,
//     price,
//     date,
//     time,
//     host: req.user._id,
//   })
//     .then(() => {
//       res.redirect('/meals');
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
