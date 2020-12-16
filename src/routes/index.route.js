// import cors from "cors";
// import passport from "passport";

// import authRoute from "./auth.route";
// import productRoute from "./product.route";
// import commentRoute from "./comment.route";
// import labelRoute from "./label.route";
// import userRoute from "./user.route";
// import roleRoute from "./role.route"

const cors = require("cors");
const passport = require("passport");

const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const commentRoute = require("./comment.route");
const labelRoute = require("./label.route");
const userRoute = require("./user.route");
const roleRoute = require("./role.route");

const cartRoute = require("./cart.router");
const billRoute = require("./bill.router");


const routes = (app) => {
    app.use(cors());
    app.use('/', authRoute);
    app.use('/product', productRoute);
    app.use('/comment', commentRoute);
    app.use('/label', labelRoute);
    app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
    app.use('/role', roleRoute);
    app.use('/cart', cartRoute);
    app.use('/bill', billRoute);


}

module.exports = routes;
