const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const uploadCloud = require('../config/cloudinary.js');
const User = require('../models/User');
const Reviews = require('../models/Reviews');

//login middleware
const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

//Creating a meal page
router.get('/meals/create', loginCheck, (req, res) => {
  res.render('meals/meal-form', { loggedIn: req.user });
});

router.get('/meals', (req, res, next) => {
  Meal.find()
    .then(meals => {
      res.render('meals/list.hbs', { meals, user: req.user });
    })
    .catch(err => {
      next(err);
    });
});

//Create a meal
router.post('/meals', loginCheck, uploadCloud.single('imgPath'), (req, res, next) => {
  // const defaultMealImage = 'https://res.cloudinary.com/dv1aih6td/image/upload/v1581345429/Meals/thai_zsh0bk.jpg';
  const { name, description, dishtype, price, date, time, guests } = req.body;
  console.log(req);
  const imgPath = req.file.url;
  console.log(imgPath);
  const imgName = req.file.originalname;
  Meal.create({
    name,
    description,
    imgPath,
    imgName,
    dishtype,
    price,
    date,
    time,
    guests,
    host: req.user._id,
  })
    .then(() => {
      res.redirect('/meals');
    })
    .catch(err => {
      next(err);
    });
});

router.get('/meals/:id', (req, res, next) => {
  Meal.findById(req.params.id)
    .populate({
      path: 'host reviews',
      populate: {
        path: 'author',
      },
    })
    .then(meal => {
      let showDelete = false;
      if (req.user && meal.host._id.toString() === req.user._id.toString()) {
        showDelete = true;
      } else if (req.user && req.user.role === 'moderator') {
        showDelete = true;
      }

      res.render('meals/details.hbs', {
        meal,
        showDelete,
        user: req.user,
      });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/meals/:id/reviews', (req, res, next) => {
  console.log('Helo bachend');
  Meal.findById(req.params.id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .then(meal => {
      console.log('meal', meal);
      const reviews = meal.reviews.map(review => {
        return {
          content: review.content,
          author: review.author.username,
        };
      });
      res.json(reviews);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/meals/:id/reviews', loginCheck, (req, res, next) => {
  const content = req.body.content;
  const author = req.user._id;
  const mealId = req.params.id;

  Reviews.create({
    content,
    author,
  })
    .then(reviewDocument => {
      const reviewId = reviewDocument._id;
      return Meal.updateOne({ _id: mealId }, { $push: { reviews: reviewId } });
    })
    .then(() => {
      res.json({});
    })
    .catch(err => {
      next(err);
    });
});

router.get('/meals/:id/delete', (req, res, next) => {
  const query = {
    _id: req.params.id,
  };

  if (req.user.role !== 'moderator') {
    query.owner = req.user._id;
  }

  Meal.deleteOne(query)
    .then(() => {
      res.redirect('/meals');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
