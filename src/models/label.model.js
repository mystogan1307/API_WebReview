//import mongoose, { model } from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
});

LabelSchema.statics = {
    getLabels(params){
        return this.find({
            $and: [
                {isDelete: false},
                {name: {$regex: new RegExp(params.name, "i")}}
            ]
        }).sort({createdAt: params.sort ? params.sort : -1}).skip(+params.skip).limit(+params.limit);
    },

    createNewLabel(label){
        return this.create(label)
    },

    updateLabelById(id, name){
        return this.findByIdAndUpdate(id, {name}).exec();
    },
    
    deleteLabelById(id){
        return this.findByIdAndUpdate(id, {
            isDelete: true
        }).exec();
    },

    countLabel(params){
        return this.count({
            $and: [
                {isDelete: false},
                {name: {$regex: new RegExp(params.name, "i")}}
            ]
        }).exec();
    }
}

module.exports = mongoose.model("label", LabelSchema);
