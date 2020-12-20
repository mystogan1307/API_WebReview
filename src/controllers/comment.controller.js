
const { commentService } = require("../services/index.service");

module.exports.createNewComment = async (req, res, next) => {
    try {
        const comment = {
            productId: req.body.productId,
            userId: req.user._id,
            score: req.body.score,
            content: req.body.content,
            analysis: req.body.analysis
        }
        await commentService.createNewComment(comment);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.getCommentByProductId = async (req, res, next) => {
    try {
        let params = req.query;
        let comments = await commentService.getCommentByProductId(req.params.productId, params);
        return res.status(200).send(comments);
    } catch (error) {
        return res.status(500).send(error);
    }
}
