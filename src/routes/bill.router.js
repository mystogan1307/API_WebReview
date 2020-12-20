"use strict";
const express = require("express");
const { bill_controller } = require("../controllers/index.controller");
const passport = require("passport");

const route = express.Router();

route.post("/add", bill_controller.addBill);
route.get("/statistica", bill_controller.statisticaRevenueMonth);
route.get("/:userId", bill_controller.getBillByIDUser);
// route.get('/delete/:id', bill_controller.deleteBill);
route.get("/", bill_controller.getBill);
route.put("/update/:id", bill_controller.updateBill);
module.exports = route;
