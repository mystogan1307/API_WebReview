// import express from "express";
// import fs from "fs";

// import { productController } from "../controllers/index.controller";

const express = require("express");
const fs = require("fs");
const { productController } = require("../controllers/index.controller");

const route = express.Router();

route.post('/', productController.createNewProduct);

route.post('/testUpload', productController.testUploadImage);

route.get('/testGetImage', (req, res, next) => {
    let readStream = fs.createReadStream('src/public/images/product/1.jpg', {
        highWaterMark: 10 * 1024
    });
    readStream.pipe(res);
    
    readStream.on('data', function(e){
        console.log(e.length)
    })
})

route.get('/', productController.getProducts)

route.get('/:id', productController.getProductById);

route.put('/:id', productController.updateProductById);

route.put('/delete/:id', productController.deleteProductById);

module.exports = route;
