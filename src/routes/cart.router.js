"use strict";
// const cart_controller = require('../controllers/cart.controller');

const express = require("express");
const { cart_controller } = require("../controllers/index.controller");
const passport = require("passport");

const route = express.Router();

route.post("/addtocart", cart_controller.addToCart);
// route.get('/:userId', cart_controller.getByUserId);
route.get("/:userId", cart_controller.getByUserId);
route.post("/update", cart_controller.update);
route.post("/delete", cart_controller.delete);
route.get("/totalprice/:userId", cart_controller.getTotalPrice);

module.exports = route;
