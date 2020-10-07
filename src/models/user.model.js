//import mongoose from "mongoose";
//import bcrypt from "bcrypt";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    avatar: { type: String },
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    local: {
        email: { type: String },
        password: { type: String },
        verifyToken: { type: String },
        isActive: { type: Boolean }
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
    isDelete: { type: Boolean, default: false }
});

UserSchema.statics = {
    createNew(user) {
        return this.create(user);
    },

    findUserByEmail(email) {
        return this.findOne({
            "local.email": email
        }, { _id: 1, "local.password": 1, isDelete: 1 })
    },

    findUserComment(id) {
        return this.findById(id, { _id: 1, username: 1, avatar: 1 })
    },

    findUserById(id) {
        return this.findById(id, { "local.password": 0 });
    },

    findUserByIdToChangePass(id) {
        return this.findById(id, { "local.password": 1 });
    },

    updateProfileById(id, profile) {
        return this.findByIdAndUpdate(id, {
            username: profile.username,
            age: profile.age,
            gender: profile.gender,
            phone: profile.phone,
            avatar: profile.avatar
        }).exec();
    },

    updatePasswordById(id, password) {
        return this.findByIdAndUpdate(id, {
            "local.password": password
        }).exec();
    },

    getAllUser(currendId, params, limit) {
        if (typeof params.isDelete === "undefined") {
            return this.find({
                $and: [
                    { _id: { $nin: [currendId] } },
                    {
                        $or: [
                            { username: { $regex: new RegExp(params.name, "i") } },
                            { "local.email": { $regex: new RegExp(params.name, "i") } }
                        ]
                    }
                ]
            }, { "local.password": 0 }).sort({ createdAt: params.sort ? params.sort : -1 }).skip(+params.skip).limit(limit);
        }
        return this.find({
            $and: [
                { isDelete: params.isDelete },
                { _id: { $nin: [currendId] } },
                {
                    $or: [
                        { username: { $regex: new RegExp(params.name, "i") } },
                        { "local.email": { $regex: new RegExp(params.name, "i") } }
                    ]
                }
            ]
        }, { "local.password": 0 }).sort({ createdAt: params.sort ? params.sort : -1 }).skip(+params.skip).limit(limit);
    },

    countUser(currendId, params) {
        if (typeof params.isDelete === "undefined") {
            return this.count({
                $and: [
                    { _id: { $nin: [currendId] } },
                    {
                        $or: [
                            { username: { $regex: new RegExp(params.name, "i") } },
                            { "local.email": { $regex: new RegExp(params.name, "i") } }
                        ]
                    }
                ]
            })
        }
        return this.count({
            $and: [
                { isDelete: params.isDelete },
                { _id: { $nin: [currendId] } },
                {
                    $or: [
                        { username: { $regex: new RegExp(params.name, "i") } },
                        { "local.email": { $regex: new RegExp(params.name, "i") } }
                    ]
                }
            ]
        })
    },

    updateUserById(id, isDelete) {
        return this.findByIdAndUpdate(id, {
            isDelete
        }).exec();
    },

    findUserByIdAndRole(id){
        return this.findById(id, {"local.password": 0}).populate('role')
    }
}

UserSchema.methods = {
    comparePassword(passwordHash) {
        return bcrypt.compareSync(passwordHash, this.local.password)
    }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
