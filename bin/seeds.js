require('dotenv').config({ path: '../.env' });

const meals = [
  {
    name: 'Vegan Burger',
    description:
      'Burgers are on the roll in Berlin at the moment..one diner opening after the other! Let´s get crazy and create our own healthy vegan Burgers plus sweet potato fries and maybe a salad on the side! Can`t wait!!!',
    mealtype: 'Dinner',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/005/334/slider/IMG_0016.JPG?1424436734',
    price: '5 Euro',
    date: new Date(2020, 02, 18),
    time: '19:00',
    guests: 4,
    address: 'Sonntagstr. 5 10245 BERLIN',
    host: {
      username: 'Oz',
    },
  },
  {
    name: 'LOVELY, HEALTHY, VEGETARIAN FOOD WITH',
    description:
      'I enjoy people who are open, have things to share, like to hear stories, etc. My meals are usually not too heavy (although, I do enjoy a meal filled with various cheeses at times!). They often include MANY veggies... the are usually not wheat based (when I cook for myself), but often I like to make casseroles, lasagnes, pastas, etc. I cook a lot of Thai food using rice and rice noodles. I enjoy some vegan food as well, as long as it has flavor!',
    mealtype: 'Dinner',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/003/055/slider/2.jpg?1422857485',
    price: '6 Euro',
    date: new Date(2020, 02, 20),
    time: '20:00',
    guests: 3,
    address: 'Lobeckstr. 36 Berlin',
    host: {
      username: 'Jason',
    },
  },
  {
    name: 'Lovely Dinner at My Place',
    description:
      "I enjoy people who are open to try different foods. Everyweek i cook something different, join us to find out this week's special!",
    mealtype: 'Dinner',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/003/058/slider/1.jpg?1422857496',
    price: '5 Euro',
    date: new Date(2020, 02, 22),
    time: '20:00',
    guests: 5,
    address: 'Oranienstr. 25 Berlin',
    host: {
      username: 'Timbotimber',
    },
  },
  {
    name: 'Homemade Italian Pasta',
    description:
      'The nights meal will start with grissini and homemade olive paste! For the main pasta course you can choose as a group before arriving between two different sauces including aubergine ragù, carbonara, pasta alla norma, ravioli di zucca! You will finish the lunch with a zesty lemon granita!',
    mealtype: 'Lunch',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/009/717/slider/1474713170.jpg?1474713170',
    price: '5 Euro',
    date: new Date(2020, 02, 24),
    time: '14:00',
    guests: 6,
    address: 'Eberswalderstr. 36 Berlin',
    host: {
      username: 'Ricky',
    },
  },
  {
    name: 'RAW HAPPY ASIAN FUSION RAINBOW FOOD!',
    description:
      'I love all kitchens! But I make mostly organic raw food, like veggie noodles, raw chocolate cream, amazing salads, fruit platters and wraps. I still have a lot to learn in making raw food. I am very open-minded to any kind of diets. I am so excited to talk abut cultures, well-being, philosophies, animals, designs, crafts, sports, politics (I should know more) and listen to your jokes.',
    mealtype: 'Lunch',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/003/100/slider/Foto_3.JPG?1422858058',
    price: '5 Euro',
    date: new Date(2020, 02, 26),
    time: '14:00',
    guests: 6,
    address: 'Max-Beerstr. 42 Berlin',
    host: {
      username: 'Alfonso',
    },
  },
  {
    name: 'AWESOME & HEARTY INDIAN MEAL',
    description:
      "Experience coastal India's delicacies taking you through a surf and turf journey. Vegan options are also available for those who prefer it. The place is in the heart of Mitte close to everything so getting to the address is easy. There is also a balcony for guests to sit and have a drink or smoke whilst enjoying the food.",
    mealtype: 'Lunch',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/014/334/slider/1557177955.png?1557177955',
    price: '8 Euro',
    date: new Date(2020, 02, 27),
    time: '13:30',
    guests: 4,
    address: 'Mohrenstr. 15 Berlin',
    host: {
      username: 'Andre',
    },
  },
  {
    name: 'COLOMBIAN BRUNCH!',
    description:
      "I've been promising a Colombian brunch for a long time, and here it is! This is a brunch with all the most authentic ingredients possible. Come over and try something new- I hope this brunch will make you want to visit my beautiful country!",
    mealtype: 'Breakfast',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/006/113/slider/7.jpg?1431365558',
    price: '5 Euro',
    date: new Date(2020, 03, 01),
    time: '10:00',
    guests: 4,
    address: 'Auerstr. 10 Berlin',
    host: {
      username: 'Katy',
    },
  },
  {
    name: 'SPRING BRUNCH',
    description:
      "The weather is getting nicer, hey it's not 30 degrees anymore. It's time to come out and socialize with some spring time favorites.",
    mealtype: 'Breakfast',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/005/860/slider/brunch.jpg?1428373340',
    price: '5 Euro',
    date: new Date(2020, 03, 02),
    time: '11:00',
    guests: 3,
    address: 'Weserstr. 175 Berlin',
    host: {
      username: 'Markus',
    },
  },
  {
    name: 'HUEVOS RANCHEROS & MIMOSAS!',
    description:
      "Let's have brunch. These are some of my grandmas most famous recipes in my family, and it's impossible to only have one serving.",
    mealtype: 'Breakfast',
    image: 'https://s3.amazonaws.com/mealshare_prod/photos/photos/000/005/320/slider/huevos-rancheros.jpg?1424385756',
    price: '5 Euro',
    date: new Date(2020, 03, 03),
    time: '10:00',
    guests: 6,
    address: 'Waldermarstr. 55 Berlin',
    host: {
      username: 'Dalina',
    },
  },
];

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homecooked', () => {
  console.log('Connected to DB');
});

const Meal = require("../models/Meal");
const User = require("../models/User");

Meal.collection.drop();
User.collection.drop();

meals.forEach(meal => {
  User.create(meal.host)
    .then(userDoc => {
      meal.host = userDoc._id;
      console.log('Created an host: ', userDoc.username);
      return Meal.create({ ...meal, host: userDoc._id });
    })
    .then(mealDoc => {
      console.log('Created a meal: ', mealDoc.name);
    })
    .catch(err => {
      console.log(err);
    });
});
