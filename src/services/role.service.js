//import RoleModel from "../models/role.model";
const RoleModel = require("../models/role.model");

const getRoles = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let roles = await RoleModel.getRoles();
            return resolve(roles);
        } catch (error) {
            return reject(error.message);
        }
    })
}

const getRoleById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let role = await RoleModel.getRoleById(id);
            return resolve(role);
        } catch (error) {
            return reject(error.message);
        }
    })
}

const createNewRole = (newRole) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await RoleModel.createNewRole(newRole);
            return resolve(result);
        } catch (error) {
            return reject(error.message);
        }
    })
}

module.exports = {
    getRoles,
    getRoleById,
    createNewRole
}
