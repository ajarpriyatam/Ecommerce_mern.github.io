const Product = require("../models/ProductModel");
const { param } = require("../routes/ProdectRoute");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProductDetails=catchAsyncErrors(async(req,res)=>{
    let productF = await Product.findById(req.params.id);
    if(!productF){
        return next(new ErrorHander("Product not Found..",400))
    }
    res.status(200).json({
        success:true,
        productF
    })
})
exports.getAllProducts=catchAsyncErrors(async(req,res, next)=>{
    const ProductAll = await Product.find()
    const productsCount = await Product.countDocuments();
    res.status(200).json({
        success:true,
        ProductAll,
        productsCount
    })
})

