

const express = require("express");
const passport = require("passport");
const { commentController } = require("../controllers/index.controller");

const route = express.Router();

route.post('/', passport.authenticate("jwt", {session: false}), commentController.createNewComment);

route.get('/product/:productId', commentController.getCommentByProductId);

module.exports = route;
