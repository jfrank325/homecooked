const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const { Schema } = mongoose;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mealtype: {
    type: String,
    enum: ['Breakfast', 'Brunch', 'Lunch', 'Dinner'],
    required: true,
  },
  foodpreference: {
    type: String,
    enum: ['Vegan', 'Vegetarian', 'Gluten-Free', 'I Eat Everything'],
    // required: true,
  },
  imgName: String,
  imgPath: String,
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
    },
    formattedAddress: String,
  },
  address: {
    type: String,
    required: [true, 'Please add an address!'],
  },
  going: [],
});

// Geocode and create location

mealSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
