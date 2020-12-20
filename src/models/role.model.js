
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    index: {type: Number},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
})

RoleSchema.statics = {
    getRoles(){
        return this.find({
            isDelete: false
        }).exec()
    },

    getRoleById(id){
        return this.findById(id).exec();
    },

    createNewRole(role){
        return this.create(role);
    },

    getRoleByName(name){
        return this.find({
            name
        }).exec();
    }
}

module.exports = mongoose.model("Role", RoleSchema);
