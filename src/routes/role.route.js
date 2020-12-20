

const express = require("express");
const { roleController } = require("../controllers/index.controller");

const route = express.Router();

route.get('/', roleController.getRoles)

route.get('/:id', roleController.getRoleById);

route.post('/', roleController.createNewRole);

module.exports = route;
