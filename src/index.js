

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



app.get("/", (req, res) => {
    console.log(req.get("host"))
    // res.send(req.get("host"))
    res.send("hello");
})

routes(app);

app.listen(process.env.PORT || 3001, function () {
    console.log("Server listening on port:", process.env.PORT || 3001);
})
