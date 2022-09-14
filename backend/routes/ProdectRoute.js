const express = require("express");
const { route } = require("../app");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
} = require("../controller/ProductCont");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
module.exports = router;