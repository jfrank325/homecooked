const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dishtype: {
    type: String,
    required: true
  },
  imgName: String,
  imgPath: String,
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  price: {
    type: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  coordinates: [Number]
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
