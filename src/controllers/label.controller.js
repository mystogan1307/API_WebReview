
const { labelService } = require("../services/index.service");


module.exports.getLabels = async (req, res, next) => {
    try {
        let params = req.query;
        console.log(params)
        let data = await labelService.getLabels(params);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.createNewLabel = async (req, res, next) => {
    try {
        let labelName = req.body.name;
        let label = {
            name: labelName
        }
        let labelResult = await labelService.createNewLabel(label);
        return res.status(201).send(labelResult);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.updateLabelById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let name = req.body.name;
        await labelService.updateLabelById(id, name);
        return res.status(200).send({message: "Update success"});
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.deleteLabelById = async (req, res, next) => {
    try {
        let id = req.params.id;
        await labelService.deleteLabelById(id);
        return res.status(200).send({message: "Delete success"});
    } catch (error) {
        return res.status(500).send(error)
    }
}
