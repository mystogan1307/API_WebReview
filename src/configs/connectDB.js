const mongoose = require("mongoose");

let connectDB = () => {
    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    let URI1 = "mongodb://localhost:27017/WebReview"
    return mongoose.connect(URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
            .then(() => console.log('Connect DB'))
            .catch((err) => console.log('err:', err))
}

module.exports = connectDB;
