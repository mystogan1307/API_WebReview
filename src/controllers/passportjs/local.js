
const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");
const dotenv = require("dotenv");
dotenv.config();

const UserModel = require("../../models/user.model");
const RoleModel = require("../../models/role.model");
const { transError } = require("../../lang/vi");

const LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findUserByEmail(email);
            
            if (!user) {
                return done(null, false, { message: transError.LOGIN_FAILED });
            }

            if (user.isDelete === true){
                return done(null, false, { message: transError.BLOCK_ACCOUNT });
            }

            let checkPassword = user.comparePassword(password);
            if (!checkPassword) {
                return done(null, false, { message: transError.LOGIN_FAILED });
            }
            
            return done(null, await UserModel.findUserById(user._id))
        } catch (error) {
            return done(error, false);
        }
    }));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        // UserModel.findUserById(id)
        // .then(user => {
        //     return done(null, user);
        // })
        // .catch(err => {
        //     return done(err, null);
        // })
    });
}

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

let initPassportJwt = () => {
    console.log(process.env.SESSION_SECRET)
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SESSION_SECRET
    }, (jwtPayload, done) => {
        return UserModel.findUserByIdAndRole(jwtPayload.user._id)
                .then(user => {
                    if (user){
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    return done(err, done);
                })
        // return UserModel.findUserById(jwtPayload.user._id)
        //     .then(user => {
        //         if (user) {
        //             return done(null, user)
        //         }
        //         return done(null, false);
        //     })
        //     .catch(err => {
        //         return done(err, false)
        //     })
    }))
}

module.exports = {
    initPassportLocal,
    initPassportJwt
}
