// import userService from "./user.service";
// import productService from "./product.service";
// import commentService from "./comment.service";
// import labelService from "./label.service";
// import roleService from "./role.service";

const userService = require("./user.service");
const productService = require("./product.service");
const commentService = require("./comment.service");
const labelService = require("./label.service");
const roleService = require("./role.service");

module.exports = {
    userService,
    productService,
    commentService,
    labelService,
    roleService
}
