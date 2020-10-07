//import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String},
    image: {type: String},
    label: {type: String},
    price: {type: Number},
    score: {type: Number},
    commentAmount: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
})

ProductSchema.statics = {
    createNewProduct(product){
        return this.create(product);
    },

    findProductById(id){
        return this.findById(id).exec();
    },

    findProducts(params, limit){
        if (params.label){
            return this.find({
                $and: [
                    {isDelete: false},
                    {name: {$regex: new RegExp(params.name, "i")}},
                    {label: params.label}
                ]
            }).sort({createdAt: params.sort ? params.sort : -1}).skip(+params.skip).limit(limit);
        }
        return this.find({
            $and: [
                {isDelete: false},
                {name: {$regex: new RegExp(params.name, "i")}},
            ]
        }).sort({createdAt: params.sort ? params.sort : -1}).skip(+params.skip).limit(limit);
    },

    updateProductById(id, product){
        return this.findByIdAndUpdate(id, product).exec();
    },

    deleteProductById(id){
        return this.findByIdAndUpdate(id, {isDelete: true}).exec();
    },

    countProducts(params){
        if (params.label) {
            return this.count({
                $and: [
                    {isDelete: false},
                    {name: {$regex: new RegExp(params.name, "i")}},
                    {label: params.label}
                ]
            }).exec();
        }
        return this.count({
            $and: [
                {isDelete: false},
                {name: {$regex: new RegExp(params.name, "i")}},
            ]
        }).exec();
    },

    increaseComment(productId, commentAmount){
        console.log(commentAmount)
        return this.findByIdAndUpdate(productId, {
            commentAmount
        })
    },

    findProductsByCommentAmount(limit){
        return this.find({
            isDelete: false,
        }).sort({commentAmount: -1, createdAt: -1}).limit(limit).exec()
    }
}

// ProductSchema.methods = {
//     increaseComment(productId){
//         let currentComment = this.commentAmount + 1;
//         console.log(currentComment)
//         return ProductSchema.statics.increaseComment(productId, currentComment)
//     }
// }

module.exports = mongoose.model("product", ProductSchema);
