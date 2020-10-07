//import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    productId: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    score: {type: Number},
    like: {type: Number},
    dislike: {type: Number},
    content: {type: String},
    analysis: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
})

CommentSchema.statics = {
    findCommentByProductId(productId, params, limit){
        if (params.analysis){
            return this.find({
                productId,
                isDelete: false,
                analysis: params.analysis
            }, {
                productId: 1, userId: 1, score: 1, like: 1, dislike: 1, content: 1, analysis: 1,  createdAt: 1
            }).sort({createdAt: params.sort ? params.sort : -1}).skip(+params.skip).limit(limit).populate({
                path: 'userId',
                select: {username: 1, avatar: 1}
            }).exec();
        }
        return this.find({
            productId,
            isDelete: false,
        }, {
            productId: 1, userId: 1, score: 1, like: 1, dislike: 1, content: 1, analysis: 1,  createdAt: 1,
        }).sort({createdAt: params.sort ? params.sort : -1}).skip(+params.skip).limit(limit)
        .populate({
            path: 'userId',
            select: {username: 1, avatar: 1}
        }).exec();
    },

    createNewComment(comment){
        return this.create(comment);
    },

    countCommentByProductId(productId, params){
        if (params.analysis){
            return this.count({
                productId,
                isDelete: false,
                analysis: params.analysis
            }).exec();
        }
        return this.count({
            productId,
            isDelete: false,
        }).exec();
    }
}

module.exports = mongoose.model("comment", CommentSchema);
