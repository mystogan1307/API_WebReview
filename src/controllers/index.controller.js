

const authController = require("./auth.controller");
const productController = require("./product.controller");
const commentController = require("./comment.controller");
const userController = require("./user.controller");
const labelController = require("./label.controller");
const roleController = require("./role.controller");
const cart_controller = require("./cart.controller");
const bill_controller = require("./bill.controller");




module.exports = {
    authController,
    productController,
    commentController,
    userController,
    labelController,
    roleController,
    cart_controller,
    bill_controller

}
