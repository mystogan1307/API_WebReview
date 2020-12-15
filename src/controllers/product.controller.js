//import { productService } from "../services/index.service";
const { productService } = require("../services/index.service");

module.exports.createNewProduct = async (req, res, next) => {
    try {
        const product = {
            name: req.body.name,
            image: req.body.image,
            label: req.body.label,
            price: req.body.price,
        }

        const prodcutDetail = {
            screen: req.body.screen,
            mainCamera: req.body.mainCamera,
            selfieCamera: req.body.selfieCamera,
            platform: req.body.platform,
            memory: req.body.memory,
            comms: req.body.comms,
            body: req.body.body,
            battery: req.body.battery,
            review: req.body.review,
        }

        await productService.createNewProduct(product, prodcutDetail);
        console.log(prodcutDetail);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = await productService.getProductById(productId);
        
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({error});
    }
}

module.exports.testUploadImage = (req, res, next) => {
    try {
        return productService.testUploadImage(req, res);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        let params = req.query;
        let products = await productService.getProducts(params);
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.updateProductById = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let product = req.body;
        await productService.updateProductById(productId, product);
        return res.status(200).send({message: "Update success"});
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.deleteProductById = async (req, res, next) => {
    try {
        let productId = req.params.id;
        await productService.deleteProductById(productId);
        return res.status(200).send({message: "Delete success"});
    } catch (error) {
        return res.status(500).send(error)
    }
}
