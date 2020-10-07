// import express from "express";

// import { labelController } from "../controllers/index.controller";

const express = require("express");
const { labelController } = require("../controllers/index.controller");

const route = express.Router();

route.get('/', labelController.getLabels);

route.post('/', labelController.createNewLabel);

route.put('/:id', labelController.updateLabelById);

route.put('/delete/:id', labelController.deleteLabelById);

module.exports = route;
