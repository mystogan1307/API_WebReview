const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bill = new Schema({
  // userId: {
  //       type: String,
  //   },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date,
    default: Date.now,
  },
  products: {
    type: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        count: Number,
        _id: String,
      },
    ],
    required: true,
    minlength: 1,
  },
  address: String,
  phone: String,
  name: String,
  totalPrice: Number,
  email: String,
  // token: String,
  status: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("bill", bill);
