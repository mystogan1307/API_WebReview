

const CommentModel = require("../models/comment.model");
const ProductModel = require("../models/product.model");

const LIMIT_COMMENTS = 5;

const createNewComment = (comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            await CommentModel.createNewComment(comment);
            let product = await ProductModel.findProductById(comment.productId);
            console.log(product.commentAmount);
            await ProductModel.increaseComment(product._id, ++product.commentAmount);
            resolve(true)
        } catch (error) {
            reject(error.message);
        }
    })
}

const getCommentByProductId = (id, params) => {
    return new Promise(async(resolve, reject) => {
        try {
            let comments = await CommentModel.findCommentByProductId(id, params, LIMIT_COMMENTS);
            let commentsNumber = await CommentModel.countCommentByProductId(id, params);
            return resolve({comments, commentsNumber});
        } catch (error) {
            reject(error.message);
        }
    })
}

module.exports = {
    createNewComment,
    getCommentByProductId
}
