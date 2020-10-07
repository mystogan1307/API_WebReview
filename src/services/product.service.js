// import multer from "multer";

// import {app} from "../configs/app";
// import { transError } from "../lang/vi";
// import ProductModel from "../models/product.model";
// import ProductDetailModel from "../models/productDetail.model";
// import commentModel from "../models/comment.model";
// import UserModel from "../models/user.model";

const multer = require("multer");
const {app} = require("../configs/app");
const { transError } = require("../lang/vi");
const ProductModel = require("../models/product.model");
const ProductDetailModel = require("../models/productDetail.model");
const commentModel = require("../models/comment.model");
const UserModel = require("../models/user.model");

const LIMIT_PRODUCTS = 8;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "src/public/images/product");
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

function fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(transError.IMAGE_UPLOAD_FAILED, false);
    }
    return cb(null, true)
}

const upload = multer({storage, fileFilter}).single("image");

const createNewProduct = (product, productDetail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newProduct = await ProductModel.createNewProduct(product);
            productDetail.productId = newProduct._id;
            await ProductDetailModel.createNewProductDetail(productDetail);
            resolve(true);
        } catch (error) {
            return reject(error.message);
        }
    })
}

const getProductById = (productId) => {
    return new Promise(async (reslove, reject) => {
        try {
            
            let product = await ProductModel.findProductById(productId);
            let productDetail = await ProductDetailModel.findProductDetail(productId);
            let comments = await commentModel.findCommentByProductId(productId, {});
            // let users = null;
            // if (comments.length > 0){
            //     users = await Promise.all(comments.map(comment => {
            //         return UserModel.findUserComment(comment.userId);
            //     }))
                
            // }
            
            return reslove({
                product,
                productDetail,
                comments,
                // users
            })
        } catch (error) {
            reject(error.message)
        }
    })
}

const testUploadImage = (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.status(500).send({err});
        }
        
        return res.status(201).send(req.file);
    })
}

const getProducts = (params) => {
    return new Promise(async (reslove, reject) => {
        try {
            let productNumber = await ProductModel.countProducts(params);
            let products = await ProductModel.findProducts(params, LIMIT_PRODUCTS);
            // let comments = await Promise.all(products.map( product => {
            //     return  commentModel.findCommentByProductId(product._id);
            // }))
            let productByComment; 
            if (params.homepage){
                productByComment = await ProductModel.findProductsByCommentAmount(LIMIT_PRODUCTS);
            }
            return reslove({products, productNumber, productByComment});
        } catch (error) {
            reject(error.message)
        }
    })
}

const updateProductById = (id, updateProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.updateProductById(id, updateProduct);
            await ProductDetailModel.updateProductDetailByProductId(id, updateProduct);
            return resolve();
        } catch (error) {
            reject(error.message);
        }
    })
}

const deleteProductById = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.deleteProductById(productId);
            return resolve();
        } catch (error) {
            reject(error.message);
        }
    })
}

module.exports = {
    createNewProduct,
    getProductById,
    testUploadImage,
    getProducts,
    updateProductById,
    deleteProductById
}
