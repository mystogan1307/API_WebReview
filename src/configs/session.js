//import session from "express-session";
const session = require("express-session");

let config = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
}

module.exports = config;
