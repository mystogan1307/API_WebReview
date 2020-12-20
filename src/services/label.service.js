
const LabelModel = require("../models/label.model");

const LIMIT_LABEL = 5;

const getLabels = (params) => {
    return new Promise(async(resolve, reject) => {
        try {
            let labelList = await LabelModel.getLabels(params, LIMIT_LABEL);
            let labelNumber = await LabelModel.countLabel(params);
            return resolve({labelList, labelNumber});
        } catch (error) {
            return reject(error.message);
        }
    })
}

const createNewLabel = (label) => {
    return new Promise(async (resolve, reject) => {
        try {
            let labelResult = await LabelModel.createNewLabel(label);
            return resolve(labelResult);
        } catch (error) {
            return reject(error.message);
        }
    })
}

const updateLabelById = (id, newLabel) => {
    return new Promise(async(resolve, reject) => {
        try {
            await LabelModel.updateLabelById(id, newLabel);
            return resolve();
        } catch (error) {
            return reject(error.message);
        }
    })
}

const deleteLabelById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await LabelModel.deleteLabelById(id);
            return resolve();
        } catch (error) {
            return reject(error.message);
        }
    })
}

module.exports = {
    getLabels,
    createNewLabel,
    updateLabelById,
    deleteLabelById
}