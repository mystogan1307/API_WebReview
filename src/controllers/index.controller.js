// import authController from "./auth.controller";
// import productController from "./product.controller";
// import commentController from "./comment.controller";
// import userController from "./user.controller";
// import labelController from "./label.controller";
// import roleController from "./role.controller";

const authController = require("./auth.controller");
const productController = require("./product.controller");
const commentController = require("./comment.controller");
const userController = require("./user.controller");
const labelController = require("./label.controller");
const roleController = require("./role.controller");


module.exports = {
    authController,
    productController,
    commentController,
    userController,
    labelController,
    roleController
}
