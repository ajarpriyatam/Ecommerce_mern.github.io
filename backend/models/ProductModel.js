const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter product Name"],
    },
    category: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    description: {
      type: String,
      required: [true, "Please Enter product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    url:{
      type: String,
      required: [true, "Please Enter product Name"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product