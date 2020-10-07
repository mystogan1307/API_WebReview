//import dotenv from "dotenv";
// import express from "express";
// import bodyParser from "body-parser";
// import passport from "passport";
// import cookieParser from "cookie-parser";

// import routes from "./routes/index.route";
// import connectDB from "./configs/connectDB";
// import session from "./configs/session";

const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index.route");
const connectDB = require("./configs/connectDB");
const session = require("./configs/session");


dotenv.config();
const app = express();

// connect database
connectDB();

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config session
session(app);
app.use(cookieParser());

// config passportjs
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get("/", (req, res) => {
    console.log(req.get("host"))
    // res.send(req.get("host"))
    res.send("hello");
})

routes(app);

app.listen(process.env.PORT || 3001, function () {
    console.log("Server listening on port:", process.env.PORT || 3001);
})
