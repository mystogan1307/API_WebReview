//import { userService } from "../services/index.service";
const { userService } = require("../services/index.service");

module.exports.updateProfile = async (req, res, next) => {
    try {
        // console.log(req.user._id, req.user.id);
        // console.log(typeof(req.user._id), typeof(req.user.id));
        await userService.updateProfileById(req.user.id, req.body);
        return res.status(200).send({message: "Update success"})
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.updateAvatarUserById = (req, res, next) => {
    try {
        return userService.updateAvatarUserById(req, res);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.updatePasswordUser = async (req, res, next) => {
    try {
        await userService.updatePasswordUser(req.user.id, req.body);
        return res.status(200).send({message: "Update success", result: true});
    } catch (error) {
        return res.status(200).send({message: error, result: false});
    }
}

module.exports.getAllUser = async (req, res, next) => {
    try {
        let params = req.query;
        let currentId = req.user.id;
        let userResult = await userService.getAllUser(currentId, params);
        return res.status(200).send(userResult)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports.updateUserById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let isDelete = req.body.isDelete;
        await userService.updateUserById(id, isDelete);
        return res.status(200).send({message: "Update success"});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
