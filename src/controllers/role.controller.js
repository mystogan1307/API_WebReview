
const { roleService } = require("../services/index.service");

module.exports.getRoles = async (req, res, next) => {
    try {
        let roles = await roleService.getRoles();
        return res.status(200).send(roles);
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports.getRoleById = async (req, res, next) => {
    try {
        let roleId = req.params.id;
        let role = await roleService.getRoleById(roleId);
        return res.status(200).send(role);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.createNewRole = async (req, res, next) => {
    try {
        let role = {
            name: req.body.name,
            index: req.body.index
        }
        let newRole = await roleService.createNewRole(role);
        return res.status(201).send(newRole);
    } catch (error) {
        return res.status(500).send(error);
    }
}
