//import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
    productId: {type: String},
    screen: {
        screenTechnology: {type: String},
        resolution: {type: String},
        size: {type: String},
        touchScreen: {type: String}
    },
    mainCamera: {
        resolution: {type: String},
        video: {type: String},
        flash: {type: Boolean},
    },
    selfieCamera: {
        resolution: {type: String},
        video: {type: String},
    },
    platform: {
        os: {type: String},
        chipset: {type: String},
        cpu: {type: String},
        gpu: {type: String}
    },
    memory: {
        ram: {type: String},
        rom: {type: String},
        cardSlot: {type: String},
    },
    comms: {
        sim: {type: String},
        wifi: {type: String},
        gps: {type: String},
        bluetooth: {type: String},
        jack: {type: String}
    },
    body: {
        dimensions: {type: String},
        weight: {type: String},
        build: {type: String}
    },
    battery: {
        type: {type: String},
        capacity: {type: String},
    },
    review:  {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
})

ProductDetailSchema.statics = {
    createNewProductDetail(productDetail){
        return this.create(productDetail);
    },
    
    findProductDetail(productId){
        return this.findOne({productId}).exec();
    },

    updateProductDetailByProductId(productId, productDetail){
        return this.findOneAndUpdate({productId}, productDetail).exec();
    }
}

module.exports = mongoose.model("product-detail", ProductDetailSchema);
