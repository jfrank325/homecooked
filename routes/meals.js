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

router.post('/meals/confirmation/:id', loginCheck, (req, res, next) => {
  console.log('TESSSST');
  const mealId = req.params.id;
  if (confirmation.length < guests) {
    Meal.findByIdAndUpdate({ _id: mealId }, { $addToSet: { confirmation: req.user._id } }, { new: true })
      .then(meal => {
        console.log(meal);
        res.redirect('/');
      })
      .catch(err => {
        next(err);
      });
  }
});

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
//Filtering Meals
router.get('/filtered/:mealtype', (req, res, next) => {
  let foodType = req.params.mealtype;

  console.log(foodType);
  Meal.find({ mealtype: foodType })
    .then(meals => {
      console.log(meals);
      res.json(meals);
    })
    .catch(err => console.log(err));
});

//Create a meal
router.post('/meals', loginCheck, uploadCloud.single('imgPath'), (req, res, next) => {
  const defaultMealImage = 'https://res.cloudinary.com/dv1aih6td/image/upload/v1581345429/Meals/thai_zsh0bk.jpg';
  const { name, description, foodpreference, mealtype, address, price, date, time, guests } = req.body;
  console.log(req);
  const imgPath = req.file ? req.file.url : defaultMealImage;
  console.log(imgPath);
  Meal.create({
    name,
    description,
    foodpreference,
    image: imgPath,
    mealtype,
    address,
    price,
    date,
    time,
    guests,
    host: req.user._id,
  })
    .then(() => {
      res.redirect('/meals');
    })
    .then(() => {
      res.redirect('/meals');
    })
    .catch(err => {
      next(err);
    });
});

router.get('/meals/coordinates', (req, res, next) => {
  Meal.find()
    .then(meals => {
      res.json(meals); // return as a JSON, the array of coordinates
    })

    .catch(err => {
      next(err);
    });
});
//Get specific meal
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

//Get meal to edit
router.get('/meals/edit/:id', (req, res, next) => {
  Meal.findById(req.params.id)
    .then(meal => {
      res.render('meals/edit', { meal });
    })
    .catch(err => {
      next(err);
    });
});

//Edit meal
router.post('/meals/edited/:id', uploadCloud.single('photo'), async (req, res, next) => {
  const { name, description, foodpreference, mealtype, address, price, date, time, guests } = req.body;
  console.log(req.body);
  const mealId = req.params.id;
  let meal = await Meal.findById(req.params.id);
  let mealImagePath = meal.image;
  let imagePath = req.file ? req.file.url : mealImagePath;
  Meal.findByIdAndUpdate(
    { _id: mealId },
    {
      $set: {
        name,
        description,
        foodpreference,
        image: imagePath,
        mealtype,
        address,
        price,
        date,
        time,
        guests,
        host: req.user._id,
      },
    },
    {
      new: true,
    }
  )
    .then(() => {
      res.redirect('/meals');
    })
    .catch(err => {
      next(err);
    });
});

//Gets the review
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

//Creates a review
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

//Deletes specific meal
router.get('/meals/:id/delete', (req, res, next) => {
  const query = {
    _id: req.params.id,
  };
  Meal.deleteOne(query)
    .then(() => {
      res.redirect('/meals');
    })
    .catch(err => {
      next(err);
    });
});

// patching meal location from frontend

router.patch('/meals/:id', (req, res, next) => {
  const changes = req.body; // in our axios call on the front-end, we'll make sure to pass the fields that need to be updated
  Meal.updateOne({ _id: req.params.id }, changes)
    .then(() => {
      // successful update, we can send a response
      res.json();
    })
    .catch(err => {
      next(err);
    });
});

// getting meal coordinates

router.get('/meals/:id/coordinates', (req, res, next) => {
  Meal.findById(req.params.id) // retrieve the room from the DB
    .then(mealDocument => {
      res.json(mealDocument.location.coordinates); // return as a JSON, the array of coordinates
    })
    .catch(err => {
      next(err);
    });
});

// creates new meal booking and updates confirmation

module.exports = router;
