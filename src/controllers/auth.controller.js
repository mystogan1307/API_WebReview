// import passport from "passport";
// import jwt from "jsonwebtoken";
// import { validationResult } from "express-validator";
// import dotenv from "dotenv";
// dotenv.config();

// import { userService } from "../services/index.service";
// import { transError } from "../lang/vi";

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

const { userService } = require("../services/index.service");
const { transError } = require("../lang/vi");

module.exports.register = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        let errorResult = Object.values(result.mapped());
        let arrError = errorResult.map(val => val.msg);
        console.log(arrError)
        return res.status(400).send({error: arrError});
    }

    try {
        let userMsg = await userService.register(req.body.email, req.body.password, req.body.age, req.body.gender);
        return res.status(201).send({
            msg: userMsg,
            result: true
        });
    } catch (error) {
        return res.status(200).send({
            msg: error,
            result: false
        });        
    }
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            if (info.message === transError.BLOCK_ACCOUNT){
                return res.send({msg: transError.BLOCK_ACCOUNT});
            }
            return res.send({msg: transError.LOGIN_FAILED});
        }

        
        
        req.login(user, async (error) => {
            if (error) return next(error)
            const token = jwt.sign({user}, process.env.SESSION_SECRET);
            return res.json(token);
        })
    })(req, res, next)
}
